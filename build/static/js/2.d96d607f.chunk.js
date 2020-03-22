webpackJsonp([2],{139:function(e,t,r){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function i(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=r(0),c=r.n(a),s=r(152),l=r(11),u=r(42),p=r(43),d=r(17),f=r(7),b=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),h=function(e){function t(){return n(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),b(t,[{key:"componentDidMount",value:function(){this.props.onFetchedOrders(this.props.token)}},{key:"render",value:function(){var e=c.a.createElement(u.a,null);return this.props.orders.length<=0?e=c.a.createElement("h3",null,"No Active Orders"):this.props.loading||(e=this.props.orders.map(function(e){return c.a.createElement(s.a,{key:e.id,id:e.id,ingredients:e.ingredients,price:e.price})})),c.a.createElement("div",{style:{marginTop:"50px"}},e)}}]),t}(a.Component),m=function(e){return{orders:e.orderReducer.orders,loading:e.orderReducer.loading,token:e.authReducer.token}},y=function(e){return{onFetchedOrders:function(t){return e(d.i(t,localStorage.getItem("userId")))}}};t.default=Object(f.b)(m,y)(Object(p.a)(h,l.a))},152:function(e,t,r){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function i(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var a=r(0),c=r.n(a),s=r(153),l=r.n(s),u=r(41),p=r(18),d=r(17),f=r(7),b=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),h=function(e){function t(){var e,r,i,a;n(this,t);for(var c=arguments.length,s=Array(c),l=0;l<c;l++)s[l]=arguments[l];return r=i=o(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(s))),i.state={deletion:!1},i.deleteOrderHandler=function(){i.setState({deletion:!i.state.deletion})},i.cancelDeleteHandler=function(){i.setState({deletion:!1})},i.confirmDeleteOrderHandler=function(e){i.props.confirmDeleteOrder(e)},a=r,o(i,a)}return i(t,e),b(t,[{key:"render",value:function(){var e=this,t=[];for(var r in this.props.ingredients)t.push({name:r,quantity:this.props.ingredients[r]});var n=t.map(function(e){return c.a.createElement("span",{style:{textTransform:"capitalize",display:"inline-block",margin:"0 8px",border:"1px solid grey",padding:"2px"},key:e.name},e.name," ",e.quantity)});return c.a.createElement("div",{className:l.a.Order},c.a.createElement(p.a,{show:this.state.deletion,closeModal:this.cancelDeleteHandler},c.a.createElement("p",null,"Are you sure you want to delete this order ?"),c.a.createElement(u.a,{btnType:"Success",clicked:this.cancelDeleteHandler},"Cancel"),c.a.createElement(u.a,{btnType:"Danger",clicked:function(){return e.confirmDeleteOrderHandler(e.props.id)}},"Delete Order")),c.a.createElement("p",null,"Ingredients: ",n),c.a.createElement("p",null,"Price= ",c.a.createElement("strong",null,"Rs. ",this.props.price)),c.a.createElement(u.a,{btnType:"Danger",clicked:this.deleteOrderHandler},"Delete Order"))}}]),t}(a.Component),m=function(e){return{orders:e.orderReducer.orders}},y=function(e){return{confirmDeleteOrder:function(t){return e(d.h(t))}}};t.a=Object(f.b)(m,y)(h)},153:function(e,t,r){var n=r(154);"string"===typeof n&&(n=[[e.i,n,""]]);var o={hmr:!1};o.transform=void 0;r(136)(n,o);n.locals&&(e.exports=n.locals)},154:function(e,t,r){t=e.exports=r(135)(!0),t.push([e.i,".Order__Order__2bw7A{width:100%;border:1px solid #eee;-webkit-box-shadow:0 2px 3px #ccc;box-shadow:0 2px 3px #ccc;padding:10px;margin:10px auto;-webkit-box-sizing:border-box;box-sizing:border-box}","",{version:3,sources:["/home/utsav/Documents/Pizza_Builder/pizza-builder/src/components/Orders/Order.css"],names:[],mappings:"AAAA,qBACI,WAAY,AACZ,sBAAuB,AACvB,kCAAmC,AAC3B,0BAA2B,AACnC,aAAc,AACd,iBAAkB,AAClB,8BAA+B,AACvB,qBAAuB,CAClC",file:"Order.css",sourcesContent:[".Order {\n    width: 100%;\n    border: 1px solid #eee;\n    -webkit-box-shadow: 0 2px 3px #ccc;\n            box-shadow: 0 2px 3px #ccc;\n    padding: 10px;\n    margin: 10px auto;\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box;\n}"],sourceRoot:""}]),t.locals={Order:"Order__Order__2bw7A"}}});
//# sourceMappingURL=2.d96d607f.chunk.js.map