'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FormattedMessage = require('./FormattedMessage');

var _FormattedMessage2 = _interopRequireDefault(_FormattedMessage);

var _Box = require('./Box');

var _Box2 = _interopRequireDefault(_Box);

var _Layer = require('./Layer');

var _Layer2 = _interopRequireDefault(_Layer);

var _Menu = require('./Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _KeyboardAccelerators = require('../utils/KeyboardAccelerators');

var _KeyboardAccelerators2 = _interopRequireDefault(_KeyboardAccelerators);

var _Intl = require('../utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.SKIP_LINK_ANCHOR;

var SkipLinks = function (_Component) {
  (0, _inherits3.default)(SkipLinks, _Component);

  function SkipLinks(props, context) {
    (0, _classCallCheck3.default)(this, SkipLinks);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(SkipLinks).call(this, props, context));

    _this._processTab = _this._processTab.bind(_this);
    _this._onFocus = _this._onFocus.bind(_this);
    _this._updateAnchors = _this._updateAnchors.bind(_this);
    _this._checkForSkipLink = _this._checkForSkipLink.bind(_this);
    _this.state = { anchors: [], showLayer: false };
    return _this;
  }

  (0, _createClass3.default)(SkipLinks, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._updateAnchors();

      this._keyboardHandlers = {
        tab: this._processTab
      };
      _KeyboardAccelerators2.default.startListeningToKeyboard(this, this._keyboardHandlers);

      document.addEventListener('DOMNodeInserted', this._checkForSkipLink);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps() {
      this.setState({ routeChanged: true });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.state.routeChanged) {
        this.setState({ routeChanged: false }, this._updateAnchors);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _KeyboardAccelerators2.default.stopListeningToKeyboard(this, this._keyboardHandlers);
      document.removeEventListener('DOMNodeInserted', this._checkForSkipLink);
    }
  }, {
    key: '_checkForSkipLink',
    value: function _checkForSkipLink(event) {
      var skipLinks = document.querySelectorAll('.' + CLASS_ROOT);
      if (skipLinks.length > 0) {
        this._updateAnchors();
      } else if (this.state.anchors.length > 0) {
        this._updateAnchors();
      }
    }
  }, {
    key: '_updateAnchors',
    value: function _updateAnchors() {
      var anchorElements = document.querySelectorAll('.' + CLASS_ROOT);

      var anchors = Array.prototype.map.call(anchorElements, function (anchorElement) {
        return {
          id: anchorElement.getAttribute('id'),
          label: anchorElement.textContent
        };
      });

      this.setState({ anchors: anchors, routeChanged: false });
    }
  }, {
    key: '_onFocus',
    value: function _onFocus() {
      if (!this.state.showLayer) {
        this.setState({ showLayer: true });
      }
    }
  }, {
    key: '_processTab',
    value: function _processTab(event) {
      if (this.state.showLayer) {
        var currentAnchor = document.activeElement;
        var last = this.state.anchors.length - 1;

        var achorId = event.shiftKey ? this.state.anchors[0].id : this.state.anchors[last].id;

        var targetId = 'skipLayer_' + achorId;

        if (currentAnchor.id === targetId) {
          this.setState({ showLayer: false });
        }
      }
    }
  }, {
    key: '_onClick',
    value: function _onClick(destId) {
      return function (event) {
        var dest = document.getElementById(destId);
        dest.focus();
        this.setState({ showLayer: false });
      }.bind(this);
    }
  }, {
    key: 'render',
    value: function render() {

      var anchorElements = this.state.anchors.map(function (anchor, index) {
        var skipToLabel = _Intl2.default.getMessage(this.context.intl, 'Skip to');
        var a11yLabel = skipToLabel + ' ' + anchor.label;
        return _react2.default.createElement(
          'a',
          { href: '#' + anchor.id,
            onFocus: this._onFocus,
            onClick: this._onClick(anchor.id),
            id: 'skipLayer_' + anchor.id,
            key: anchor.id,
            'aria-label': a11yLabel },
          anchor.label
        );
      }.bind(this));

      var menuComponent = void 0;
      if (anchorElements.length > 0) {
        menuComponent = _react2.default.createElement(
          _Menu2.default,
          { direction: 'row', responsive: false },
          anchorElements
        );
      }

      return _react2.default.createElement(
        _Layer2.default,
        { id: 'skip-link-layer', hidden: !this.state.showLayer, align: 'top' },
        _react2.default.createElement(
          _Box2.default,
          { ref: 'skipLinksLayer',
            pad: { horizontal: 'small', vertical: 'medium' } },
          _react2.default.createElement(
            'h2',
            null,
            _react2.default.createElement(_FormattedMessage2.default, { id: 'Skip to', defaultMessage: 'Skip to' })
          ),
          menuComponent
        )
      );
    }
  }]);
  return SkipLinks;
}(_react.Component);

SkipLinks.displayName = 'SkipLinks';
exports.default = SkipLinks;


SkipLinks.contextTypes = {
  intl: _react.PropTypes.object
};
module.exports = exports['default'];