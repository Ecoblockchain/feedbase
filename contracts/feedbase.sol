//------------------------------------------------------------------
// feedbase -- open-access price feed services on Ethereum
//------------------------------------------------------------------
// This simple contract enables anyone to claim a feed ID, which can
// be used to publish an arbitrary sequence of values over time.
//
// The feeds can be updated by their owners at any time, and expiry
// dates can be set to prevent consumers from reading stale data.
//
// Feed owners are also able to charge a fee, which is paid by the
// first caller to read each newly published value.
//

import "dappsys/token/erc20.sol";

contract Feedbase {
    event Update(uint64 indexed id);

    struct Feed {
        address owner;
        bytes32 description;
        uint fee;
        ERC20 fee_token;

        bytes32 value;
        uint timestamp;
        uint expiration;
        bool fee_paid;
    }

    uint32 next_id;
    mapping(uint64 => Feed) feeds;

    function getNextID() internal returns (uint64 id) {
        id = next_id++;
        if (next_id == 0) throw; // Ran out of IDs.
    }

    modifier auth(uint64 id) {
        if (msg.sender != feeds[id].owner) {
          throw;
        }
        _
    }

    //------------------------------------------------------------------
    // For feed owners
    //------------------------------------------------------------------

    function claim(ERC20 fee_token) returns (uint64 id) {
        id = getNextID();
        feeds[id].owner = msg.sender;
        feeds[id].fee_token = fee_token;
        Update(id);
    }

    function setDescription(uint64 id, bytes32 description) auth(id) {
        feeds[id].description = description;
        Update(id);
    }

    function setFee(uint64 id, uint fee) auth(id) {
        feeds[id].fee = fee;
        Update(id);
    }

    function setValue(uint64 id, bytes32 value, uint expiration) auth(id) {
        feeds[id].value = value;
        feeds[id].timestamp = block.timestamp;
        feeds[id].expiration = expiration;
        feeds[id].fee_paid = false;
        Update(id);
    }

    function transfer(uint64 id, address new_owner) auth(id) {
        feeds[id].owner = new_owner;
        Update(id);
    }

    //------------------------------------------------------------------
    // For consumers
    //------------------------------------------------------------------

    function getValue(uint64 id) returns (bytes32 value) {
        var feed = feeds[id];

        if (block.timestamp > feed.expiration) {
            throw;
        }

        if (address(feed.fee_token) != 0 && !feed.fee_paid) {
            feed.fee_token.transferFrom(msg.sender, feed.owner, feed.fee);
            feed.fee_paid = true;
        }

        return feed.value;
    }

    function getOwner(uint64 id) returns (address) {
        return feeds[id].owner;
    }
    function getDescription(uint64 id) returns (bytes32) {
        return feeds[id].description;
    }
    function getFee(uint64 id) returns (uint) {
        return feeds[id].fee;
    }
    function getFeeToken(uint64 id) returns (ERC20) {
        return feeds[id].fee_token;
    }

    function getTimestamp(uint64 id) returns (uint) {
        return feeds[id].timestamp;
    }
    function getExpiration(uint64 id) returns (uint) {
        return feeds[id].expiration;
    }
    function isFeePaid(uint64 id) returns (bool) {
        return feeds[id].fee_paid;
    }
}