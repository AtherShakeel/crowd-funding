(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[206],{43535:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/ideas/requests/add/[add]",function(){return r(7449)}])},7449:function(e,t,r){"use strict";r.r(t),r.d(t,{__N_SSG:function(){return b}});var n=r(4111),s=r(47568),a=r(51438),i=r(52951),u=r(14924),c=r(88029),o=r(60460),l=r(34051),d=r.n(l),h=r(85893),p=r(67294),v=r(83544),Z=r(57950),f=r(1508),x=r(75424),g=r(60416),j=r(68156),_=r(80967),m=r(96215),S=function(e){(0,c.Z)(r,e);var t=(0,o.Z)(r);function r(){var e;(0,a.Z)(this,r),e=t.apply(this,arguments),(0,u.Z)((0,n.Z)(e),"state",{description:"",value:"",recipient:"",loading:!1,errorMessage:""});var i=(0,n.Z)(e);return(0,u.Z)((0,n.Z)(e),"onSubmit",function(){var e=(0,s.Z)(d().mark((function e(t){var r,n,s,a,u,c;return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),r=(0,Z.Z)(i.props.address),n=i.state,s=n.description,a=n.value,u=n.recipient,i.setState({loading:!0,errorMessage:""}),e.prev=4,e.next=7,f.Z.eth.getAccounts();case 7:return c=e.sent,e.next=10,r.methods.createRequest(s,f.Z.utils.toWei(a,"ether"),u).send({from:c[0]});case 10:m.Router.pushRoute("/ideas/requests/".concat(i.props.address)),e.next=17;break;case 13:e.prev=13,e.t0=e.catch(4),i.setState({errorMessage:e.t0.message}),console.log(e.t0);case 17:i.setState({loading:!1,description:"",value:"",recipient:""});case 18:case"end":return e.stop()}}),e,null,[[4,13]])})));return function(t){return e.apply(this,arguments)}}()),e}return(0,i.Z)(r,[{key:"render",value:function(){var e=this;return(0,h.jsxs)(v.Z,{children:[(0,h.jsx)(m.Link,{route:"/ideas/requests/".concat(this.props.address),children:(0,h.jsx)("a",{children:"Back"})}),(0,h.jsx)("h2",{children:" Create payment request "}),(0,h.jsxs)(x.Z,{onSubmit:this.onSubmit,error:!!this.state.errorMessage,children:[(0,h.jsxs)(x.Z.Field,{children:[(0,h.jsx)("label",{children:" Description "}),(0,h.jsx)(g.Z,{value:this.state.description,onChange:function(t){return e.setState({description:t.target.value})}})]}),(0,h.jsxs)(x.Z.Field,{children:[(0,h.jsx)("label",{children:" Amount in Ether "}),(0,h.jsx)(g.Z,{value:this.state.value,onChange:function(t){return e.setState({value:t.target.value})}})]}),(0,h.jsxs)(x.Z.Field,{children:[(0,h.jsx)("label",{children:" Recipient Address "}),(0,h.jsx)(g.Z,{value:this.state.recipient,onChange:function(t){return e.setState({recipient:t.target.value})}})]}),(0,h.jsx)(j.Z,{error:!0,header:"Oops!",content:this.state.errorMessage}),(0,h.jsx)(_.Z,{primary:!0,loading:this.state.loading,children:" Create "})]}),(0,h.jsx)("h5",{children:" ** Only the manager can create a payment request "})]})}}]),r}(p.Component),b=!0;t.default=S}},function(e){e.O(0,[774,565,482,714,275,905,578,194,888,179],(function(){return t=43535,e(e.s=t);var t}));var t=e.O();_N_E=t}]);