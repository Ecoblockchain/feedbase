'use strict';

// For geth
if (typeof dapple === 'undefined') {
  var dapple = {};
}

if (typeof web3 === 'undefined' && typeof Web3 === 'undefined') {
  var Web3 = require('web3');
}

dapple['feedbase'] = (function builder () {
  var environments = {
      'morden': {
        'objects': {
          'feedbase': {
            'class': 'Feedbase',
            'address': '0xcb43e0a4cffd48607d9dfe062127f9c6e72ff9d6'
          }
        }
      }
    };

  function ContractWrapper (headers, _web3) {
    if (!_web3) {
      throw new Error('Must supply a Web3 connection!');
    }

    this.headers = headers;
    this._class = _web3.eth.contract(headers.interface);
  }

  ContractWrapper.prototype.deploy = function () {
    var args = new Array(arguments);
    args[args.length - 1].data = this.headers.bytecode;
    return this._class.new.apply(this._class, args);
  };

  // Wrap pass-through functions by name.
  var passthroughs = ['at'];
  for (var i = 0; i < passthroughs.length; i += 1) {
    ContractWrapper.prototype[passthroughs[i]] = (function (passthrough) {
      return function () {
        return this._class[passthrough].apply(this._class, arguments);
      };
    })(passthroughs[i]);
  }

  function constructor (_web3, env) {
    if (!env) {
      env = {
      'objects': {
        'feedbase': {
          'class': 'Feedbase',
          'address': '0xcb43e0a4cffd48607d9dfe062127f9c6e72ff9d6'
        }
      }
    };
    }
    while (typeof env !== 'object') {
      env = environments[env];
    }

    if (typeof _web3 === 'undefined') {
      if (!env.rpcURL) {
        throw new Error('Need either a Web3 instance or an RPC URL!');
      }
      _web3 = new Web3(new Web3.providers.HttpProvider(env.rpcURL));
    }

    this.headers = {
      'Feedbase': {
        'interface': [
          {
            'constant': true,
            'inputs': [
              {
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'fee',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'expiration',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'paid',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'token',
                'type': 'address'
              }
            ],
            'name': 'claim',
            'outputs': [
              {
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'paymentNeeded',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'id',
                'type': 'uint64'
              },
              {
                'name': 'fee',
                'type': 'uint256'
              }
            ],
            'name': 'setFee',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'id',
                'type': 'uint64'
              },
              {
                'name': 'value',
                'type': 'bytes32'
              },
              {
                'name': 'expiration',
                'type': 'uint256'
              }
            ],
            'name': 'publish',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'value',
            'outputs': [
              {
                'name': '',
                'type': 'bytes32'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'owner',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'claim',
            'outputs': [
              {
                'name': '',
                'type': 'uint64'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'id',
                'type': 'uint64'
              },
              {
                'name': 'description',
                'type': 'bytes32'
              }
            ],
            'name': 'setDescription',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'expired',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'id',
                'type': 'uint64'
              },
              {
                'name': 'owner',
                'type': 'address'
              }
            ],
            'name': 'transfer',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'read',
            'outputs': [
              {
                'name': '',
                'type': 'bytes32'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'free',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'readExpired',
            'outputs': [
              {
                'name': '',
                'type': 'bytes32'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'timestamp',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'token',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'description',
            'outputs': [
              {
                'name': '',
                'type': 'bytes32'
              }
            ],
            'type': 'function'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'Claim',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'Configure',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'Publish',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'Pay',
            'type': 'event'
          }
        ],
        'bytecode': '60606040526001600160006101000a81548167ffffffffffffffff02191690830217905550610f40806100326000396000f360606040523615610103576000357c0100000000000000000000000000000000000000000000000000000000900480630fdb468f146101055780631216e771146101315780631c2f38ff1461015d5780631e83409a146101895780631fb6e99d146101bf57806321b36a08146101eb578063338d14961461020c578063436cd650146102365780634d1f8c31146102625780634e71d92d146102a4578063774343a6146102d15780637c79ebce146102f25780637ef094761461031e57806389b8b4921461033f5780639e66cd381461036b578063be27fe6714610397578063c0171112146103c3578063cebce72d146103ef578063e86afde01461043157610103565b005b61011b60048080359060200190919050506104ea565b6040518082815260200191505060405180910390f35b61014760048080359060200190919050506105fa565b6040518082815260200191505060405180910390f35b6101736004808035906020019091905050610632565b6040518082815260200191505060405180910390f35b61019f6004808035906020019091905050610674565b604051808267ffffffffffffffff16815260200191505060405180910390f35b6101d56004808035906020019091905050610eeb565b6040518082815260200191505060405180910390f35b61020a60048080359060200190919080359060200190919050506108c7565b005b61023460048080359060200190919080359060200190919080359060200190919050506109c9565b005b61024c6004808035906020019091905050610577565b6040518082815260200191505060405180910390f35b610278600480803590602001909190505061045d565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6102b160048050506107c2565b604051808267ffffffffffffffff16815260200191505060405180910390f35b6102f060048080359060200190919080359060200190919050506107d8565b005b6103086004808035906020019091905050610e2d565b6040518082815260200191505060405180910390f35b61033d6004808035906020019091908035906020019091905050610b52565b005b6103556004808035906020019091905050610c62565b6040518082815260200191505060405180910390f35b6103816004808035906020019091905050610e67565b6040518082815260200191505060405180910390f35b6103ad6004808035906020019091905050610c8c565b6040518082815260200191505060405180910390f35b6103d960048080359060200190919050506105c2565b6040518082815260200191505060405180910390f35b6104056004808035906020019091905050610522565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b61044760048080359060200190919050506104b2565b6040518082815260200191505060405180910390f35b6000600060005060008367ffffffffffffffff16815260200190815260200160002060005060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690506104ad565b919050565b6000600060005060008367ffffffffffffffff1681526020019081526020016000206000506001016000505490506104e5565b919050565b6000600060005060008367ffffffffffffffff16815260200190815260200160002060005060020160005054905061051d565b919050565b6000600060005060008367ffffffffffffffff16815260200190815260200160002060005060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050610572565b919050565b600061058282610eeb565b1561058c57610002565b600060005060008367ffffffffffffffff1681526020019081526020016000206000506004016000505490506105bd565b919050565b6000600060005060008367ffffffffffffffff1681526020019081526020016000206000506005016000505490506105f5565b919050565b6000600060005060008367ffffffffffffffff16815260200190815260200160002060005060060160005054905061062d565b919050565b6000600060005060008367ffffffffffffffff16815260200190815260200160002060005060070160009054906101000a900460ff16905061066f565b919050565b60006001600081819054906101000a900467ffffffffffffffff168092919060010191906101000a81548167ffffffffffffffff02191690830217905550905080506000600160009054906101000a900467ffffffffffffffff1667ffffffffffffffff1614156106e457610002565b33600060005060008367ffffffffffffffff16815260200190815260200160002060005060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff0219169083021790555081600060005060008367ffffffffffffffff16815260200190815260200160002060005060030160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055508067ffffffffffffffff167fbaf0a95c82396a1fc892acdd1410329f7d8879d11ab493a9f95191eea48c39ab60405180905060405180910390a25b919050565b60006107ce6000610674565b90506107d5565b90565b81600060005060008267ffffffffffffffff16815260200190815260200160002060005060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561085957610002565b81600060005060008567ffffffffffffffff168152602001908152602001600020600050600101600050819055508267ffffffffffffffff167fa23563c7e17f776d0db7a63832130e8a5aa1b8e003401aee15623c00e94d0acd60405180905060405180910390a2505b5050565b81600060005060008267ffffffffffffffff16815260200190815260200160002060005060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561094857610002565b61095183610e67565b1561095b57610002565b81600060005060008567ffffffffffffffff168152602001908152602001600020600050600201600050819055508267ffffffffffffffff167fa23563c7e17f776d0db7a63832130e8a5aa1b8e003401aee15623c00e94d0acd60405180905060405180910390a2505b5050565b82600060005060008267ffffffffffffffff16815260200190815260200160002060005060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610a4a57610002565b82600060005060008667ffffffffffffffff1681526020019081526020016000206000506004016000508190555042600060005060008667ffffffffffffffff1681526020019081526020016000206000506005016000508190555081600060005060008667ffffffffffffffff168152602001908152602001600020600050600601600050819055506000600060005060008667ffffffffffffffff16815260200190815260200160002060005060070160006101000a81548160ff021916908302179055508367ffffffffffffffff167fd1aff0bac0f5b5865918a92cb5919656a2a8ec2f9aa2c5969e913378e490416d60405180905060405180910390a2505b505050565b81600060005060008267ffffffffffffffff16815260200190815260200160002060005060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610bd357610002565b81600060005060008567ffffffffffffffff16815260200190815260200160002060005060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055508267ffffffffffffffff167fa23563c7e17f776d0db7a63832130e8a5aa1b8e003401aee15623c00e94d0acd60405180905060405180910390a2505b5050565b6000610c6d82610e2d565b15610c7757610002565b610c8082610c8c565b9050610c87565b919050565b60006000600060005060008467ffffffffffffffff1681526020019081526020016000206000509050610cbe83610eeb565b15610e18578060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd338360000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168460020160005054604051847c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff16815260200182815260200193505050506020604051808303816000876161da5a03f11561000257505050604051805190602001505060018160070160006101000a81548160ff021916908302179055508267ffffffffffffffff167f942a5650a208f118b6ae2ab78e2ebac011f3c6b2b1dd43c00995fbff7eeaa1c160405180905060405180910390a25b80600401600050549150610e27565b50919050565b6000600060005060008367ffffffffffffffff1681526020019081526020016000206000506006016000505442119050610e62565b919050565b6000600073ffffffffffffffffffffffffffffffffffffffff16600060005060008467ffffffffffffffff16815260200190815260200160002060005060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16149050610ee6565b919050565b6000610ef682610e67565b158015610f345750600060005060008367ffffffffffffffff16815260200190815260200160002060005060070160009054906101000a900460ff16155b9050610f3b565b91905056'
      },
      'FeedbaseEvents': {
        'interface': [
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'Claim',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'Configure',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'Publish',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'Pay',
            'type': 'event'
          }
        ],
        'bytecode': '6060604052600a8060106000396000f360606040526008565b00'
      },
      'FeedbaseTest': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes8'
              },
              {
                'name': 'b',
                'type': 'bytes8'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq8',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'test_set_description',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes30'
              },
              {
                'name': 'b',
                'type': 'bytes30'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq30',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes4'
              },
              {
                'name': 'b',
                'type': 'bytes4'
              }
            ],
            'name': 'assertEq4',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes27'
              },
              {
                'name': 'b',
                'type': 'bytes27'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq27',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'setUp',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes27'
              },
              {
                'name': 'b',
                'type': 'bytes27'
              }
            ],
            'name': 'assertEq27',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes18'
              },
              {
                'name': 'b',
                'type': 'bytes18'
              }
            ],
            'name': 'assertEq18',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'what',
                'type': 'bool'
              }
            ],
            'name': 'assertTrue',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes1'
              },
              {
                'name': 'b',
                'type': 'bytes1'
              }
            ],
            'name': 'assertEq1',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes18'
              },
              {
                'name': 'b',
                'type': 'bytes18'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq18',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes4'
              },
              {
                'name': 'b',
                'type': 'bytes4'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq4',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'int256'
              },
              {
                'name': 'b',
                'type': 'int256'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes8'
              },
              {
                'name': 'b',
                'type': 'bytes8'
              }
            ],
            'name': 'assertEq8',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes6'
              },
              {
                'name': 'b',
                'type': 'bytes6'
              }
            ],
            'name': 'assertEq6',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes26'
              },
              {
                'name': 'b',
                'type': 'bytes26'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq26',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes25'
              },
              {
                'name': 'b',
                'type': 'bytes25'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq25',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes7'
              },
              {
                'name': 'b',
                'type': 'bytes7'
              }
            ],
            'name': 'assertEq7',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes5'
              },
              {
                'name': 'b',
                'type': 'bytes5'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq5',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes11'
              },
              {
                'name': 'b',
                'type': 'bytes11'
              }
            ],
            'name': 'assertEq11',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes13'
              },
              {
                'name': 'b',
                'type': 'bytes13'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq13',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes23'
              },
              {
                'name': 'b',
                'type': 'bytes23'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq23',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes3'
              },
              {
                'name': 'b',
                'type': 'bytes3'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq3',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes15'
              },
              {
                'name': 'b',
                'type': 'bytes15'
              }
            ],
            'name': 'assertEq15',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes14'
              },
              {
                'name': 'b',
                'type': 'bytes14'
              }
            ],
            'name': 'assertEq14',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes32'
              },
              {
                'name': 'b',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq32',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes23'
              },
              {
                'name': 'b',
                'type': 'bytes23'
              }
            ],
            'name': 'assertEq23',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes26'
              },
              {
                'name': 'b',
                'type': 'bytes26'
              }
            ],
            'name': 'assertEq26',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes2'
              },
              {
                'name': 'b',
                'type': 'bytes2'
              }
            ],
            'name': 'assertEq2',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes13'
              },
              {
                'name': 'b',
                'type': 'bytes13'
              }
            ],
            'name': 'assertEq13',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'address'
              },
              {
                'name': 'b',
                'type': 'address'
              }
            ],
            'name': 'assertEq',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes19'
              },
              {
                'name': 'b',
                'type': 'bytes19'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq19',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes20'
              },
              {
                'name': 'b',
                'type': 'bytes20'
              }
            ],
            'name': 'assertEq20',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes22'
              },
              {
                'name': 'b',
                'type': 'bytes22'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq22',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes12'
              },
              {
                'name': 'b',
                'type': 'bytes12'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq12',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'test_read_paid_feed',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'what',
                'type': 'bool'
              },
              {
                'name': 'error',
                'type': 'bytes32'
              }
            ],
            'name': 'assertTrue',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes11'
              },
              {
                'name': 'b',
                'type': 'bytes11'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq11',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'testFail_read_expired_feed',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes22'
              },
              {
                'name': 'b',
                'type': 'bytes22'
              }
            ],
            'name': 'assertEq22',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes28'
              },
              {
                'name': 'b',
                'type': 'bytes28'
              }
            ],
            'name': 'assertEq28',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes21'
              },
              {
                'name': 'b',
                'type': 'bytes21'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq21',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes16'
              },
              {
                'name': 'b',
                'type': 'bytes16'
              }
            ],
            'name': 'assertEq16',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes9'
              },
              {
                'name': 'b',
                'type': 'bytes9'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq9',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes3'
              },
              {
                'name': 'b',
                'type': 'bytes3'
              }
            ],
            'name': 'assertEq3',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes20'
              },
              {
                'name': 'b',
                'type': 'bytes20'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq20',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes28'
              },
              {
                'name': 'b',
                'type': 'bytes28'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq28',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'test_claim',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'test_read_paid_feed_twice',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes5'
              },
              {
                'name': 'b',
                'type': 'bytes5'
              }
            ],
            'name': 'assertEq5',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes15'
              },
              {
                'name': 'b',
                'type': 'bytes15'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq15',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': '_target',
                'type': 'address'
              }
            ],
            'name': 'expectEventsExact',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes17'
              },
              {
                'name': 'b',
                'type': 'bytes17'
              }
            ],
            'name': 'assertEq17',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes7'
              },
              {
                'name': 'b',
                'type': 'bytes7'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq7',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'uint256'
              },
              {
                'name': 'b',
                'type': 'uint256'
              }
            ],
            'name': 'assertEq',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'test_transfer',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes1'
              },
              {
                'name': 'b',
                'type': 'bytes1'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq1',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes21'
              },
              {
                'name': 'b',
                'type': 'bytes21'
              }
            ],
            'name': 'assertEq21',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes6'
              },
              {
                'name': 'b',
                'type': 'bytes6'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq6',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'what',
                'type': 'bool'
              }
            ],
            'name': 'assertFalse',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes16'
              },
              {
                'name': 'b',
                'type': 'bytes16'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq16',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'test_events',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'fail',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'what',
                'type': 'bool'
              },
              {
                'name': 'error',
                'type': 'bytes32'
              }
            ],
            'name': 'assertFalse',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes32'
              },
              {
                'name': 'b',
                'type': 'bytes32'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq32',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes29'
              },
              {
                'name': 'b',
                'type': 'bytes29'
              }
            ],
            'name': 'assertEq29',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'failed',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes14'
              },
              {
                'name': 'b',
                'type': 'bytes14'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq14',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'testFail_read_paid_feed',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes2'
              },
              {
                'name': 'b',
                'type': 'bytes2'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq2',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes17'
              },
              {
                'name': 'b',
                'type': 'bytes17'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq17',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes19'
              },
              {
                'name': 'b',
                'type': 'bytes19'
              }
            ],
            'name': 'assertEq19',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes24'
              },
              {
                'name': 'b',
                'type': 'bytes24'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq24',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes9'
              },
              {
                'name': 'b',
                'type': 'bytes9'
              }
            ],
            'name': 'assertEq9',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes10'
              },
              {
                'name': 'b',
                'type': 'bytes10'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq10',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'testFail_set_fee_without_token',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'address'
              },
              {
                'name': 'b',
                'type': 'address'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes12'
              },
              {
                'name': 'b',
                'type': 'bytes12'
              }
            ],
            'name': 'assertEq12',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes30'
              },
              {
                'name': 'b',
                'type': 'bytes30'
              }
            ],
            'name': 'assertEq30',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes29'
              },
              {
                'name': 'b',
                'type': 'bytes29'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq29',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'test_read_free_feed',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes25'
              },
              {
                'name': 'b',
                'type': 'bytes25'
              }
            ],
            'name': 'assertEq25',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'uint256'
              },
              {
                'name': 'b',
                'type': 'uint256'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bool'
              },
              {
                'name': 'b',
                'type': 'bool'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes'
              },
              {
                'name': 'b',
                'type': 'bytes'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq0',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes31'
              },
              {
                'name': 'b',
                'type': 'bytes31'
              },
              {
                'name': 'err',
                'type': 'bytes32'
              }
            ],
            'name': 'assertEq31',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes'
              },
              {
                'name': 'b',
                'type': 'bytes'
              }
            ],
            'name': 'assertEq0',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes24'
              },
              {
                'name': 'b',
                'type': 'bytes24'
              }
            ],
            'name': 'assertEq24',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bool'
              },
              {
                'name': 'b',
                'type': 'bool'
              }
            ],
            'name': 'assertEq',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes10'
              },
              {
                'name': 'b',
                'type': 'bytes10'
              }
            ],
            'name': 'assertEq10',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'IS_TEST',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes31'
              },
              {
                'name': 'b',
                'type': 'bytes31'
              }
            ],
            'name': 'assertEq31',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'int256'
              },
              {
                'name': 'b',
                'type': 'int256'
              }
            ],
            'name': 'assertEq',
            'outputs': [],
            'type': 'function'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'Claim',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'Configure',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'Publish',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'Pay',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': '_target',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': 'exact',
                'type': 'bool'
              }
            ],
            'name': 'eventListener',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes'
              }
            ],
            'name': 'logs',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bool'
              }
            ],
            'name': 'log_bool',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bool'
              }
            ],
            'name': 'log_named_bool',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'uint256'
              }
            ],
            'name': 'log_uint',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'uint256'
              }
            ],
            'name': 'log_named_uint',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'int256'
              }
            ],
            'name': 'log_int',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'int256'
              }
            ],
            'name': 'log_named_int',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'address'
              }
            ],
            'name': 'log_address',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'address'
              }
            ],
            'name': 'log_named_address',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes'
              }
            ],
            'name': 'log_bytes',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes'
              }
            ],
            'name': 'log_named_bytes',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes1'
              }
            ],
            'name': 'log_bytes1',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes1'
              }
            ],
            'name': 'log_named_bytes1',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes2'
              }
            ],
            'name': 'log_bytes2',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes2'
              }
            ],
            'name': 'log_named_bytes2',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes3'
              }
            ],
            'name': 'log_bytes3',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes3'
              }
            ],
            'name': 'log_named_bytes3',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes4'
              }
            ],
            'name': 'log_bytes4',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes4'
              }
            ],
            'name': 'log_named_bytes4',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes5'
              }
            ],
            'name': 'log_bytes5',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes5'
              }
            ],
            'name': 'log_named_bytes5',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes6'
              }
            ],
            'name': 'log_bytes6',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes6'
              }
            ],
            'name': 'log_named_bytes6',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes7'
              }
            ],
            'name': 'log_bytes7',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes7'
              }
            ],
            'name': 'log_named_bytes7',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes8'
              }
            ],
            'name': 'log_bytes8',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes8'
              }
            ],
            'name': 'log_named_bytes8',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes9'
              }
            ],
            'name': 'log_bytes9',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes9'
              }
            ],
            'name': 'log_named_bytes9',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes10'
              }
            ],
            'name': 'log_bytes10',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes10'
              }
            ],
            'name': 'log_named_bytes10',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes11'
              }
            ],
            'name': 'log_bytes11',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes11'
              }
            ],
            'name': 'log_named_bytes11',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes12'
              }
            ],
            'name': 'log_bytes12',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes12'
              }
            ],
            'name': 'log_named_bytes12',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes13'
              }
            ],
            'name': 'log_bytes13',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes13'
              }
            ],
            'name': 'log_named_bytes13',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes14'
              }
            ],
            'name': 'log_bytes14',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes14'
              }
            ],
            'name': 'log_named_bytes14',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes15'
              }
            ],
            'name': 'log_bytes15',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes15'
              }
            ],
            'name': 'log_named_bytes15',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes16'
              }
            ],
            'name': 'log_bytes16',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes16'
              }
            ],
            'name': 'log_named_bytes16',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes17'
              }
            ],
            'name': 'log_bytes17',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes17'
              }
            ],
            'name': 'log_named_bytes17',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes18'
              }
            ],
            'name': 'log_bytes18',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes18'
              }
            ],
            'name': 'log_named_bytes18',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes19'
              }
            ],
            'name': 'log_bytes19',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes19'
              }
            ],
            'name': 'log_named_bytes19',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes20'
              }
            ],
            'name': 'log_bytes20',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes20'
              }
            ],
            'name': 'log_named_bytes20',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes21'
              }
            ],
            'name': 'log_bytes21',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes21'
              }
            ],
            'name': 'log_named_bytes21',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes22'
              }
            ],
            'name': 'log_bytes22',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes22'
              }
            ],
            'name': 'log_named_bytes22',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes23'
              }
            ],
            'name': 'log_bytes23',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes23'
              }
            ],
            'name': 'log_named_bytes23',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes24'
              }
            ],
            'name': 'log_bytes24',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes24'
              }
            ],
            'name': 'log_named_bytes24',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes25'
              }
            ],
            'name': 'log_bytes25',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes25'
              }
            ],
            'name': 'log_named_bytes25',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes26'
              }
            ],
            'name': 'log_bytes26',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes26'
              }
            ],
            'name': 'log_named_bytes26',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes27'
              }
            ],
            'name': 'log_bytes27',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes27'
              }
            ],
            'name': 'log_named_bytes27',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes28'
              }
            ],
            'name': 'log_bytes28',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes28'
              }
            ],
            'name': 'log_named_bytes28',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes29'
              }
            ],
            'name': 'log_bytes29',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes29'
              }
            ],
            'name': 'log_named_bytes29',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes30'
              }
            ],
            'name': 'log_bytes30',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes30'
              }
            ],
            'name': 'log_named_bytes30',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes31'
              }
            ],
            'name': 'log_bytes31',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes31'
              }
            ],
            'name': 'log_named_bytes31',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes32'
              }
            ],
            'name': 'log_bytes32',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes32'
              }
            ],
            'name': 'log_named_bytes32',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'gas',
                'type': 'uint256'
              }
            ],
            'name': '_log_gas_use',
            'type': 'event'
          }
        ],
        'bytecode': '6060604052604051610f728061012e833901809050604051809103906000f0600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055506103e860405161075c806110a083390180828152602001915050604051809103906000f0600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055506040516101e8806117fc833901809050604051809103906000f0600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b30600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055506001600160146101000a81548160ff021916908302179055505b619ff7806119e46000396000f360606040526001600160006101000a81548167ffffffffffffffff02191690830217905550610f40806100326000396000f360606040523615610103576000357c0100000000000000000000000000000000000000000000000000000000900480630fdb468f146101055780631216e771146101315780631c2f38ff1461015d5780631e83409a146101895780631fb6e99d146101bf57806321b36a08146101eb578063338d14961461020c578063436cd650146102365780634d1f8c31146102625780634e71d92d146102a4578063774343a6146102d15780637c79ebce146102f25780637ef094761461031e57806389b8b4921461033f5780639e66cd381461036b578063be27fe6714610397578063c0171112146103c3578063cebce72d146103ef578063e86afde01461043157610103565b005b61011b60048080359060200190919050506104ea565b6040518082815260200191505060405180910390f35b61014760048080359060200190919050506105fa565b6040518082815260200191505060405180910390f35b6101736004808035906020019091905050610632565b6040518082815260200191505060405180910390f35b61019f6004808035906020019091905050610674565b604051808267ffffffffffffffff16815260200191505060405180910390f35b6101d56004808035906020019091905050610eeb565b6040518082815260200191505060405180910390f35b61020a60048080359060200190919080359060200190919050506108c7565b005b61023460048080359060200190919080359060200190919080359060200190919050506109c9565b005b61024c6004808035906020019091905050610577565b6040518082815260200191505060405180910390f35b610278600480803590602001909190505061045d565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6102b160048050506107c2565b604051808267ffffffffffffffff16815260200191505060405180910390f35b6102f060048080359060200190919080359060200190919050506107d8565b005b6103086004808035906020019091905050610e2d565b6040518082815260200191505060405180910390f35b61033d6004808035906020019091908035906020019091905050610b52565b005b6103556004808035906020019091905050610c62565b6040518082815260200191505060405180910390f35b6103816004808035906020019091905050610e67565b6040518082815260200191505060405180910390f35b6103ad6004808035906020019091905050610c8c565b6040518082815260200191505060405180910390f35b6103d960048080359060200190919050506105c2565b6040518082815260200191505060405180910390f35b6104056004808035906020019091905050610522565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b61044760048080359060200190919050506104b2565b6040518082815260200191505060405180910390f35b6000600060005060008367ffffffffffffffff16815260200190815260200160002060005060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690506104ad565b919050565b6000600060005060008367ffffffffffffffff1681526020019081526020016000206000506001016000505490506104e5565b919050565b6000600060005060008367ffffffffffffffff16815260200190815260200160002060005060020160005054905061051d565b919050565b6000600060005060008367ffffffffffffffff16815260200190815260200160002060005060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050610572565b919050565b600061058282610eeb565b1561058c57610002565b600060005060008367ffffffffffffffff1681526020019081526020016000206000506004016000505490506105bd565b919050565b6000600060005060008367ffffffffffffffff1681526020019081526020016000206000506005016000505490506105f5565b919050565b6000600060005060008367ffffffffffffffff16815260200190815260200160002060005060060160005054905061062d565b919050565b6000600060005060008367ffffffffffffffff16815260200190815260200160002060005060070160009054906101000a900460ff16905061066f565b919050565b60006001600081819054906101000a900467ffffffffffffffff168092919060010191906101000a81548167ffffffffffffffff02191690830217905550905080506000600160009054906101000a900467ffffffffffffffff1667ffffffffffffffff1614156106e457610002565b33600060005060008367ffffffffffffffff16815260200190815260200160002060005060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff0219169083021790555081600060005060008367ffffffffffffffff16815260200190815260200160002060005060030160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055508067ffffffffffffffff167fbaf0a95c82396a1fc892acdd1410329f7d8879d11ab493a9f95191eea48c39ab60405180905060405180910390a25b919050565b60006107ce6000610674565b90506107d5565b90565b81600060005060008267ffffffffffffffff16815260200190815260200160002060005060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561085957610002565b81600060005060008567ffffffffffffffff168152602001908152602001600020600050600101600050819055508267ffffffffffffffff167fa23563c7e17f776d0db7a63832130e8a5aa1b8e003401aee15623c00e94d0acd60405180905060405180910390a2505b5050565b81600060005060008267ffffffffffffffff16815260200190815260200160002060005060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561094857610002565b61095183610e67565b1561095b57610002565b81600060005060008567ffffffffffffffff168152602001908152602001600020600050600201600050819055508267ffffffffffffffff167fa23563c7e17f776d0db7a63832130e8a5aa1b8e003401aee15623c00e94d0acd60405180905060405180910390a2505b5050565b82600060005060008267ffffffffffffffff16815260200190815260200160002060005060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610a4a57610002565b82600060005060008667ffffffffffffffff1681526020019081526020016000206000506004016000508190555042600060005060008667ffffffffffffffff1681526020019081526020016000206000506005016000508190555081600060005060008667ffffffffffffffff168152602001908152602001600020600050600601600050819055506000600060005060008667ffffffffffffffff16815260200190815260200160002060005060070160006101000a81548160ff021916908302179055508367ffffffffffffffff167fd1aff0bac0f5b5865918a92cb5919656a2a8ec2f9aa2c5969e913378e490416d60405180905060405180910390a2505b505050565b81600060005060008267ffffffffffffffff16815260200190815260200160002060005060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610bd357610002565b81600060005060008567ffffffffffffffff16815260200190815260200160002060005060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055508267ffffffffffffffff167fa23563c7e17f776d0db7a63832130e8a5aa1b8e003401aee15623c00e94d0acd60405180905060405180910390a2505b5050565b6000610c6d82610e2d565b15610c7757610002565b610c8082610c8c565b9050610c87565b919050565b60006000600060005060008467ffffffffffffffff1681526020019081526020016000206000509050610cbe83610eeb565b15610e18578060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd338360000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168460020160005054604051847c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff16815260200182815260200193505050506020604051808303816000876161da5a03f11561000257505050604051805190602001505060018160070160006101000a81548160ff021916908302179055508267ffffffffffffffff167f942a5650a208f118b6ae2ab78e2ebac011f3c6b2b1dd43c00995fbff7eeaa1c160405180905060405180910390a25b80600401600050549150610e27565b50919050565b6000600060005060008367ffffffffffffffff1681526020019081526020016000206000506006016000505442119050610e62565b919050565b6000600073ffffffffffffffffffffffffffffffffffffffff16600060005060008467ffffffffffffffff16815260200190815260200160002060005060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16149050610ee6565b919050565b6000610ef682610e67565b158015610f345750600060005060008367ffffffffffffffff16815260200190815260200160002060005060070160009054906101000a900460ff16155b9050610f3b565b91905056606060405260405160208061075c833981016040528080519060200190919050505b80600060005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005081905550806002600050819055505b506106ed8061006f6000396000f360606040523615610074576000357c010000000000000000000000000000000000000000000000000000000090048063095ea7b31461007657806318160ddd146100ab57806323b872dd146100ce57806370a082311461010c578063a9059cbb14610138578063dd62ed3e1461016d57610074565b005b610095600480803590602001909190803590602001909190505061059b565b6040518082815260200191505060405180910390f35b6100b860048050506101a2565b6040518082815260200191505060405180910390f35b6100f66004808035906020019091908035906020019091908035906020019091905050610360565b6040518082815260200191505060405180910390f35b61012260048080359060200190919050506101b4565b6040518082815260200191505060405180910390f35b61015760048080359060200190919080359060200190919050506101f2565b6040518082815260200191505060405180910390f35b61018c600480803590602001909190803590602001909190505061066f565b6040518082815260200191505060405180910390f35b600060026000505490506101b1565b90565b6000600060005060008373ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000505490506101ed565b919050565b600081600060005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005054101561023057610002565b610269600060005060008573ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005054836106d8565b151561027457610002565b81600060005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282825054039250508190555081600060005060008573ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828282505401925050819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a36001905061035a565b92915050565b600081600060005060008673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005054101561039e57610002565b81600160005060008673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005054101561040457610002565b61043d600060005060008573ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005054836106d8565b151561044857610002565b81600160005060008673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282825054039250508190555081600060005060008673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282825054039250508190555081600060005060008573ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828282505401925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a360019050610594565b9392505050565b600081600160005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060008573ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a360019050610669565b92915050565b6000600160005060008473ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060008373ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000505490506106d2565b92915050565b600082828401101590506106e7565b929150505660606040526101d6806100126000396000f360606040523615610048576000357c0100000000000000000000000000000000000000000000000000000000900480634bbb216c146100b657806389b8b492146100ce57610048565b6100b45b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16600036604051808383808284378201915050925050506000604051808303816000866161da5a03f1915050505b565b005b6100cc60048080359060200190919050506101a7565b005b6100e460048080359060200190919050506100fa565b6040518082815260200191505060405180910390f35b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166389b8b49283604051827c0100000000000000000000000000000000000000000000000000000000028152600401808267ffffffffffffffff1681526020019150506020604051808303816000876161da5a03f115610002575050506040518051906020015090506101a2565b919050565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b505660606040523615610431576000357c010000000000000000000000000000000000000000000000000000000090048063054550f314610433578063055523431461045d578063066b03801461046c57806309d78fba146104965780630a3d7cce146104b75780630a9254e4146104e15780630b0788dc146104f05780630b967fe7146105115780630c9fd581146105325780631472d56a1461054a57806316783ba71461056b57806319a7e59d14610595578063200b894d146105bf578063263eb5b6146105e9578063269724ef1461060a5780632bdc05c51461062b5780632d0daca81461065557806334d9aee31461067f57806338856ecb146106a057806338ec8736146106ca5780633b098c8c146106eb5780633b81a5a4146107155780633d82e1b11461073f5780634631e15b146107695780634651f7161461078a57806347428855146107ab5780634b0df486146107cc5780634c2bc9a9146107ed5780634c4a4c671461080e5780635142c3ec1461082f578063515361f614610850578063538e8ae014610871578063593af09f1461089b578063596c02fb146108bc5780635d8bc2a8146108e65780635d9b84af14610910578063640ec47a1461091f57806365153632146109405780636afcc1d11461096a5780636b2f68f5146109795780636ec62f291461099a57806370ab2822146109bb57806374780111146109e557806374b9dc6b14610a065780637857fcda14610a30578063787eda4914610a515780637963b47814610a7b5780637ce8e19614610aa557806381dba0d614610ab457806384570d0d14610ac35780638667346414610ae45780638af784dc14610b0e5780638eb976ca14610b265780638f12355d14610b4757806398296c5414610b715780639c45706d14610b925780639c90224b14610ba15780639fb4c63d14610bcb578063a536cffd14610bec578063a598288514610c16578063a6abbad614610c2e578063a88d42a514610c58578063a9cc471814610c67578063aae764c114610c76578063b017d80814610c97578063b8d3d08a14610cc1578063ba414fa614610ce2578063bd85396014610d05578063cbdaea8b14610d2f578063ccc62bbe14610d3e578063cf06b14114610d68578063cfd65fdb14610d92578063d050498e14610db3578063d1a3d3ad14610ddd578063d539a22614610dfe578063d9a9364d14610e28578063e204758914610e37578063e4dbc38514610e61578063e504862b14610e82578063e695c00c14610ea3578063e79c587614610ecd578063e7fa796914610edc578063e85efc5014610efd578063f10968ea14610f27578063f1183e2114610f51578063f43313b614610ff7578063f578fd8514611021578063f614fd72146110be578063f7fe3477146110df578063f8bdbb6014611100578063fa7626d414611121578063fc03777614611144578063fe74f05b1461116557610431565b005b61045b6004808035906020019091908035906020019091908035906020019091905050615e25565b005b61046a6004805050611446565b005b6104946004808035906020019091908035906020019091908035906020019091905050619811565b005b6104b5600480803590602001909190803590602001909190505061550a565b005b6104df600480803590602001909190803590602001909190803590602001909190505061902b565b005b6104ee6004805050611186565b005b61050f6004808035906020019091908035906020019091905050619198565b005b61053060048080359060200190919080359060200190919050506179e6565b005b6105486004808035906020019091905050613b03565b005b6105696004808035906020019091908035906020019091905050614d24565b005b6105936004808035906020019091908035906020019091908035906020019091905050617879565b005b6105bd600480803590602001909190803590602001909190803590602001909190505061539d565b005b6105e760048080359060200190919080359060200190919080359060200190919050506145c3565b005b6106086004808035906020019091908035906020019091905050615f92565b005b6106296004808035906020019091908035906020019091905050615a4e565b005b6106536004808035906020019091908035906020019091908035906020019091905050618d89565b005b61067d6004808035906020019091908035906020019091908035906020019091905050618ae7565b005b61069e6004808035906020019091908035906020019091905050615cf0565b005b6106c8600480803590602001909190803590602001909190803590602001909190505061563f565b005b6106e96004808035906020019091908035906020019091905050616778565b005b6107136004808035906020019091908035906020019091908035906020019091905050616b4f565b005b61073d60048080359060200190919080359060200190919080359060200190919050506185a3565b005b61076760048080359060200190919080359060200190919080359060200190919050506150fb565b005b6107886004808035906020019091908035906020019091905050617200565b005b6107a96004808035906020019091908035906020019091905050616f5e565b005b6107ca6004808035906020019091908035906020019091905050619ec2565b005b6107eb6004808035906020019091908035906020019091905050618710565b005b61080c6004808035906020019091908035906020019091905050618ef6565b005b61082d6004808035906020019091908035906020019091905050614fc6565b005b61084e6004808035906020019091908035906020019091905050616cbc565b005b61086f6004808035906020019091908035906020019091905050614a2a565b005b6108996004808035906020019091908035906020019091908035906020019091905050617b1b565b005b6108ba6004808035906020019091908035906020019091905050617f2a565b005b6108e46004808035906020019091908035906020019091908035906020019091905050618301565b005b61090e60048080359060200190919080359060200190919080359060200190919050506168ad565b005b61091d60048050506118b7565b005b61093e6004808035906020019091908035906020019091905050613b82565b005b610968600480803590602001909190803590602001909190803590602001909190505061660b565b005b6109776004805050612f0b565b005b610998600480803590602001909190803590602001909190505061846e565b005b6109b9600480803590602001909190803590602001909190505061943a565b005b6109e3600480803590602001909190803590602001909190803590602001909190505061805f565b005b610a0460048080359060200190919080359060200190919050506174a2565b005b610a2e60048080359060200190919080359060200190919080359060200190919050506160c7565b005b610a4f6004808035906020019091908035906020019091905050615268565b005b610a796004808035906020019091908035906020019091908035906020019091905050617dbd565b005b610aa360048080359060200190919080359060200190919080359060200190919050506192cd565b005b610ab26004805050611337565b005b610ac160048050506126a4565b005b610ae260048080359060200190919080359060200190919050506157ac565b005b610b0c6004808035906020019091908035906020019091908035906020019091905050617093565b005b610b246004808035906020019091905050613a8d565b005b610b456004808035906020019091908035906020019091905050617744565b005b610b6f6004808035906020019091908035906020019091908035906020019091905050615b83565b005b610b90600480803590602001909190803590602001909190505061448e565b005b610b9f6004805050613086565b005b610bc96004808035906020019091908035906020019091908035906020019091905050614bb7565b005b610bea60048080359060200190919080359060200190919050506181cc565b005b610c1460048080359060200190919080359060200190919080359060200190919050506158e1565b005b610c2c6004808035906020019091905050613c39565b005b610c566004808035906020019091908035906020019091908035906020019091905050617335565b005b610c6560048050506132fa565b005b610c746004805050613ae7565b005b610c956004808035906020019091908035906020019091905050613cb7565b005b610cbf6004808035906020019091908035906020019091908035906020019091905050619d55565b005b610ce060048080359060200190919080359060200190919050506196dc565b005b610cef6004805050613a7a565b6040518082815260200191505060405180910390f35b610d2d6004808035906020019091908035906020019091908035906020019091905050616df1565b005b610d3c6004805050612141565b005b610d666004808035906020019091908035906020019091908035906020019091905050614e59565b005b610d9060048080359060200190919080359060200190919080359060200190919050506175d7565b005b610db16004808035906020019091908035906020019091905050617c88565b005b610ddb6004808035906020019091908035906020019091908035906020019091905050618845565b005b610dfc6004808035906020019091908035906020019091905050616234565b005b610e266004808035906020019091908035906020019091908035906020019091905050616369565b005b610e356004805050611784565b005b610e5f6004808035906020019091908035906020019091908035906020019091905050614865565b005b610e806004808035906020019091908035906020019091905050616a1a565b005b610ea1600480803590602001909190803590602001909190505061997e565b005b610ecb600480803590602001909190803590602001909190803590602001909190505061956f565b005b610eda60048050506115fd565b005b610efb6004808035906020019091908035906020019091905050618c54565b005b610f256004808035906020019091908035906020019091908035906020019091905050614321565b005b610f4f600480803590602001909190803590602001909190803590602001909190505061407f565b005b610ff56004808035906020019082018035906020019191908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050909091908035906020019082018035906020019191908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050909091908035906020019091905050613eda565b005b61101f6004808035906020019091908035906020019091908035906020019091905050619ab3565b005b6110bc6004808035906020019082018035906020019191908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050909091908035906020019082018035906020019191908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050909091905050613d6d565b005b6110dd60048080359060200190919080359060200190919050506189b2565b005b6110fe60048080359060200190919080359060200190919050506141ec565b005b61111f60048080359060200190919080359060200190919050506164d6565b005b61112e6004805050613a67565b6040518082815260200191505060405180910390f35b6111636004808035906020019091908035906020019091905050619c20565b005b6111846004808035906020019091908035906020019091905050614730565b005b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634bbb216c600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1681526020019150506000604051808303816000876161da5a03f11561000257505050600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16631e83409a600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1681526020019150506020604051808303816000876161da5a03f1156100025750505060405180519060200150600460146101000a81548167ffffffffffffffff021916908302179055505b565b611362600460149054906101000a900467ffffffffffffffff1667ffffffffffffffff16600161448e565b611443600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16631e83409a600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1681526020019150506020604051808303816000876161da5a03f115610002575050506040518051906020015067ffffffffffffffff16600261448e565b5b565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663774343a6600460149054906101000a900467ffffffffffffffff16604051827c0100000000000000000000000000000000000000000000000000000000028152600401808267ffffffffffffffff168152602001807f666f6f00000000000000000000000000000000000000000000000000000000008152602001506020019150506000604051808303816000876161da5a03f115610002575050506115fa7f666f6f0000000000000000000000000000000000000000000000000000000000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663e86afde0600460149054906101000a900467ffffffffffffffff16604051827c0100000000000000000000000000000000000000000000000000000000028152600401808267ffffffffffffffff1681526020019150506020604051808303816000876161da5a03f1156100025750505060405180519060200150619ec2565b5b565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663338d1496600460149054906101000a900467ffffffffffffffff16604260014201604051847c0100000000000000000000000000000000000000000000000000000000028152600401808467ffffffffffffffff16815260200183600102815260200182815260200193505050506000604051808303816000876161da5a03f11561000257505050611781600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166389b8b492600460149054906101000a900467ffffffffffffffff16604051827c0100000000000000000000000000000000000000000000000000000000028152600401808267ffffffffffffffff1681526020019150506020604051808303816000876161da5a03f11561000257505050604051805190602001506042600102619ec2565b5b565b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634e71d92d604051817c01000000000000000000000000000000000000000000000000000000000281526004018090506020604051808303816000876161da5a03f11561000257505050604051805190602001509050600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166321b36a08826064604051837c0100000000000000000000000000000000000000000000000000000000028152600401808367ffffffffffffffff168152602001828152602001925050506000604051808303816000876161da5a03f115610002575050505b50565b60006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663338d1496600460149054906101000a900467ffffffffffffffff16604260014201604051847c0100000000000000000000000000000000000000000000000000000000028152600401808467ffffffffffffffff16815260200183600102815260200182815260200193505050506000604051808303816000876161da5a03f11561000257505050600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166321b36a08600460149054906101000a900467ffffffffffffffff166064604051837c0100000000000000000000000000000000000000000000000000000000028152600401808367ffffffffffffffff168152602001828152602001925050506000604051808303816000876161da5a03f11561000257505050600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166064604051837c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff168152602001828152602001925050506020604051808303816000876161da5a03f115610002575050506040518051906020015050600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634bbb216c600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1681526020019150506000604051808303816000876161da5a03f11561000257505050600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663095ea7b3600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166064604051837c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff168152602001828152602001925050506020604051808303816000876161da5a03f115610002575050506040518051906020015050600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634bbb216c600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1681526020019150506000604051808303816000876161da5a03f11561000257505050611e3c600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1681526020019150506020604051808303816000876161da5a03f1156100025750505060405180519060200150606461448e565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a0823130604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1681526020019150506020604051808303816000876161da5a03f11561000257505050604051805190602001509150600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166389b8b492600460149054906101000a900467ffffffffffffffff16604051827c0100000000000000000000000000000000000000000000000000000000028152600401808267ffffffffffffffff1681526020019150506020604051808303816000876161da5a03f1156100025750505060405180519060200150905061205782600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a0823130604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1681526020019150506020604051808303816000876161da5a03f115610002575050506040518051906020015003606461448e565b61212e600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1681526020019150506020604051808303816000876161da5a03f1156100025750505060405180519060200150600061448e565b61213c816042600102619ec2565b5b5050565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663338d1496600460149054906101000a900467ffffffffffffffff16604260014201604051847c0100000000000000000000000000000000000000000000000000000000028152600401808467ffffffffffffffff16815260200183600102815260200182815260200193505050506000604051808303816000876161da5a03f11561000257505050600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166321b36a08600460149054906101000a900467ffffffffffffffff166064604051837c0100000000000000000000000000000000000000000000000000000000028152600401808367ffffffffffffffff168152602001828152602001925050506000604051808303816000876161da5a03f11561000257505050600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166063604051837c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff168152602001828152602001925050506020604051808303816000876161da5a03f115610002575050506040518051906020015050600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634bbb216c600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1681526020019150506000604051808303816000876161da5a03f11561000257505050600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663095ea7b3600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166064604051837c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff168152602001828152602001925050506020604051808303816000876161da5a03f115610002575050506040518051906020015050600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634bbb216c600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1681526020019150506000604051808303816000876161da5a03f11561000257505050600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166389b8b492600460149054906101000a900467ffffffffffffffff16604051827c0100000000000000000000000000000000000000000000000000000000028152600401808267ffffffffffffffff1681526020019150506020604051808303816000876161da5a03f1156100025750505060405180519060200150505b565b60006000600060006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663338d1496600460149054906101000a900467ffffffffffffffff16604260014201604051847c0100000000000000000000000000000000000000000000000000000000028152600401808467ffffffffffffffff16815260200183600102815260200182815260200193505050506000604051808303816000876161da5a03f11561000257505050600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166321b36a08600460149054906101000a900467ffffffffffffffff166064604051837c0100000000000000000000000000000000000000000000000000000000028152600401808367ffffffffffffffff168152602001828152602001925050506000604051808303816000876161da5a03f11561000257505050600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166064604051837c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff168152602001828152602001925050506020604051808303816000876161da5a03f115610002575050506040518051906020015050600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634bbb216c600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1681526020019150506000604051808303816000876161da5a03f11561000257505050600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663095ea7b3600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166064604051837c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff168152602001828152602001925050506020604051808303816000876161da5a03f115610002575050506040518051906020015050600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634bbb216c600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1681526020019150506000604051808303816000876161da5a03f11561000257505050600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a0823130604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1681526020019150506020604051808303816000876161da5a03f11561000257505050604051805190602001509450600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166389b8b492600460149054906101000a900467ffffffffffffffff16604051827c0100000000000000000000000000000000000000000000000000000000028152600401808267ffffffffffffffff1681526020019150506020604051808303816000876161da5a03f11561000257505050604051805190602001509350600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a0823130604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1681526020019150506020604051808303816000876161da5a03f11561000257505050604051805190602001509250600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166389b8b492600460149054906101000a900467ffffffffffffffff16604051827c0100000000000000000000000000000000000000000000000000000000028152600401808267ffffffffffffffff1681526020019150506020604051808303816000876161da5a03f11561000257505050604051805190602001509150600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a0823130604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1681526020019150506020604051808303816000876161da5a03f11561000257505050604051805190602001509050612eda858403606461448e565b612ee7838203600061448e565b612ef5846042600102619ec2565b612f03826042600102619ec2565b5b5050505050565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663338d1496600460149054906101000a900467ffffffffffffffff16604260014203604051847c0100000000000000000000000000000000000000000000000000000000028152600401808467ffffffffffffffff16815260200183600102815260200182815260200193505050506000604051808303816000876161da5a03f11561000257505050600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166389b8b492600460149054906101000a900467ffffffffffffffff16604051827c0100000000000000000000000000000000000000000000000000000000028152600401808267ffffffffffffffff1681526020019150506020604051808303816000876161da5a03f1156100025750505060405180519060200150505b565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16637ef09476600460149054906101000a900467ffffffffffffffff16600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16604051837c0100000000000000000000000000000000000000000000000000000000028152600401808367ffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff168152602001925050506000604051808303816000876161da5a03f11561000257505050600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663338d1496600460149054906101000a900467ffffffffffffffff1661012360014201604051847c0100000000000000000000000000000000000000000000000000000000028152600401808467ffffffffffffffff16815260200183600102815260200182815260200193505050506000604051808303816000876161da5a03f115610002575050506132f7600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166389b8b492600460149054906101000a900467ffffffffffffffff16604051827c0100000000000000000000000000000000000000000000000000000000028152600401808267ffffffffffffffff1681526020019150506020604051808303816000876161da5a03f1156100025750505060405180519060200150610123600102619ec2565b5b565b6000613327600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16613a8d565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166321b36a08600460149054906101000a900467ffffffffffffffff166000604051837c0100000000000000000000000000000000000000000000000000000000028152600401808367ffffffffffffffff168152602001828152602001925050506000604051808303816000876161da5a03f11561000257505050600460149054906101000a900467ffffffffffffffff1667ffffffffffffffff167fa23563c7e17f776d0db7a63832130e8a5aa1b8e003401aee15623c00e94d0acd60405180905060405180910390a2600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663774343a6600460149054906101000a900467ffffffffffffffff16604051827c0100000000000000000000000000000000000000000000000000000000028152600401808267ffffffffffffffff168152602001807f666f6f00000000000000000000000000000000000000000000000000000000008152602001506020019150506000604051808303816000876161da5a03f11561000257505050600460149054906101000a900467ffffffffffffffff1667ffffffffffffffff167fa23563c7e17f776d0db7a63832130e8a5aa1b8e003401aee15623c00e94d0acd60405180905060405180910390a2600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663338d1496600460149054906101000a900467ffffffffffffffff16604260014201604051847c0100000000000000000000000000000000000000000000000000000000028152600401808467ffffffffffffffff16815260200183600102815260200182815260200193505050506000604051808303816000876161da5a03f11561000257505050600460149054906101000a900467ffffffffffffffff1667ffffffffffffffff167fd1aff0bac0f5b5865918a92cb5919656a2a8ec2f9aa2c5969e913378e490416d60405180905060405180910390a2600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166389b8b492600460149054906101000a900467ffffffffffffffff16604051827c0100000000000000000000000000000000000000000000000000000000028152600401808267ffffffffffffffff1681526020019150506020604051808303816000876161da5a03f115610002575050506040518051906020015050600460149054906101000a900467ffffffffffffffff1667ffffffffffffffff167f942a5650a208f118b6ae2ab78e2ebac011f3c6b2b1dd43c00995fbff7eeaa1c160405180905060405180910390a2600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166389b8b492600460149054906101000a900467ffffffffffffffff16604051827c0100000000000000000000000000000000000000000000000000000000028152600401808267ffffffffffffffff1681526020019150506020604051808303816000876161da5a03f115610002575050506040518051906020015050600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16637ef09476600460149054906101000a900467ffffffffffffffff16600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16604051837c0100000000000000000000000000000000000000000000000000000000028152600401808367ffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff168152602001925050506000604051808303816000876161da5a03f11561000257505050600460149054906101000a900467ffffffffffffffff1667ffffffffffffffff167fa23563c7e17f776d0db7a63832130e8a5aa1b8e003401aee15623c00e94d0acd60405180905060405180910390a2600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16631e83409a600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1681526020019150506020604051808303816000876161da5a03f115610002575050506040518051906020015090508067ffffffffffffffff167fbaf0a95c82396a1fc892acdd1410329f7d8879d11ab493a9f95191eea48c39ab60405180905060405180910390a25b50565b600160149054906101000a900460ff1681565b600160159054906101000a900460ff1681565b7f190835d3ea3627fcd8cd319a6778f7f8798c3704b4af777966fba6571bcd76e8816001604051808373ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a15b50565b6001600160156101000a81548160ff021916908302179055505b565b801515613b7e577fe7950ede0394b9f2ce4a5a1bf5a7e1852411f7e6661b4308c913c4bfd11027e46040518080602001828103825260148152602001807f61737365727454727565207761732066616c736500000000000000000000000081526020015060200191505060405180910390a1613b7d613ae7565b5b5b50565b811515613c34577fe7950ede0394b9f2ce4a5a1bf5a7e1852411f7e6661b4308c913c4bfd11027e46040518080602001828103825260148152602001807f61737365727454727565207761732066616c736500000000000000000000000081526020015060200191505060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a1613c33613ae7565b5b5b5050565b8015613cb3577fe7950ede0394b9f2ce4a5a1bf5a7e1852411f7e6661b4308c913c4bfd11027e46040518080602001828103825260148152602001807f61737365727446616c736520776173207472756500000000000000000000000081526020015060200191505060405180910390a1613cb2613ae7565b5b5b50565b8115613d68577fe7950ede0394b9f2ce4a5a1bf5a7e1852411f7e6661b4308c913c4bfd11027e46040518080602001828103825260148152602001807f61737365727446616c736520776173207472756500000000000000000000000081526020015060200191505060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a1613d67613ae7565b5b5b5050565b60006000600084519250600191508284511415613e6157600090505b828160ff161015613e5c5783818151811015610002579060200101517f010000000000000000000000000000000000000000000000000000000000000090047f01000000000000000000000000000000000000000000000000000000000000000285828151811015610002579060200101517f010000000000000000000000000000000000000000000000000000000000000090047f010000000000000000000000000000000000000000000000000000000000000002141515613e4e576000915081505b5b8080600101915050613d89565b613e68565b6000915081505b811515613ed2577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f6661696c65642061737365727445712862797465732900000000000000000000815260200150602001905060405180910390a1613ed1613ae7565b5b5b5050505050565b60006000600085519250600191508285511415613fce57600090505b828160ff161015613fc95784818151811015610002579060200101517f010000000000000000000000000000000000000000000000000000000000000090047f01000000000000000000000000000000000000000000000000000000000000000286828151811015610002579060200101517f010000000000000000000000000000000000000000000000000000000000000090047f010000000000000000000000000000000000000000000000000000000000000002141515613fbb576000915081505b5b8080600101915050613ef6565b613fd5565b6000915081505b811515614076577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f6661696c65642061737365727445712862797465732900000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3846040518082815260200191505060405180910390a1614075613ae7565b5b5b505050505050565b81831415156141e6577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a17f88ecc1b64151c07778f8eb7f8161aed9361638f928a1bb62b008cf2f208f12b18360405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f88ecc1b64151c07778f8eb7f8161aed9361638f928a1bb62b008cf2f208f12b18260405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a16141e5613ae7565b5b5b505050565b808214151561431c577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17f88ecc1b64151c07778f8eb7f8161aed9361638f928a1bb62b008cf2f208f12b18260405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f88ecc1b64151c07778f8eb7f8161aed9361638f928a1bb62b008cf2f208f12b18160405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a161431b613ae7565b5b5b5050565b8183141515614488577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a17ff10e10fc613faff13ec2fbf0480c452e8ba6ea153d935c216544c8e9c6aa5bd78360405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17ff10e10fc613faff13ec2fbf0480c452e8ba6ea153d935c216544c8e9c6aa5bd78260405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1614487613ae7565b5b5b505050565b80821415156145be577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17ff10e10fc613faff13ec2fbf0480c452e8ba6ea153d935c216544c8e9c6aa5bd78260405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17ff10e10fc613faff13ec2fbf0480c452e8ba6ea153d935c216544c8e9c6aa5bd78160405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a16145bd613ae7565b5b5b5050565b818314151561472a577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a17f1d1a5700e4480844e2eb7a2b994dbde37615c4b6c688c700a9376709a4fc27108360405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f1d1a5700e4480844e2eb7a2b994dbde37615c4b6c688c700a9376709a4fc27108260405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1614729613ae7565b5b5b505050565b8082141515614860577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17f1d1a5700e4480844e2eb7a2b994dbde37615c4b6c688c700a9376709a4fc27108260405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f1d1a5700e4480844e2eb7a2b994dbde37615c4b6c688c700a9376709a4fc27108160405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a161485f613ae7565b5b5b5050565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16141515614a24577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a17f8d36e7ebd93d5a3d297284536b02d332820c817009f34e03dd18727ace0b18258360405180807f41000000000000000000000000000000000000000000000000000000000000008152602001506020018273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a17f8d36e7ebd93d5a3d297284536b02d332820c817009f34e03dd18727ace0b18258260405180807f42000000000000000000000000000000000000000000000000000000000000008152602001506020018273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a1614a23613ae7565b5b5b505050565b8073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16141515614bb2577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17f8d36e7ebd93d5a3d297284536b02d332820c817009f34e03dd18727ace0b18258260405180807f41000000000000000000000000000000000000000000000000000000000000008152602001506020018273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a17f8d36e7ebd93d5a3d297284536b02d332820c817009f34e03dd18727ace0b18258160405180807f42000000000000000000000000000000000000000000000000000000000000008152602001506020018273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a1614bb1613ae7565b5b5b5050565b8183141515614d1e577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a17f345cab7132cdf8c2cd837005abf4a639d03a6ee080547c53bbb1863f2467a34f8360405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f345cab7132cdf8c2cd837005abf4a639d03a6ee080547c53bbb1863f2467a34f8260405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1614d1d613ae7565b5b5b505050565b8082141515614e54577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17f345cab7132cdf8c2cd837005abf4a639d03a6ee080547c53bbb1863f2467a34f8260405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f345cab7132cdf8c2cd837005abf4a639d03a6ee080547c53bbb1863f2467a34f8160405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1614e53613ae7565b5b5b5050565b8183141515614fc0577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a17f3bd89d6e10657a8476896f78a3229b3a5c124979a6d1a0958c0ffc3aa76c00898360405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f3bd89d6e10657a8476896f78a3229b3a5c124979a6d1a0958c0ffc3aa76c00898260405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1614fbf613ae7565b5b5b505050565b80821415156150f6577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17f3bd89d6e10657a8476896f78a3229b3a5c124979a6d1a0958c0ffc3aa76c00898260405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f3bd89d6e10657a8476896f78a3229b3a5c124979a6d1a0958c0ffc3aa76c00898160405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a16150f5613ae7565b5b5b5050565b8183141515615262577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a17f18fa9f384400af20c23ba4a5360a0384b9dcfccc4420b83a186ed7410b5310f18360405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f18fa9f384400af20c23ba4a5360a0384b9dcfccc4420b83a186ed7410b5310f18260405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1615261613ae7565b5b5b505050565b8082141515615398577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17f18fa9f384400af20c23ba4a5360a0384b9dcfccc4420b83a186ed7410b5310f18260405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f18fa9f384400af20c23ba4a5360a0384b9dcfccc4420b83a186ed7410b5310f18160405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1615397613ae7565b5b5b5050565b8183141515615504577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a17f2f6ad42c9bfc8d1a207f2d9d4f17b2a3521ff3e91cb9c66951997ec316bf7ab68360405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f2f6ad42c9bfc8d1a207f2d9d4f17b2a3521ff3e91cb9c66951997ec316bf7ab68260405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1615503613ae7565b5b5b505050565b808214151561563a577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17f2f6ad42c9bfc8d1a207f2d9d4f17b2a3521ff3e91cb9c66951997ec316bf7ab68260405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f2f6ad42c9bfc8d1a207f2d9d4f17b2a3521ff3e91cb9c66951997ec316bf7ab68160405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1615639613ae7565b5b5b5050565b81831415156157a6577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a17fac663926f042564f029fd4ebc19217e7c04ecc9827a43421c498134337094b068360405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17fac663926f042564f029fd4ebc19217e7c04ecc9827a43421c498134337094b068260405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a16157a5613ae7565b5b5b505050565b80821415156158dc577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fac663926f042564f029fd4ebc19217e7c04ecc9827a43421c498134337094b068260405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17fac663926f042564f029fd4ebc19217e7c04ecc9827a43421c498134337094b068160405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a16158db613ae7565b5b5b5050565b8183141515615a48577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a17fcf8e553574074393b957e0bf6f5a4e2fb1578da91431a78b39c01d6cb1b51abd8360405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17fcf8e553574074393b957e0bf6f5a4e2fb1578da91431a78b39c01d6cb1b51abd8260405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1615a47613ae7565b5b5b505050565b8082141515615b7e577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fcf8e553574074393b957e0bf6f5a4e2fb1578da91431a78b39c01d6cb1b51abd8260405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17fcf8e553574074393b957e0bf6f5a4e2fb1578da91431a78b39c01d6cb1b51abd8160405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1615b7d613ae7565b5b5b5050565b8183141515615cea577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a17fec04fa5e7767887e9546f5c2f87ae761323d1fa31306d499fd9cc9019185a0c58360405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17fec04fa5e7767887e9546f5c2f87ae761323d1fa31306d499fd9cc9019185a0c58260405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1615ce9613ae7565b5b5b505050565b8082141515615e20577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fec04fa5e7767887e9546f5c2f87ae761323d1fa31306d499fd9cc9019185a0c58260405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17fec04fa5e7767887e9546f5c2f87ae761323d1fa31306d499fd9cc9019185a0c58160405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1615e1f613ae7565b5b5b5050565b8183141515615f8c577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a17f1ede21523101f070e3049b2469b5fa75cdfbc55fa7c2a805db6964613085890c8360405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f1ede21523101f070e3049b2469b5fa75cdfbc55fa7c2a805db6964613085890c8260405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1615f8b613ae7565b5b5b505050565b80821415156160c2577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17f1ede21523101f070e3049b2469b5fa75cdfbc55fa7c2a805db6964613085890c8260405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f1ede21523101f070e3049b2469b5fa75cdfbc55fa7c2a805db6964613085890c8160405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a16160c1613ae7565b5b5b5050565b818314151561622e577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a17f246bd1a68a0696eff60b08c63c4e5b7b2ce8c943fcef6bd3dbff1f5c6c1aed828360405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f246bd1a68a0696eff60b08c63c4e5b7b2ce8c943fcef6bd3dbff1f5c6c1aed828260405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a161622d613ae7565b5b5b505050565b8082141515616364577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17f246bd1a68a0696eff60b08c63c4e5b7b2ce8c943fcef6bd3dbff1f5c6c1aed828260405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f246bd1a68a0696eff60b08c63c4e5b7b2ce8c943fcef6bd3dbff1f5c6c1aed828160405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1616363613ae7565b5b5b5050565b81831415156164d0577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a17f7f8ecc07605b9e3dbb3486e72daed91553cc1e6ee759f291158bd5517df12ada8360405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f7f8ecc07605b9e3dbb3486e72daed91553cc1e6ee759f291158bd5517df12ada8260405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a16164cf613ae7565b5b5b505050565b8082141515616606577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17f7f8ecc07605b9e3dbb3486e72daed91553cc1e6ee759f291158bd5517df12ada8260405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f7f8ecc07605b9e3dbb3486e72daed91553cc1e6ee759f291158bd5517df12ada8160405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1616605613ae7565b5b5b5050565b8183141515616772577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a17ff26c70a685444144004ac767c110707671b6627e66409ad7bef9ed9b9edcd6798360405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17ff26c70a685444144004ac767c110707671b6627e66409ad7bef9ed9b9edcd6798260405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1616771613ae7565b5b5b505050565b80821415156168a8577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17ff26c70a685444144004ac767c110707671b6627e66409ad7bef9ed9b9edcd6798260405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17ff26c70a685444144004ac767c110707671b6627e66409ad7bef9ed9b9edcd6798160405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a16168a7613ae7565b5b5b5050565b8183141515616a14577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a17fa49c98776b3cc2d048d17f4bfb035ef72100a362469ddf556f174133ea41dce68360405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17fa49c98776b3cc2d048d17f4bfb035ef72100a362469ddf556f174133ea41dce68260405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1616a13613ae7565b5b5b505050565b8082141515616b4a577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fa49c98776b3cc2d048d17f4bfb035ef72100a362469ddf556f174133ea41dce68260405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17fa49c98776b3cc2d048d17f4bfb035ef72100a362469ddf556f174133ea41dce68160405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1616b49613ae7565b5b5b5050565b8183141515616cb6577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a17f7ee5f2f8cef5153af358607cca3e3776dd4206fbbb2dd43d2445386bcc42b9b18360405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f7ee5f2f8cef5153af358607cca3e3776dd4206fbbb2dd43d2445386bcc42b9b18260405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1616cb5613ae7565b5b5b505050565b8082141515616dec577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17f7ee5f2f8cef5153af358607cca3e3776dd4206fbbb2dd43d2445386bcc42b9b18260405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f7ee5f2f8cef5153af358607cca3e3776dd4206fbbb2dd43d2445386bcc42b9b18160405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1616deb613ae7565b5b5b5050565b8183141515616f58577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a17f2408ce46ad1155457aeb2f23ee7846a633cab47b5b43823af6239205725bcc338360405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f2408ce46ad1155457aeb2f23ee7846a633cab47b5b43823af6239205725bcc338260405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1616f57613ae7565b5b5b505050565b808214151561708e577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17f2408ce46ad1155457aeb2f23ee7846a633cab47b5b43823af6239205725bcc338260405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f2408ce46ad1155457aeb2f23ee7846a633cab47b5b43823af6239205725bcc338160405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a161708d613ae7565b5b5b5050565b81831415156171fa577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a17f99d16f0e1ff3b4c8007b81f67317c973805c21ac8351d067608cf56bcf2fbcbc8360405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f99d16f0e1ff3b4c8007b81f67317c973805c21ac8351d067608cf56bcf2fbcbc8260405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a16171f9613ae7565b5b5b505050565b8082141515617330577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17f99d16f0e1ff3b4c8007b81f67317c973805c21ac8351d067608cf56bcf2fbcbc8260405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f99d16f0e1ff3b4c8007b81f67317c973805c21ac8351d067608cf56bcf2fbcbc8160405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a161732f613ae7565b5b5b5050565b818314151561749c577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a17f9981608c4d66a186cb8cf8285d566f08ad2602e32687210e1c4b52776ace2ce28360405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f9981608c4d66a186cb8cf8285d566f08ad2602e32687210e1c4b52776ace2ce28260405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a161749b613ae7565b5b5b505050565b80821415156175d2577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17f9981608c4d66a186cb8cf8285d566f08ad2602e32687210e1c4b52776ace2ce28260405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f9981608c4d66a186cb8cf8285d566f08ad2602e32687210e1c4b52776ace2ce28160405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a16175d1613ae7565b5b5b5050565b818314151561773e577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a17f6ef70c4515dcb57f1f7c3ffeeaea8187ae552495b0eb8fb171445d4e3433937a8360405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f6ef70c4515dcb57f1f7c3ffeeaea8187ae552495b0eb8fb171445d4e3433937a8260405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a161773d613ae7565b5b5b505050565b8082141515617874577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17f6ef70c4515dcb57f1f7c3ffeeaea8187ae552495b0eb8fb171445d4e3433937a8260405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f6ef70c4515dcb57f1f7c3ffeeaea8187ae552495b0eb8fb171445d4e3433937a8160405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1617873613ae7565b5b5b5050565b81831415156179e0577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a17fb02a54834047eb09ec60a1f6deccf5d4778fabb92fe5712aa3fffcac81c091e78360405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17fb02a54834047eb09ec60a1f6deccf5d4778fabb92fe5712aa3fffcac81c091e78260405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a16179df613ae7565b5b5b505050565b8082141515617b16577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fb02a54834047eb09ec60a1f6deccf5d4778fabb92fe5712aa3fffcac81c091e78260405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17fb02a54834047eb09ec60a1f6deccf5d4778fabb92fe5712aa3fffcac81c091e78160405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1617b15613ae7565b5b5b5050565b8183141515617c82577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a17fc66f3ffa94209dc1074c0d1e78574ef49b82322cce21713cf5ec12afd85107dd8360405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17fc66f3ffa94209dc1074c0d1e78574ef49b82322cce21713cf5ec12afd85107dd8260405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1617c81613ae7565b5b5b505050565b8082141515617db8577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fc66f3ffa94209dc1074c0d1e78574ef49b82322cce21713cf5ec12afd85107dd8260405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17fc66f3ffa94209dc1074c0d1e78574ef49b82322cce21713cf5ec12afd85107dd8160405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1617db7613ae7565b5b5b5050565b8183141515617f24577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a17f23493e72aa032dcdc22c464dbbf8cdc5d6e4547f241299e8b1ee3b4bd845cdc78360405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f23493e72aa032dcdc22c464dbbf8cdc5d6e4547f241299e8b1ee3b4bd845cdc78260405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1617f23613ae7565b5b5b505050565b808214151561805a577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17f23493e72aa032dcdc22c464dbbf8cdc5d6e4547f241299e8b1ee3b4bd845cdc78260405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f23493e72aa032dcdc22c464dbbf8cdc5d6e4547f241299e8b1ee3b4bd845cdc78160405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1618059613ae7565b5b5b5050565b81831415156181c6577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a17fe3bcfed47e476714cff02ee01d438b2ff2a048da5ab24c07991b5b557d858be38360405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17fe3bcfed47e476714cff02ee01d438b2ff2a048da5ab24c07991b5b557d858be38260405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a16181c5613ae7565b5b5b505050565b80821415156182fc577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe3bcfed47e476714cff02ee01d438b2ff2a048da5ab24c07991b5b557d858be38260405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17fe3bcfed47e476714cff02ee01d438b2ff2a048da5ab24c07991b5b557d858be38160405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a16182fb613ae7565b5b5b5050565b8183141515618468577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a17fc75fab2e6537d29d62050f6d98dd19c47d835f7a156f70eed73f97288a5c5cf18360405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17fc75fab2e6537d29d62050f6d98dd19c47d835f7a156f70eed73f97288a5c5cf18260405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1618467613ae7565b5b5b505050565b808214151561859e577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fc75fab2e6537d29d62050f6d98dd19c47d835f7a156f70eed73f97288a5c5cf18260405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17fc75fab2e6537d29d62050f6d98dd19c47d835f7a156f70eed73f97288a5c5cf18160405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a161859d613ae7565b5b5b5050565b818314151561870a577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a17ff7d9f95354cdf90d4ad2e48aab515793c53a5e896954104045fd82408289ea958360405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17ff7d9f95354cdf90d4ad2e48aab515793c53a5e896954104045fd82408289ea958260405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1618709613ae7565b5b5b505050565b8082141515618840577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17ff7d9f95354cdf90d4ad2e48aab515793c53a5e896954104045fd82408289ea958260405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17ff7d9f95354cdf90d4ad2e48aab515793c53a5e896954104045fd82408289ea958160405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a161883f613ae7565b5b5b5050565b81831415156189ac577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a17fb6c05c61e8ffc31c2ac50937653c340f0dd3876b1ab0bc41246da3ea7aba0a968360405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17fb6c05c61e8ffc31c2ac50937653c340f0dd3876b1ab0bc41246da3ea7aba0a968260405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a16189ab613ae7565b5b5b505050565b8082141515618ae2577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fb6c05c61e8ffc31c2ac50937653c340f0dd3876b1ab0bc41246da3ea7aba0a968260405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17fb6c05c61e8ffc31c2ac50937653c340f0dd3876b1ab0bc41246da3ea7aba0a968160405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1618ae1613ae7565b5b5b5050565b8183141515618c4e577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a17ffd9d4905ed776fd6b734ee61aebf93edf6bc1444d6088ea821eaccbed7a0370d8360405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17ffd9d4905ed776fd6b734ee61aebf93edf6bc1444d6088ea821eaccbed7a0370d8260405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1618c4d613ae7565b5b5b505050565b8082141515618d84577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17ffd9d4905ed776fd6b734ee61aebf93edf6bc1444d6088ea821eaccbed7a0370d8260405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17ffd9d4905ed776fd6b734ee61aebf93edf6bc1444d6088ea821eaccbed7a0370d8160405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1618d83613ae7565b5b5b5050565b8183141515618ef0577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a17fc6ab925b98031ae6be9325144426fc9f918777884382d5eefa1f85ce8f94ff578360405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17fc6ab925b98031ae6be9325144426fc9f918777884382d5eefa1f85ce8f94ff578260405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1618eef613ae7565b5b5b505050565b8082141515619026577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fc6ab925b98031ae6be9325144426fc9f918777884382d5eefa1f85ce8f94ff578260405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17fc6ab925b98031ae6be9325144426fc9f918777884382d5eefa1f85ce8f94ff578160405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1619025613ae7565b5b5b5050565b8183141515619192577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a17f0ff9e5d0ece73be9eac94421b1f3de6976603d08a5670fc8b0290135b0e6f3938360405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f0ff9e5d0ece73be9eac94421b1f3de6976603d08a5670fc8b0290135b0e6f3938260405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1619191613ae7565b5b5b505050565b80821415156192c8577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17f0ff9e5d0ece73be9eac94421b1f3de6976603d08a5670fc8b0290135b0e6f3938260405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f0ff9e5d0ece73be9eac94421b1f3de6976603d08a5670fc8b0290135b0e6f3938160405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a16192c7613ae7565b5b5b5050565b8183141515619434577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a17f31d6c79efda5caf66e472e9cc2610c125d7aa4842b04e4a0940d88c52c09b2e78360405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f31d6c79efda5caf66e472e9cc2610c125d7aa4842b04e4a0940d88c52c09b2e78260405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1619433613ae7565b5b5b505050565b808214151561956a577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17f31d6c79efda5caf66e472e9cc2610c125d7aa4842b04e4a0940d88c52c09b2e78260405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f31d6c79efda5caf66e472e9cc2610c125d7aa4842b04e4a0940d88c52c09b2e78160405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1619569613ae7565b5b5b5050565b81831415156196d6577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a17f1eba781f9ea807ed9f0dc91a228f24f64930570c35d45a682a439dd5fb20633b8360405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f1eba781f9ea807ed9f0dc91a228f24f64930570c35d45a682a439dd5fb20633b8260405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a16196d5613ae7565b5b5b505050565b808214151561980c577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17f1eba781f9ea807ed9f0dc91a228f24f64930570c35d45a682a439dd5fb20633b8260405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f1eba781f9ea807ed9f0dc91a228f24f64930570c35d45a682a439dd5fb20633b8160405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a161980b613ae7565b5b5b5050565b8183141515619978577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a17f7a927f0c5e39ca02f8480237d5a71af17110dfc04cb9babcafcb7b7970b487778360405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f7a927f0c5e39ca02f8480237d5a71af17110dfc04cb9babcafcb7b7970b487778260405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1619977613ae7565b5b5b505050565b8082141515619aae577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17f7a927f0c5e39ca02f8480237d5a71af17110dfc04cb9babcafcb7b7970b487778260405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f7a927f0c5e39ca02f8480237d5a71af17110dfc04cb9babcafcb7b7970b487778160405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1619aad613ae7565b5b5b5050565b8183141515619c1a577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a17ff24bab4f2b20478fdf347fb34f2a4f373fb6202a55623f6b4a45cc83861e72f68360405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17ff24bab4f2b20478fdf347fb34f2a4f373fb6202a55623f6b4a45cc83861e72f68260405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1619c19613ae7565b5b5b505050565b8082141515619d50577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17ff24bab4f2b20478fdf347fb34f2a4f373fb6202a55623f6b4a45cc83861e72f68260405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17ff24bab4f2b20478fdf347fb34f2a4f373fb6202a55623f6b4a45cc83861e72f68160405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1619d4f613ae7565b5b5b5050565b8183141515619ebc577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e3816040518082815260200191505060405180910390a17f4e19292d84b14551cbe921e45274700a09bac6717f68602c64912df59c33a6eb8360405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f4e19292d84b14551cbe921e45274700a09bac6717f68602c64912df59c33a6eb8260405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1619ebb613ae7565b5b5b505050565b8082141515619ff2577fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e360405180807f4e6f7420657175616c2100000000000000000000000000000000000000000000815260200150602001905060405180910390a17f4e19292d84b14551cbe921e45274700a09bac6717f68602c64912df59c33a6eb8260405180807f410000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a17f4e19292d84b14551cbe921e45274700a09bac6717f68602c64912df59c33a6eb8160405180807f420000000000000000000000000000000000000000000000000000000000000081526020015060200182815260200191505060405180910390a1619ff1613ae7565b5b5b505056'
      },
      'FeedbaseTester': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': 'target',
                'type': 'address'
              }
            ],
            'name': '_target',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'read',
            'outputs': [
              {
                'name': 'value',
                'type': 'bytes32'
              }
            ],
            'type': 'function'
          }
        ],
        'bytecode': '60606040526101d6806100126000396000f360606040523615610048576000357c0100000000000000000000000000000000000000000000000000000000900480634bbb216c146100b657806389b8b492146100ce57610048565b6100b45b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16600036604051808383808284378201915050925050506000604051808303816000866161da5a03f1915050505b565b005b6100cc60048080359060200190919050506101a7565b005b6100e460048080359060200190919050506100fa565b6040518082815260200191505060405180910390f35b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166389b8b49283604051827c0100000000000000000000000000000000000000000000000000000000028152600401808267ffffffffffffffff1681526020019150506020604051808303816000876161da5a03f115610002575050506040518051906020015090506101a2565b919050565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b5056'
      }
    };

    this.classes = {};
    for (var key in this.headers) {
      this.classes[key] = new ContractWrapper(this.headers[key], _web3);
    }

    this.objects = {};
    for (var i in env.objects) {
      var obj = env.objects[i];
      this.objects[i] = this.classes[obj['class']].at(obj.address);
    }
  }

  return {
    class: constructor,
    environments: environments
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = dapple['feedbase'];
}
