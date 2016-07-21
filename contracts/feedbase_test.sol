import "dapple/test.sol";
import "dappsys/token/base.sol";

import "feedbase.sol";

contract FeedbaseTester is Tester {
    // Type declaration needed to retrieve return values
    function read(uint72 id) returns (bool ok, bytes32 value) {
        return Feedbase(_t).read(id);
    }
}

contract FeedbaseTest is Test, FeedbaseEvents {
    DSToken        dai      = new DSTokenBase(1000);
    Feedbase       feedbase = new Feedbase();
    FeedbaseTester tester   = new FeedbaseTester();

    uint72 id;

    function setUp() {
        tester._target(feedbase);
        id = feedbase.claim(dai);
    }

    function test_claim() {
        assertEq(id, uint(0));
        assertEq(feedbase.claim(dai), uint(1));
    }

    function test_set_description() {
        feedbase.set_description(id, "foo");
        assertEq32("foo", feedbase.description(id));
    }

    function test_read_free_feed() {
        feedbase.publish(id, 0x42, uint40(block.timestamp + 1));
        var (ok, value) = tester.read(id);
        assertTrue(ok);
        assertEq32(value, 0x42);
    }

    function testFail_set_fee_without_token() {
        var id2 = feedbase.claim();
        feedbase.set_fee(id2, 100);
    }

    function test_read_paid_feed() {
        feedbase.publish(id, 0x42, uint40(block.timestamp + 1));
        feedbase.set_fee(id, 100);
        dai.transfer(tester, 100);

        tester._target(dai);
        ERC20(tester).approve(feedbase, 100);

        tester._target(feedbase);
        assertEq(dai.balanceOf(tester), 100);
        var initial = dai.balanceOf(this);
        var (ok, value) = tester.read(id);
        assertTrue(ok);
        assertEq32(value, 0x42);
        assertEq(dai.balanceOf(this) - initial, 100);
        assertEq(dai.balanceOf(tester), 0);
    }

    function test_read_paid_feed_without_payment() {
        feedbase.publish(id, 0, uint40(block.timestamp + 1));
        feedbase.set_fee(id, 100);
        dai.transfer(tester, 99);

        tester._target(dai);
        DSToken(tester).approve(feedbase, 100);

        tester._target(feedbase);
        var (ok, value) = tester.read(id);
        assertFalse(ok);
        assertEq32(value, 0);
    }

    function test_read_paid_feed_twice() {
        feedbase.publish(id, 0x42, uint40(block.timestamp + 1));
        feedbase.set_fee(id, 100);
        dai.transfer(tester, 100);

        tester._target(dai);
        ERC20(tester).approve(feedbase, 100);

        tester._target(feedbase);

        var pre           = dai.balanceOf(this);
        var (ok1, value1) = tester.read(id);
        var post1         = dai.balanceOf(this);
        var (ok2, value2) = tester.read(id);
        var post2         = dai.balanceOf(this);

        assertTrue(ok1 && ok2);
        assertEq(post1 - pre, 100);
        assertEq(post2 - post1, 0);
        assertEq32(value1, 0x42);
        assertEq32(value2, 0x42);
    }

    function test_read_expired_feed() {
        feedbase.publish(id, 0x42, uint40(block.timestamp - 1));
        var (ok, value) = feedbase.read(id);
        assertFalse(ok);
        assertEq32(value, 0);
    }

    function test_transfer() {
        feedbase.transfer(id, tester);
        Feedbase(tester).publish(id, 123, uint40(block.timestamp + 1));
        var (ok, value) = feedbase.read(id);
        assertTrue(ok);
        assertEq32(value, 123);
    }

    function test_events() {
        expectEventsExact(feedbase);
        feedbase.set_fee(id, 0);
        Configured(id);
        feedbase.set_description(id, "foo");
        Configured(id);
        feedbase.publish(id, 0x42, uint40(block.timestamp + 1));
        Published(id);
        feedbase.read(id);
        Paid(id);
        feedbase.read(id);
        feedbase.transfer(id, tester);
        Configured(id);
        var id2 = feedbase.claim(dai);
        Claimed(id2);
    }
}
