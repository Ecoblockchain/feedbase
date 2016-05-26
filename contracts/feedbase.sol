import "dappsys/token/erc20.sol";

contract FeedbaseEvents {
    event Claim     (uint64 indexed id);
    event Configure (uint64 indexed id);
    event Publish   (uint64 indexed id);
    event Pay       (uint64 indexed id);
}

contract Feedbase is FeedbaseEvents {
    struct Feed {
        address  owner;
        bytes32  description;
        uint     fee;
        ERC20    token;

        bytes32  value;
        uint     timestamp;
        uint     expiration;
        bool     paid;
    }

    mapping(uint64 => Feed) feeds;
    uint64 next = 1;

    function owner(uint64 id) constant returns (address) {
        return feeds[id].owner;
    }
    function description(uint64 id) constant returns (bytes32) {
        return feeds[id].description;
    }
    function fee(uint64 id) constant returns (uint) {
        return feeds[id].fee;
    }
    function token(uint64 id) constant returns (ERC20) {
        return feeds[id].token;
    }

    function value(uint64 id) constant returns (bytes32) {
        if (paymentNeeded(id)) throw;
        return feeds[id].value;
    }
    function timestamp(uint64 id) constant returns (uint) {
        return feeds[id].timestamp;
    }
    function expiration(uint64 id) constant returns (uint) {
        return feeds[id].expiration;
    }
    function paid(uint64 id) constant returns (bool) {
        return feeds[id].paid;
    }

    //------------------------------------------------------------------
    // For feed owners
    //------------------------------------------------------------------

    function claim(ERC20 token) returns (uint64 id) {
        id = next++;
        if (next == 0) throw; // Ran out of IDs
        feeds[id].owner = msg.sender;
        feeds[id].token = token;
        Claim(id);
    }

    function claim() returns (uint64) {
        return claim(ERC20(0));
    }

    modifier auth(uint64 id) {
        if (msg.sender != feeds[id].owner) throw;
        _
    }

    function setDescription(uint64 id, bytes32 description)
        auth(id)
    {
        feeds[id].description = description;
        Configure(id);
    }

    function setFee(uint64 id, uint fee)
        auth(id)
    {
        if (free(id)) throw;
        feeds[id].fee = fee;
        Configure(id);
    }

    function publish(uint64 id, bytes32 value, uint expiration)
        auth(id)
    {
        feeds[id].value = value;
        feeds[id].timestamp = block.timestamp;
        feeds[id].expiration = expiration;
        feeds[id].paid = false;
        Publish(id);
    }

    function transfer(uint64 id, address owner)
        auth(id)
    {
        feeds[id].owner = owner;
        Configure(id);
    }

    //------------------------------------------------------------------
    // For consumers
    //------------------------------------------------------------------

    function read(uint64 id) returns (bytes32) {
        if (expired(id)) throw;
        return readExpired(id);
    }

    function readExpired(uint64 id) returns (bytes32) {
        var feed = feeds[id];

        if (paymentNeeded(id)) {
            feed.token.transferFrom(msg.sender, feed.owner, feed.fee);
            feed.paid = true;
            Pay(id);
        }

        return feed.value;
    }

    function expired(uint64 id) constant returns (bool) {
        return block.timestamp > feeds[id].expiration;
    }

    function free(uint64 id) constant returns (bool) {
        return address(feeds[id].token) == address(0);
    }

    function paymentNeeded(uint64 id) constant returns (bool) {
        return !free(id) && !feeds[id].paid;
    }
}
