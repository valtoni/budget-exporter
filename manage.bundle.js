var cs=Object.create;var bi=Object.defineProperty;var ds=Object.getOwnPropertyDescriptor;var us=Object.getOwnPropertyNames;var ps=Object.getPrototypeOf,hs=Object.prototype.hasOwnProperty;var fs=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var ms=(e,t,o,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of us(t))!hs.call(e,n)&&n!==o&&bi(e,n,{get:()=>t[n],enumerable:!(i=ds(t,n))||i.enumerable});return e};var gs=(e,t,o)=>(o=e!=null?cs(ps(e)):{},ms(t||!e||!e.__esModule?bi(o,"default",{value:e,enumerable:!0}):o,e));var wn=fs((Qr,Jr)=>{(function(e,t){typeof Qr=="object"&&typeof Jr<"u"?Jr.exports=t():typeof define=="function"&&define.amd?define(t):(e=typeof globalThis<"u"?globalThis:e||self,e.TomSelect=t())})(Qr,(function(){"use strict";function e(l,r){l.split(/\s+/).forEach(a=>{r(a)})}class t{constructor(){this._events={}}on(r,a){e(r,s=>{let u=this._events[s]||[];u.push(a),this._events[s]=u})}off(r,a){var s=arguments.length;if(s===0){this._events={};return}e(r,u=>{if(s===1){delete this._events[u];return}let f=this._events[u];f!==void 0&&(f.splice(f.indexOf(a),1),this._events[u]=f)})}trigger(r,...a){var s=this;e(r,u=>{let f=s._events[u];f!==void 0&&f.forEach(p=>{p.apply(s,a)})})}}function o(l){return l.plugins={},class extends l{constructor(...r){super(...r),this.plugins={names:[],settings:{},requested:{},loaded:{}}}static define(r,a){l.plugins[r]={name:r,fn:a}}initializePlugins(r){var a,s;let u=this,f=[];if(Array.isArray(r))r.forEach(p=>{typeof p=="string"?f.push(p):(u.plugins.settings[p.name]=p.options,f.push(p.name))});else if(r)for(a in r)r.hasOwnProperty(a)&&(u.plugins.settings[a]=r[a],f.push(a));for(;s=f.shift();)u.require(s)}loadPlugin(r){var a=this,s=a.plugins,u=l.plugins[r];if(!l.plugins.hasOwnProperty(r))throw new Error('Unable to find "'+r+'" plugin');s.requested[r]=!0,s.loaded[r]=u.fn.apply(a,[a.plugins.settings[r]||{}]),s.names.push(r)}require(r){var a=this,s=a.plugins;if(!a.plugins.loaded.hasOwnProperty(r)){if(s.requested[r])throw new Error('Plugin has circular dependency ("'+r+'")');a.loadPlugin(r)}return s.loaded[r]}}}let i=l=>(l=l.filter(Boolean),l.length<2?l[0]||"":v(l)==1?"["+l.join("")+"]":"(?:"+l.join("|")+")"),n=l=>{if(!d(l))return l.join("");let r="",a=0,s=()=>{a>1&&(r+="{"+a+"}")};return l.forEach((u,f)=>{if(u===l[f-1]){a++;return}s(),r+=u,a=1}),s(),r},c=l=>{let r=Array.from(l);return i(r)},d=l=>new Set(l).size!==l.length,m=l=>(l+"").replace(/([\$\(\)\*\+\.\?\[\]\^\{\|\}\\])/gu,"\\$1"),v=l=>l.reduce((r,a)=>Math.max(r,y(a)),0),y=l=>Array.from(l).length,C=l=>{if(l.length===1)return[[l]];let r=[],a=l.substring(1);return C(a).forEach(function(u){let f=u.slice(0);f[0]=l.charAt(0)+f[0],r.push(f),f=u.slice(0),f.unshift(l.charAt(0)),r.push(f)}),r},b=[[0,65535]],S="[\u0300-\u036F\xB7\u02BE\u02BC]",k,$,I=3,D={},B={"/":"\u2044\u2215",0:"\u07C0",a:"\u2C65\u0250\u0251",aa:"\uA733",ae:"\xE6\u01FD\u01E3",ao:"\uA735",au:"\uA737",av:"\uA739\uA73B",ay:"\uA73D",b:"\u0180\u0253\u0183",c:"\uA73F\u0188\u023C\u2184",d:"\u0111\u0257\u0256\u1D05\u018C\uABB7\u0501\u0266",e:"\u025B\u01DD\u1D07\u0247",f:"\uA77C\u0192",g:"\u01E5\u0260\uA7A1\u1D79\uA77F\u0262",h:"\u0127\u2C68\u2C76\u0265",i:"\u0268\u0131",j:"\u0249\u0237",k:"\u0199\u2C6A\uA741\uA743\uA745\uA7A3",l:"\u0142\u019A\u026B\u2C61\uA749\uA747\uA781\u026D",m:"\u0271\u026F\u03FB",n:"\uA7A5\u019E\u0272\uA791\u1D0E\u043B\u0509",o:"\xF8\u01FF\u0254\u0275\uA74B\uA74D\u1D11",oe:"\u0153",oi:"\u01A3",oo:"\uA74F",ou:"\u0223",p:"\u01A5\u1D7D\uA751\uA753\uA755\u03C1",q:"\uA757\uA759\u024B",r:"\u024D\u027D\uA75B\uA7A7\uA783",s:"\xDF\u023F\uA7A9\uA785\u0282",t:"\u0167\u01AD\u0288\u2C66\uA787",th:"\xFE",tz:"\uA729",u:"\u0289",v:"\u028B\uA75F\u028C",vy:"\uA761",w:"\u2C73",y:"\u01B4\u024F\u1EFF",z:"\u01B6\u0225\u0240\u2C6C\uA763",hv:"\u0195"};for(let l in B){let r=B[l]||"";for(let a=0;a<r.length;a++){let s=r.substring(a,a+1);D[s]=l}}let Y=new RegExp(Object.keys(D).join("|")+"|"+S,"gu"),G=l=>{k===void 0&&(k=qe(b))},oe=(l,r="NFKD")=>l.normalize(r),he=l=>Array.from(l).reduce((r,a)=>r+fe(a),""),fe=l=>(l=oe(l).toLowerCase().replace(Y,r=>D[r]||""),oe(l,"NFC"));function*be(l){for(let[r,a]of l)for(let s=r;s<=a;s++){let u=String.fromCharCode(s),f=he(u);f!=u.toLowerCase()&&(f.length>I||f.length!=0&&(yield{folded:f,composed:u,code_point:s}))}}let Ye=l=>{let r={},a=(s,u)=>{let f=r[s]||new Set,p=new RegExp("^"+c(f)+"$","iu");u.match(p)||(f.add(m(u)),r[s]=f)};for(let s of be(l))a(s.folded,s.folded),a(s.folded,s.composed);return r},qe=l=>{let r=Ye(l),a={},s=[];for(let f in r){let p=r[f];p&&(a[f]=c(p)),f.length>1&&s.push(m(f))}s.sort((f,p)=>p.length-f.length);let u=i(s);return $=new RegExp("^"+u,"u"),a},Te=(l,r=1)=>{let a=0;return l=l.map(s=>(k[s]&&(a+=s.length),k[s]||s)),a>=r?n(l):""},et=(l,r=1)=>(r=Math.max(r,l.length-1),i(C(l).map(a=>Te(a,r)))),Be=(l,r=!0)=>{let a=l.length>1?1:0;return i(l.map(s=>{let u=[],f=r?s.length():s.length()-1;for(let p=0;p<f;p++)u.push(et(s.substrs[p]||"",a));return n(u)}))},tt=(l,r)=>{for(let a of r){if(a.start!=l.start||a.end!=l.end||a.substrs.join("")!==l.substrs.join(""))continue;let s=l.parts,u=p=>{for(let x of s){if(x.start===p.start&&x.substr===p.substr)return!1;if(!(p.length==1||x.length==1)&&(p.start<x.start&&p.end>x.start||x.start<p.start&&x.end>p.start))return!0}return!1};if(!(a.parts.filter(u).length>0))return!0}return!1};class ge{parts;substrs;start;end;constructor(){this.parts=[],this.substrs=[],this.start=0,this.end=0}add(r){r&&(this.parts.push(r),this.substrs.push(r.substr),this.start=Math.min(r.start,this.start),this.end=Math.max(r.end,this.end))}last(){return this.parts[this.parts.length-1]}length(){return this.parts.length}clone(r,a){let s=new ge,u=JSON.parse(JSON.stringify(this.parts)),f=u.pop();for(let L of u)s.add(L);let p=a.substr.substring(0,r-f.start),x=p.length;return s.add({start:f.start,end:f.start+x,length:x,substr:p}),s}}let ct=l=>{G(),l=he(l);let r="",a=[new ge];for(let s=0;s<l.length;s++){let f=l.substring(s).match($),p=l.substring(s,s+1),x=f?f[0]:null,L=[],_=new Set;for(let z of a){let T=z.last();if(!T||T.length==1||T.end<=s)if(x){let R=x.length;z.add({start:s,end:s+R,length:R,substr:x}),_.add("1")}else z.add({start:s,end:s+1,length:1,substr:p}),_.add("2");else if(x){let R=z.clone(s,T),ne=x.length;R.add({start:s,end:s+ne,length:ne,substr:x}),L.push(R)}else _.add("3")}if(L.length>0){L=L.sort((z,T)=>z.length()-T.length());for(let z of L)tt(z,a)||a.push(z);continue}if(s>0&&_.size==1&&!_.has("3")){r+=Be(a,!1);let z=new ge,T=a[0];T&&z.add(T.last()),a=[z]}}return r+=Be(a,!0),r},Ke=(l,r)=>{if(l)return l[r]},Re=(l,r)=>{if(l){for(var a,s=r.split(".");(a=s.shift())&&(l=l[a]););return l}},Ee=(l,r,a)=>{var s,u;return!l||(l=l+"",r.regex==null)||(u=l.search(r.regex),u===-1)?0:(s=r.string.length/l.length,u===0&&(s+=.5),s*a)},Ve=(l,r)=>{var a=l[r];if(typeof a=="function")return a;a&&!Array.isArray(a)&&(l[r]=[a])},Ht=(l,r)=>{if(Array.isArray(l))l.forEach(r);else for(var a in l)l.hasOwnProperty(a)&&r(l[a],a)},On=(l,r)=>typeof l=="number"&&typeof r=="number"?l>r?1:l<r?-1:0:(l=he(l+"").toLowerCase(),r=he(r+"").toLowerCase(),l>r?1:r>l?-1:0);class zn{items;settings;constructor(r,a){this.items=r,this.settings=a||{diacritics:!0}}tokenize(r,a,s){if(!r||!r.length)return[];let u=[],f=r.split(/\s+/);var p;return s&&(p=new RegExp("^("+Object.keys(s).map(m).join("|")+"):(.*)$")),f.forEach(x=>{let L,_=null,z=null;p&&(L=x.match(p))&&(_=L[1],x=L[2]),x.length>0&&(this.settings.diacritics?z=ct(x)||null:z=m(x),z&&a&&(z="\\b"+z)),u.push({string:x,regex:z?new RegExp(z,"iu"):null,field:_})}),u}getScoreFunction(r,a){var s=this.prepareSearch(r,a);return this._getScoreFunction(s)}_getScoreFunction(r){let a=r.tokens,s=a.length;if(!s)return function(){return 0};let u=r.options.fields,f=r.weights,p=u.length,x=r.getAttrFn;if(!p)return function(){return 1};let L=(function(){return p===1?function(_,z){let T=u[0].field;return Ee(x(z,T),_,f[T]||1)}:function(_,z){var T=0;if(_.field){let R=x(z,_.field);!_.regex&&R?T+=1/p:T+=Ee(R,_,1)}else Ht(f,(R,ne)=>{T+=Ee(x(z,ne),_,R)});return T/p}})();return s===1?function(_){return L(a[0],_)}:r.options.conjunction==="and"?function(_){var z,T=0;for(let R of a){if(z=L(R,_),z<=0)return 0;T+=z}return T/s}:function(_){var z=0;return Ht(a,T=>{z+=L(T,_)}),z/s}}getSortFunction(r,a){var s=this.prepareSearch(r,a);return this._getSortFunction(s)}_getSortFunction(r){var a,s=[];let u=this,f=r.options,p=!r.query&&f.sort_empty?f.sort_empty:f.sort;if(typeof p=="function")return p.bind(this);let x=function(_,z){return _==="$score"?z.score:r.getAttrFn(u.items[z.id],_)};if(p)for(let _ of p)(r.query||_.field!=="$score")&&s.push(_);if(r.query){a=!0;for(let _ of s)if(_.field==="$score"){a=!1;break}a&&s.unshift({field:"$score",direction:"desc"})}else s=s.filter(_=>_.field!=="$score");return s.length?function(_,z){var T,R;for(let ne of s)if(R=ne.field,T=(ne.direction==="desc"?-1:1)*On(x(R,_),x(R,z)),T)return T;return 0}:null}prepareSearch(r,a){let s={};var u=Object.assign({},a);if(Ve(u,"sort"),Ve(u,"sort_empty"),u.fields){Ve(u,"fields");let f=[];u.fields.forEach(p=>{typeof p=="string"&&(p={field:p,weight:1}),f.push(p),s[p.field]="weight"in p?p.weight:1}),u.fields=f}return{options:u,query:r.toLowerCase().trim(),tokens:this.tokenize(r,u.respect_word_boundaries,s),total:0,items:[],weights:s,getAttrFn:u.nesting?Re:Ke}}search(r,a){var s=this,u,f;f=this.prepareSearch(r,a),a=f.options,r=f.query;let p=a.score||s._getScoreFunction(f);r.length?Ht(s.items,(L,_)=>{u=p(L),(a.filter===!1||u>0)&&f.items.push({score:u,id:_})}):Ht(s.items,(L,_)=>{f.items.push({score:1,id:_})});let x=s._getSortFunction(f);return x&&f.items.sort(x),f.total=f.items.length,typeof a.limit=="number"&&(f.items=f.items.slice(0,a.limit)),f}}let Pe=l=>typeof l>"u"||l===null?null:So(l),So=l=>typeof l=="boolean"?l?"1":"0":l+"",Eo=l=>(l+"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"),In=(l,r)=>r>0?window.setTimeout(l,r):(l.call(null),null),Tn=(l,r)=>{var a;return function(s,u){var f=this;a&&(f.loading=Math.max(f.loading-1,0),clearTimeout(a)),a=setTimeout(function(){a=null,f.loadedSearches[s]=!0,l.call(f,s,u)},r)}},si=(l,r,a)=>{var s,u=l.trigger,f={};l.trigger=function(){var p=arguments[0];if(r.indexOf(p)!==-1)f[p]=arguments;else return u.apply(l,arguments)},a.apply(l,[]),l.trigger=u;for(s of r)s in f&&u.apply(l,f[s])},Fn=l=>({start:l.selectionStart||0,length:(l.selectionEnd||0)-(l.selectionStart||0)}),Q=(l,r=!1)=>{l&&(l.preventDefault(),r&&l.stopPropagation())},J=(l,r,a,s)=>{l.addEventListener(r,a,s)},_t=(l,r)=>{if(!r||!r[l])return!1;var a=(r.altKey?1:0)+(r.ctrlKey?1:0)+(r.shiftKey?1:0)+(r.metaKey?1:0);return a===1},gr=(l,r)=>{let a=l.getAttribute("id");return a||(l.setAttribute("id",r),r)},li=l=>l.replace(/[\\"']/g,"\\$&"),Lt=(l,r)=>{r&&l.append(r)},ke=(l,r)=>{if(Array.isArray(l))l.forEach(r);else for(var a in l)l.hasOwnProperty(a)&&r(l[a],a)},ye=l=>{if(l.jquery)return l[0];if(l instanceof HTMLElement)return l;if(ci(l)){var r=document.createElement("template");return r.innerHTML=l.trim(),r.content.firstChild}return document.querySelector(l)},ci=l=>typeof l=="string"&&l.indexOf("<")>-1,Mn=l=>l.replace(/['"\\]/g,"\\$&"),vr=(l,r)=>{var a=document.createEvent("HTMLEvents");a.initEvent(r,!0,!1),l.dispatchEvent(a)},Ao=(l,r)=>{Object.assign(l.style,r)},Ae=(l,...r)=>{var a=di(r);l=ui(l),l.map(s=>{a.map(u=>{s.classList.add(u)})})},dt=(l,...r)=>{var a=di(r);l=ui(l),l.map(s=>{a.map(u=>{s.classList.remove(u)})})},di=l=>{var r=[];return ke(l,a=>{typeof a=="string"&&(a=a.trim().split(/[\t\n\f\r\s]/)),Array.isArray(a)&&(r=r.concat(a))}),r.filter(Boolean)},ui=l=>(Array.isArray(l)||(l=[l]),l),$o=(l,r,a)=>{if(!(a&&!a.contains(l)))for(;l&&l.matches;){if(l.matches(r))return l;l=l.parentNode}},pi=(l,r=0)=>r>0?l[l.length-1]:l[0],Bn=l=>Object.keys(l).length===0,Oo=(l,r)=>{if(!l)return-1;r=r||l.nodeName;for(var a=0;l=l.previousElementSibling;)l.matches(r)&&a++;return a},ae=(l,r)=>{ke(r,(a,s)=>{a==null?l.removeAttribute(s):l.setAttribute(s,""+a)})},wr=(l,r)=>{l.parentNode&&l.parentNode.replaceChild(r,l)},Rn=(l,r)=>{if(r===null)return;if(typeof r=="string"){if(!r.length)return;r=new RegExp(r,"i")}let a=f=>{var p=f.data.match(r);if(p&&f.data.length>0){var x=document.createElement("span");x.className="highlight";var L=f.splitText(p.index);L.splitText(p[0].length);var _=L.cloneNode(!0);return x.appendChild(_),wr(L,x),1}return 0},s=f=>{f.nodeType===1&&f.childNodes&&!/(script|style)/i.test(f.tagName)&&(f.className!=="highlight"||f.tagName!=="SPAN")&&Array.from(f.childNodes).forEach(p=>{u(p)})},u=f=>f.nodeType===3?a(f):(s(f),0);u(l)},Pn=l=>{var r=l.querySelectorAll("span.highlight");Array.prototype.forEach.call(r,function(a){var s=a.parentNode;s.replaceChild(a.firstChild,a),s.normalize()})},Dn=65,Nn=13,hi=27,br=37,qn=38,fi=39,Vn=40,mi=8,Hn=46,yr=9,zo=(typeof navigator>"u"?!1:/Mac/.test(navigator.userAgent))?"metaKey":"ctrlKey";var gi={options:[],optgroups:[],plugins:[],delimiter:",",splitOn:null,persist:!0,diacritics:!0,create:null,createOnBlur:!1,createFilter:null,clearAfterSelect:!1,highlight:!0,openOnFocus:!0,shouldOpen:null,maxOptions:50,maxItems:null,hideSelected:null,duplicates:!1,addPrecedence:!1,selectOnTab:!1,preload:null,allowEmptyOption:!1,refreshThrottle:300,loadThrottle:300,loadingClass:"loading",dataAttr:null,optgroupField:"optgroup",valueField:"value",labelField:"text",disabledField:"disabled",optgroupLabelField:"label",optgroupValueField:"value",lockOptgroupOrder:!1,sortField:"$order",searchField:["text"],searchConjunction:"and",mode:null,wrapperClass:"ts-wrapper",controlClass:"ts-control",dropdownClass:"ts-dropdown",dropdownContentClass:"ts-dropdown-content",itemClass:"item",optionClass:"option",dropdownParent:null,controlInput:'<input type="text" autocomplete="off" size="1" />',copyClassesToDropdown:!1,placeholder:null,hidePlaceholder:null,shouldLoad:function(l){return l.length>0},render:{}};function vi(l,r){var a=Object.assign({},gi,r),s=a.dataAttr,u=a.labelField,f=a.valueField,p=a.disabledField,x=a.optgroupField,L=a.optgroupLabelField,_=a.optgroupValueField,z=l.tagName.toLowerCase(),T=l.getAttribute("placeholder")||l.getAttribute("data-placeholder");if(!T&&!a.allowEmptyOption){let F=l.querySelector('option[value=""]');F&&(T=F.textContent)}var R={placeholder:T,options:[],optgroups:[],items:[],maxItems:null},ne=()=>{var F,X=R.options,ee={},ue=1;let M=0;var re=pe=>{var K=Object.assign({},pe.dataset),P=s&&K[s];return typeof P=="string"&&P.length&&(K=Object.assign(K,JSON.parse(P))),K},wt=(pe,K)=>{var P=Pe(pe.value);if(P!=null&&!(!P&&!a.allowEmptyOption)){if(ee.hasOwnProperty(P)){if(K){var ve=ee[P][x];ve?Array.isArray(ve)?ve.push(K):ee[P][x]=[ve,K]:ee[P][x]=K}}else{var le=re(pe);le[u]=le[u]||pe.textContent,le[f]=le[f]||P,le[p]=le[p]||pe.disabled,le[x]=le[x]||K,le.$option=pe,le.$order=le.$order||++M,ee[P]=le,X.push(le)}pe.selected&&R.items.push(P)}},Io=pe=>{var K,P;P=re(pe),P[L]=P[L]||pe.getAttribute("label")||"",P[_]=P[_]||ue++,P[p]=P[p]||pe.disabled,P.$order=P.$order||++M,R.optgroups.push(P),K=P[_],ke(pe.children,ve=>{wt(ve,K)})};R.maxItems=l.hasAttribute("multiple")?null:1,ke(l.children,pe=>{F=pe.tagName.toLowerCase(),F==="optgroup"?Io(pe):F==="option"&&wt(pe)})},E=()=>{let F=l.getAttribute(s);if(F)R.options=JSON.parse(F),ke(R.options,M=>{R.items.push(M[f])});else{var X,ee,ue=(X=l==null||(ee=l.value)==null?void 0:ee.trim())!=null?X:"";if(!a.allowEmptyOption&&!ue.length)return;let M=ue.split(a.delimiter);ke(M,re=>{let wt={};wt[u]=re,wt[f]=re,R.options.push(wt)}),R.items=M}};return z==="select"?ne():E(),Object.assign({},gi,R,r)}var wi=0;class $e extends o(t){constructor(r,a){super(),this.order=0,this.isOpen=!1,this.isDisabled=!1,this.isReadOnly=!1,this.isInvalid=!1,this.isValid=!0,this.isLocked=!1,this.isFocused=!1,this.isInputHidden=!1,this.isSetup=!1,this.isDropdownContentStale=!0,this.ignoreFocus=!1,this.ignoreHover=!1,this.hasOptions=!1,this.lastValue="",this.caretPos=0,this.loading=0,this.loadedSearches={},this.activeOption=null,this.activeItems=[],this.optgroups={},this.options={},this.userOptions={},this.items=[],this.refreshTimeout=null,wi++;var s,u=ye(r);if(u.tomselect)throw new Error("Tom Select already initialized on this element");u.tomselect=this;var f=window.getComputedStyle&&window.getComputedStyle(u,null);s=f.getPropertyValue("direction");let p=vi(u,a);this.settings=p,this.input=u,this.tabIndex=u.tabIndex||0,this.is_select_tag=u.tagName.toLowerCase()==="select",this.rtl=/rtl/i.test(s),this.inputId=gr(u,"tomselect-"+wi),this.isRequired=u.required,this.sifter=new zn(this.options,{diacritics:p.diacritics}),p.mode=p.mode||(p.maxItems===1?"single":"multi"),typeof p.hideSelected!="boolean"&&(p.hideSelected=p.mode==="multi"),typeof p.hidePlaceholder!="boolean"&&(p.hidePlaceholder=p.mode!=="multi");var x=p.createFilter;typeof x!="function"&&(typeof x=="string"&&(x=new RegExp(x)),x instanceof RegExp?p.createFilter=X=>x.test(X):p.createFilter=X=>this.settings.duplicates||!this.options[X]),this.initializePlugins(p.plugins),this.setupCallbacks(),this.setupTemplates();let L=ye("<div>"),_=ye("<div>"),z=this._render("dropdown"),T=ye('<div role="listbox" tabindex="-1">'),R=this.input.getAttribute("class")||"",ne=p.mode;var E;if(Ae(L,p.wrapperClass,R,ne),Ae(_,p.controlClass),Lt(L,_),Ae(z,p.dropdownClass,ne),p.copyClassesToDropdown&&Ae(z,R),Ae(T,p.dropdownContentClass),Lt(z,T),ye(p.dropdownParent||L).appendChild(z),ci(p.controlInput)){E=ye(p.controlInput);var F=["autocorrect","autocapitalize","autocomplete","spellcheck","aria-label"];ke(F,X=>{u.getAttribute(X)&&ae(E,{[X]:u.getAttribute(X)})}),E.tabIndex=-1,_.appendChild(E),this.focus_node=E}else p.controlInput?(E=ye(p.controlInput),this.focus_node=E):(E=ye("<input/>"),this.focus_node=_);this.wrapper=L,this.dropdown=z,this.dropdown_content=T,this.control=_,this.control_input=E,this.setup()}setup(){let r=this,a=r.settings,s=r.control_input,u=r.dropdown,f=r.dropdown_content,p=r.wrapper,x=r.control,L=r.input,_=r.focus_node,z={passive:!0},T=r.inputId+"-ts-dropdown";ae(f,{id:T}),ae(_,{role:"combobox","aria-haspopup":"listbox","aria-expanded":"false","aria-controls":T});let R=gr(_,r.inputId+"-ts-control"),ne="label[for='"+Mn(r.inputId)+"']",E=document.querySelector(ne),F=r.focus.bind(r);if(E){J(E,"click",F),ae(E,{for:R});let M=gr(E,r.inputId+"-ts-label");ae(_,{"aria-labelledby":M}),ae(f,{"aria-labelledby":M})}if(p.style.width=L.style.width,p.style.minWidth=L.style.minWidth,p.style.maxWidth=L.style.maxWidth,r.plugins.names.length){let M="plugin-"+r.plugins.names.join(" plugin-");Ae([p,u],M)}(a.maxItems===null||a.maxItems>1)&&r.is_select_tag&&ae(L,{multiple:"multiple"}),a.placeholder&&ae(s,{placeholder:a.placeholder}),!a.splitOn&&a.delimiter&&(a.splitOn=new RegExp("\\s*"+m(a.delimiter)+"+\\s*")),a.load&&a.loadThrottle&&(a.load=Tn(a.load,a.loadThrottle)),J(u,"mousemove",()=>{r.ignoreHover=!1}),J(u,"mouseenter",M=>{var re=$o(M.target,"[data-selectable]",u);re&&r.onOptionHover(M,re)},{capture:!0}),J(u,"click",M=>{let re=$o(M.target,"[data-selectable]");re&&(r.onOptionSelect(M,re),Q(M,!0))}),J(x,"click",M=>{var re=$o(M.target,"[data-ts-item]",x);if(re&&r.onItemSelect(M,re)){Q(M,!0);return}s.value==""&&(r.onClick(),Q(M,!0))}),J(_,"keydown",M=>r.onKeyDown(M)),J(s,"keypress",M=>r.onKeyPress(M)),J(s,"input",M=>r.onInput(M)),J(_,"blur",M=>r.onBlur(M)),J(_,"focus",M=>r.onFocus(M)),J(s,"paste",M=>r.onPaste(M));let X=M=>{let re=M.composedPath()[0];if(!p.contains(re)&&!u.contains(re)){r.isFocused&&r.blur(),r.inputState();return}re==s&&r.isOpen?M.stopPropagation():Q(M,!0)},ee=()=>{r.isOpen&&r.positionDropdown()},ue=()=>{r.isValid&&(r.isValid=!1,r.isInvalid=!0,r.refreshState())};J(L,"invalid",ue),J(document,"mousedown",X),J(window,"scroll",ee,z),J(window,"resize",ee,z),this._destroy=()=>{L.removeEventListener("invalid",ue),document.removeEventListener("mousedown",X),window.removeEventListener("scroll",ee),window.removeEventListener("resize",ee),E&&E.removeEventListener("click",F)},this.revertSettings={innerHTML:L.innerHTML,tabIndex:L.tabIndex},L.tabIndex=-1,L.insertAdjacentElement("afterend",r.wrapper),r.sync(!1),a.items=[],delete a.optgroups,delete a.options,r.refreshItems(),r.close(!1),r.inputState(),r.isSetup=!0,r.on("change",this.onChange),Ae(L,"tomselected","ts-hidden-accessible"),r.trigger("initialize"),a.preload===!0&&r.preload()}setupOptions(r=[],a=[]){this.addOptions(r),ke(a,s=>{this.registerOptionGroup(s)})}setupTemplates(){var r=this,a=r.settings.labelField,s=r.settings.optgroupLabelField,u={optgroup:f=>{let p=document.createElement("div");return p.className="optgroup",p.appendChild(f.options),p},optgroup_header:(f,p)=>'<div class="optgroup-header">'+p(f[s])+"</div>",option:(f,p)=>"<div>"+p(f[a])+"</div>",item:(f,p)=>"<div>"+p(f[a])+"</div>",option_create:(f,p)=>'<div class="create">Add <strong>'+p(f.input)+"</strong>&hellip;</div>",no_results:()=>'<div class="no-results">No results found</div>',loading:()=>'<div class="spinner"></div>',not_loading:()=>{},dropdown:()=>"<div></div>"};r.settings.render=Object.assign({},u,r.settings.render)}setupCallbacks(){var r,a,s={initialize:"onInitialize",change:"onChange",item_add:"onItemAdd",item_remove:"onItemRemove",item_select:"onItemSelect",clear:"onClear",option_add:"onOptionAdd",option_remove:"onOptionRemove",option_clear:"onOptionClear",optgroup_add:"onOptionGroupAdd",optgroup_remove:"onOptionGroupRemove",optgroup_clear:"onOptionGroupClear",dropdown_open:"onDropdownOpen",dropdown_close:"onDropdownClose",type:"onType",load:"onLoad",focus:"onFocus",blur:"onBlur"};for(r in s)a=this.settings[s[r]],a&&this.on(r,a)}sync(r=!0){let a=this,s=r?vi(a.input,{delimiter:a.settings.delimiter,allowEmptyOption:a.settings.allowEmptyOption}):a.settings;a.setupOptions(s.options,s.optgroups),a.setValue(s.items||[],!0),a.input.disabled?a.disable():a.input.readOnly?a.setReadOnly(!0):a.enable(),a.lastQuery=null}onClick(){var r=this;if(r.activeItems.length>0){r.clearActiveItems(),r.focus();return}r.isFocused&&r.isOpen?r.blur():r.focus()}onMouseDown(){}onChange(){vr(this.input,"input"),vr(this.input,"change")}onPaste(r){var a=this;if(a.isInputHidden||a.isLocked){Q(r);return}a.settings.splitOn&&setTimeout(()=>{var s=a.inputValue();if(s.match(a.settings.splitOn)){var u=s.trim().split(a.settings.splitOn);ke(u,f=>{Pe(f)&&(this.options[f]?a.addItem(f):a.createItem(f))})}},0)}onKeyPress(r){var a=this;if(a.isLocked){Q(r);return}var s=String.fromCharCode(r.keyCode||r.which);if(a.settings.create&&a.settings.mode==="multi"&&s===a.settings.delimiter){a.createItem(),Q(r);return}}onKeyDown(r){var a=this;if(a.ignoreHover=!0,a.isLocked){r.keyCode!==yr&&Q(r);return}switch(r.keyCode){case Dn:if(_t(zo,r)&&a.control_input.value==""){Q(r),a.selectAll();return}break;case hi:a.isOpen&&(Q(r,!0),a.close()),a.clearActiveItems();return;case Vn:if(!a.isOpen&&a.hasOptions)a.open();else if(a.activeOption){let s=a.getAdjacent(a.activeOption,1);s&&a.setActiveOption(s)}Q(r);return;case qn:if(a.activeOption){let s=a.getAdjacent(a.activeOption,-1);s&&a.setActiveOption(s)}Q(r);return;case Nn:a.canSelect(a.activeOption)?(a.onOptionSelect(r,a.activeOption),Q(r)):(a.settings.create&&a.createItem()||document.activeElement==a.control_input&&a.isOpen)&&Q(r);return;case br:a.advanceSelection(-1,r);return;case fi:a.advanceSelection(1,r);return;case yr:a.settings.selectOnTab&&(a.canSelect(a.activeOption)?(a.onOptionSelect(r,a.activeOption),Q(r)):a.settings.create&&a.createItem()&&Q(r));return;case mi:case Hn:a.deleteSelection(r);return}a.isInputHidden&&!_t(zo,r)&&Q(r)}onInput(r){if(this.isLocked)return;let a=this.inputValue();if(this.lastValue!==a){if(this.lastValue=a,a==""){this._onInput();return}this.refreshTimeout&&window.clearTimeout(this.refreshTimeout),this.refreshTimeout=In(()=>{this.refreshTimeout=null,this._onInput()},this.settings.refreshThrottle)}}_onInput(){let r=this.lastValue;this.settings.shouldLoad.call(this,r)&&this.load(r),this.refreshOptions(),this.trigger("type",r)}onOptionHover(r,a){this.ignoreHover||this.setActiveOption(a,!1)}onFocus(r){var a=this,s=a.isFocused;if(a.isDisabled||a.isReadOnly){a.blur(),Q(r);return}a.ignoreFocus||(a.isFocused=!0,a.settings.preload==="focus"&&a.preload(),s||a.trigger("focus"),a.activeItems.length||(a.inputState(),a.refreshOptions(!!a.settings.openOnFocus)),a.refreshState())}onBlur(r){if(document.hasFocus()!==!1){var a=this;if(a.isFocused){a.isFocused=!1,a.ignoreFocus=!1;var s=()=>{a.close(),a.setActiveItem(),a.setCaret(a.items.length),a.trigger("blur")};a.settings.create&&a.settings.createOnBlur?a.createItem(null,s):s()}}}onOptionSelect(r,a){var s,u=this;a.parentElement&&a.parentElement.matches("[data-disabled]")||(a.classList.contains("create")?u.createItem(null,()=>{u.settings.closeAfterSelect?u.close():u.settings.clearAfterSelect&&u.setTextboxValue()}):(s=a.dataset.value,typeof s<"u"&&(u.isDropdownContentStale=u.settings.hideSelected,u.addItem(s),u.settings.closeAfterSelect?u.close():u.settings.clearAfterSelect&&u.setTextboxValue(),!u.settings.hideSelected&&r.type&&/click/.test(r.type)&&u.setActiveOption(a))))}canSelect(r){return!!(this.isOpen&&r&&this.dropdown_content.contains(r))}onItemSelect(r,a){var s=this;return!s.isLocked&&s.settings.mode==="multi"?(Q(r),s.setActiveItem(a,r),!0):!1}canLoad(r){return!(!this.settings.load||this.loadedSearches.hasOwnProperty(r))}load(r){let a=this;if(!a.canLoad(r))return;Ae(a.wrapper,a.settings.loadingClass),a.loading++;let s=a.loadCallback.bind(a);a.settings.load.call(a,r,s)}loadCallback(r,a){let s=this;s.loading=Math.max(s.loading-1,0),s.isDropdownContentStale=!0,s.clearActiveOption(),s.setupOptions(r,a),s.refreshOptions(s.isFocused&&!s.isInputHidden),s.loading||dt(s.wrapper,s.settings.loadingClass),s.trigger("load",r,a)}preload(){var r=this.wrapper.classList;r.contains("preloaded")||(r.add("preloaded"),this.load(""))}setTextboxValue(r=""){var a=this.control_input,s=a.value!==r;s&&(a.value=r,vr(a,"update"),this.lastValue=r)}getValue(){return this.is_select_tag&&this.input.hasAttribute("multiple")?this.items:this.items.join(this.settings.delimiter)}setValue(r,a){var s=a?[]:["change"];si(this,s,()=>{this.clear(a),this.addItems(r,a)})}setMaxItems(r){r===0&&(r=null),this.settings.maxItems=r,this.refreshState()}setActiveItem(r,a){var s=this,u,f,p,x,L,_;if(s.settings.mode!=="single"){if(!r){s.clearActiveItems(),s.isFocused&&s.inputState();return}if(u=a&&a.type.toLowerCase(),u==="click"&&_t("shiftKey",a)&&s.activeItems.length){for(_=s.getLastActive(),p=Array.prototype.indexOf.call(s.control.children,_),x=Array.prototype.indexOf.call(s.control.children,r),p>x&&(L=p,p=x,x=L),f=p;f<=x;f++)r=s.control.children[f],s.activeItems.indexOf(r)===-1&&s.setActiveItemClass(r);Q(a)}else u==="click"&&_t(zo,a)||u==="keydown"&&_t("shiftKey",a)?r.classList.contains("active")?s.removeActiveItem(r):s.setActiveItemClass(r):(s.clearActiveItems(),s.setActiveItemClass(r));s.inputState(),s.isFocused||s.focus()}}setActiveItemClass(r){let a=this,s=a.control.querySelector(".last-active");s&&dt(s,"last-active"),Ae(r,"active last-active"),a.trigger("item_select",r),a.activeItems.indexOf(r)==-1&&a.activeItems.push(r)}removeActiveItem(r){var a=this.activeItems.indexOf(r);this.activeItems.splice(a,1),dt(r,"active")}clearActiveItems(){dt(this.activeItems,"active"),this.activeItems=[]}setActiveOption(r,a=!0){r!==this.activeOption&&(this.clearActiveOption(),r&&(this.activeOption=r,ae(this.focus_node,{"aria-activedescendant":r.getAttribute("id")}),ae(r,{"aria-selected":"true"}),Ae(r,"active"),a&&this.scrollToOption(r)))}scrollToOption(r,a){if(!r)return;let s=this.dropdown_content,u=s.clientHeight,f=s.scrollTop||0,p=r.offsetHeight,x=r.getBoundingClientRect().top-s.getBoundingClientRect().top+f;x+p>u+f?this.scroll(x-u+p,a):x<f&&this.scroll(x,a)}scroll(r,a){let s=this.dropdown_content;a&&(s.style.scrollBehavior=a),s.scrollTop=r,s.style.scrollBehavior=""}clearActiveOption(){this.activeOption&&(dt(this.activeOption,"active"),ae(this.activeOption,{"aria-selected":null})),this.activeOption=null,ae(this.focus_node,{"aria-activedescendant":null})}selectAll(){let r=this;if(r.settings.mode==="single")return;let a=r.controlChildren();a.length&&(r.inputState(),r.close(),r.activeItems=a,ke(a,s=>{r.setActiveItemClass(s)}))}inputState(){var r=this;r.control.contains(r.control_input)&&(ae(r.control_input,{placeholder:r.settings.placeholder}),r.activeItems.length>0||!r.isFocused&&r.settings.hidePlaceholder&&r.items.length>0?(r.setTextboxValue(),r.isInputHidden=!0):(r.settings.hidePlaceholder&&r.items.length>0&&ae(r.control_input,{placeholder:""}),r.isInputHidden=!1),r.wrapper.classList.toggle("input-hidden",r.isInputHidden))}inputValue(){return this.control_input.value.trim()}focus(){var r=this;if(r.isDisabled||r.isReadOnly)return;r.ignoreFocus=!0;let a=this.control_input.offsetWidth?this.control_input:this.focus_node;a.focus(),setTimeout(()=>{r.ignoreFocus=!1,a.getRootNode().activeElement===a&&this.onFocus()},0)}blur(){this.focus_node.blur(),this.onBlur()}getScoreFunction(r){return this.sifter.getScoreFunction(r,this.getSearchOptions())}getSearchOptions(){var r=this.settings,a=r.sortField;return typeof r.sortField=="string"&&(a=[{field:r.sortField}]),{fields:r.searchField,conjunction:r.searchConjunction,sort:a,nesting:r.nesting}}search(r){var a,s,u=this,f=this.getSearchOptions();if(u.settings.score&&(s=u.settings.score.call(u,r),typeof s!="function"))throw new Error('Tom Select "score" setting must be a function that returns a function');return u.isDropdownContentStale||r!==u.lastQuery?(u.lastQuery=r,/(.)\1{15,}/.test(r)&&(r=""),a=u.sifter.search(r,Object.assign(f,{score:s})),u.currentResults=a):a=Object.assign({},u.currentResults),u.settings.hideSelected&&(a.items=a.items.filter(p=>{let x=Pe(p.id);return!(x!==null&&u.items.indexOf(x)!==-1)})),a}refreshOptions(r=!0){var a,s,u,f,p,x,L,_,z,T;let R={},ne=[];var E=this,F=E.inputValue();let X=F===E.lastQuery||F==""&&E.lastQuery==null;var ee=E.search(F),ue=null,M=E.settings.shouldOpen||!1,re=E.dropdown_content;X&&(ue=E.activeOption,ue&&(z=ue.closest("[data-group]"))),f=ee.items.length,typeof E.settings.maxOptions=="number"&&(f=Math.min(f,E.settings.maxOptions)),f>0&&(M=!0);let wt=(K,P)=>{let ve=R[K];if(ve!==void 0){let Oe=ne[ve];if(Oe!==void 0)return[ve,Oe.fragment]}let le=document.createDocumentFragment();return ve=ne.length,ne.push({fragment:le,order:P,optgroup:K}),[ve,le]};for(a=0;a<f;a++){let K=ee.items[a];if(!K)continue;let P=K.id,ve=E.options[P];if(ve===void 0)continue;let le=So(P),Oe=E.getOption(le,!0);for(E.settings.hideSelected||Oe.classList.toggle("selected",E.items.includes(le)),p=ve[E.settings.optgroupField]||"",x=Array.isArray(p)?p:[p],s=0,u=x&&x.length;s<u;s++){p=x[s];let To=ve.$order,Ut=E.optgroups[p];if(Ut===void 0&&typeof E.settings.optionGroupRegister=="function"){var Io;(Io=E.settings.optionGroupRegister.apply(E,[p]))&&E.registerOptionGroup(Io)}Ut=E.optgroups[p],Ut===void 0?p="":To=Ut.$order;let[ss,ls]=wt(p,To);s>0&&(Oe=Oe.cloneNode(!0),ae(Oe,{id:ve.$id+"-clone-"+s,"aria-selected":null}),Oe.classList.add("ts-cloned"),dt(Oe,"active"),E.activeOption&&E.activeOption.dataset.value==P&&z&&z.dataset.group===p.toString()&&(ue=Oe)),ls.appendChild(Oe),p!=""&&(R[p]=ss)}}E.settings.lockOptgroupOrder&&ne.sort((K,P)=>K.order-P.order),L=document.createDocumentFragment(),ke(ne,K=>{let P=K.fragment,ve=K.optgroup;if(!P||!P.children.length)return;let le=E.optgroups[ve];if(le!==void 0){let Oe=document.createDocumentFragment(),To=E.render("optgroup_header",le);Lt(Oe,To),Lt(Oe,P);let Ut=E.render("optgroup",{group:le,options:Oe});Lt(L,Ut)}else Lt(L,P)}),re.innerHTML="",Lt(re,L),E.isDropdownContentStale=!1,E.settings.highlight&&(Pn(re),ee.query.length&&ee.tokens.length&&ke(ee.tokens,K=>{Rn(re,K.regex)}));var pe=K=>{let P=E.render(K,{input:F});return P&&(M=!0,re.insertBefore(P,re.firstChild)),P};if(E.loading?pe("loading"):E.settings.shouldLoad.call(E,F)?ee.items.length===0&&pe("no_results"):pe("not_loading"),_=E.canCreate(F),_&&(T=pe("option_create")),E.hasOptions=ee.items.length>0||_,M){if(ee.items.length>0){if(!ue&&E.settings.mode==="single"&&E.items[0]!=null&&(ue=E.getOption(E.items[0])),!re.contains(ue)){let K=0;T&&!E.settings.addPrecedence&&(K=1),ue=E.selectable()[K]}}else T&&(ue=T);r&&!E.isOpen&&(E.open(),E.scrollToOption(ue,"auto")),E.setActiveOption(ue)}else E.clearActiveOption(),r&&E.isOpen&&E.close(!1)}selectable(){return this.dropdown_content.querySelectorAll("[data-selectable]")}addOption(r,a=!1){let s=this;if(Array.isArray(r))return s.addOptions(r,a),!1;let u=Pe(r[s.settings.valueField]);return u===null||s.options.hasOwnProperty(u)?(s.updateOption(r[s.settings.valueField],r),!1):(r.$order=r.$order||++s.order,r.$id=s.inputId+"-opt-"+r.$order,s.options[u]=r,s.isDropdownContentStale=!0,a&&(s.userOptions[u]=a,s.trigger("option_add",u,r)),u)}addOptions(r,a=!1){ke(r,s=>{this.addOption(s,a)})}registerOption(r){return this.addOption(r)}registerOptionGroup(r){var a=Pe(r[this.settings.optgroupValueField]);return a===null?!1:(r.$order=r.$order||++this.order,this.optgroups[a]=r,a)}addOptionGroup(r,a){var s;a[this.settings.optgroupValueField]=r,(s=this.registerOptionGroup(a))&&this.trigger("optgroup_add",s,a)}removeOptionGroup(r){this.optgroups.hasOwnProperty(r)&&(delete this.optgroups[r],this.clearCache(),this.trigger("optgroup_remove",r))}clearOptionGroups(){this.optgroups={},this.clearCache(),this.trigger("optgroup_clear")}updateOption(r,a){let s=this;var u,f;let p=Pe(r),x=Pe(a[s.settings.valueField]);if(p===null)return;let L=s.options[p];if(L==null)return;if(typeof x!="string")throw new Error("Value must be set in option data");let _=s.getOption(p),z=s.getItem(p);if(a.$order=a.$order||L.$order,delete s.options[p],s.uncacheValue(x),s.options[x]=a,_){if(s.dropdown_content.contains(_)){let T=s._render("option",a);wr(_,T),s.activeOption===_&&s.setActiveOption(T)}_.remove()}z&&(f=s.items.indexOf(p),f!==-1&&s.items.splice(f,1,x),u=s._render("item",a),z.classList.contains("active")&&Ae(u,"active"),wr(z,u)),s.isDropdownContentStale=!0}removeOption(r,a){let s=this;r=So(r),s.uncacheValue(r),delete s.userOptions[r],delete s.options[r],s.isDropdownContentStale=!0,s.trigger("option_remove",r),s.removeItem(r,a)}clearOptions(r){let a=(r||this.clearFilter).bind(this);this.loadedSearches={},this.userOptions={},this.clearCache();let s={};ke(this.options,(u,f)=>{a(u,f)&&(s[f]=u)}),this.options=this.sifter.items=s,this.isDropdownContentStale=!0,this.trigger("option_clear")}clearFilter(r,a){return this.items.indexOf(a)>=0}getOption(r,a=!1){let s=Pe(r);if(s===null)return null;let u=this.options[s];if(u!=null){if(u.$div)return u.$div;if(a)return this._render("option",u)}return null}getAdjacent(r,a,s="option"){var u=this,f;if(!r)return null;s=="item"?f=u.controlChildren():f=u.dropdown_content.querySelectorAll("[data-selectable]");for(let p=0;p<f.length;p++)if(f[p]==r)return a>0?f[p+1]:f[p-1];return null}getItem(r){if(typeof r=="object")return r;var a=Pe(r);return a!==null?this.control.querySelector(`[data-value="${li(a)}"]`):null}addItems(r,a){var s=this,u=Array.isArray(r)?r:[r];u=u.filter(p=>s.items.indexOf(p)===-1);let f=u[u.length-1];u.forEach(p=>{s.isPending=p!==f,s.addItem(p,a)})}addItem(r,a){var s=a?[]:["change","dropdown_close"];si(this,s,()=>{var u,f;let p=this,x=p.settings.mode,L=Pe(r);if(!(L&&p.items.indexOf(L)!==-1&&(x==="single"&&p.close(),x==="single"||!p.settings.duplicates))&&!(L===null||!p.options.hasOwnProperty(L))&&(x==="single"&&p.clear(a),!(x==="multi"&&p.isFull()))){if(u=p._render("item",p.options[L]),p.control.contains(u)&&(u=u.cloneNode(!0)),f=p.isFull(),p.items.splice(p.caretPos,0,L),p.insertAtCaret(u),p.isSetup){if(!p.isPending&&p.settings.hideSelected){let _=p.getOption(L),z=p.getAdjacent(_,1);z&&p.setActiveOption(z)}p.settings.clearAfterSelect&&p.setTextboxValue(),!p.isPending&&!p.settings.closeAfterSelect&&p.refreshOptions(p.isFocused&&x!=="single"),p.settings.closeAfterSelect!=!1&&p.isFull()?p.close():p.isPending||p.positionDropdown(),p.trigger("item_add",L,u),p.isPending||p.updateOriginalInput({silent:a})}(!p.isPending||!f&&p.isFull())&&(p.inputState(),p.refreshState())}})}removeItem(r=null,a){let s=this;if(r=s.getItem(r),!r)return;var u,f;let p=r.dataset.value;u=Oo(r),r.remove(),r.classList.contains("active")&&(f=s.activeItems.indexOf(r),s.activeItems.splice(f,1),dt(r,"active")),s.items.splice(u,1),s.isDropdownContentStale=!0,!s.settings.persist&&s.userOptions.hasOwnProperty(p)&&s.removeOption(p,a),u<s.caretPos&&s.setCaret(s.caretPos-1),s.updateOriginalInput({silent:a}),s.refreshState(),s.positionDropdown(),s.trigger("item_remove",p,r)}createItem(r=null,a=()=>{}){arguments.length===3&&(a=arguments[2]),typeof a!="function"&&(a=()=>{});var s=this,u=s.caretPos,f;if(r=r||s.inputValue(),!s.canCreate(r))return Pe(r)&&this.options[r]&&s.addItem(r),a(),!1;s.lock();var p=!1,x=L=>{if(s.unlock(),!L||typeof L!="object")return a();var _=Pe(L[s.settings.valueField]);if(typeof _!="string")return a();s.setTextboxValue(),s.addOption(L,!0),s.setCaret(u),s.addItem(_),a(L),p=!0};return typeof s.settings.create=="function"?f=s.settings.create.call(this,r,x):f={[s.settings.labelField]:r,[s.settings.valueField]:r},p||x(f),!0}refreshItems(){var r=this;r.isDropdownContentStale=!0,r.isSetup&&r.addItems(r.items),r.updateOriginalInput(),r.refreshState()}refreshState(){let r=this;r.refreshValidityState();let a=r.isFull(),s=r.isLocked;r.wrapper.classList.toggle("rtl",r.rtl);let u=r.wrapper.classList;u.toggle("focus",r.isFocused),u.toggle("disabled",r.isDisabled),u.toggle("readonly",r.isReadOnly),u.toggle("required",r.isRequired),u.toggle("invalid",!r.isValid),u.toggle("locked",s),u.toggle("full",a),u.toggle("input-active",r.isFocused&&!r.isInputHidden),u.toggle("dropdown-active",r.isOpen),u.toggle("has-options",Bn(r.options)),u.toggle("has-items",r.items.length>0)}refreshValidityState(){var r=this;r.input.validity&&(r.isValid=r.input.validity.valid,r.isInvalid=!r.isValid)}isFull(){return this.settings.maxItems!==null&&this.items.length>=this.settings.maxItems}updateOriginalInput(r={}){let a=this;var s,u;let f=a.input.querySelector('option[value=""]');if(a.is_select_tag){let L=function(_,z,T){return _||(_=ye('<option value="'+Eo(z)+'">'+Eo(T)+"</option>")),_!=f&&a.input.append(_),p.push(_),(_!=f||x>0)&&(_.selected=!0),_},p=[],x=a.input.querySelectorAll("option:checked").length;a.input.querySelectorAll("option:checked").forEach(_=>{_.selected=!1}),a.items.length==0&&a.settings.mode=="single"?L(f,"",""):a.items.forEach(_=>{if(s=a.options[_],u=s[a.settings.labelField]||"",p.includes(s.$option)){let z=a.input.querySelector(`option[value="${li(_)}"]:not(:checked)`);L(z,_,u)}else s.$option=L(s.$option,_,u)})}else a.input.value=a.getValue();a.isSetup&&(r.silent||a.trigger("change",a.getValue()))}open(){var r=this;r.isLocked||r.isOpen||r.settings.mode==="multi"&&r.isFull()||(r.isOpen=!0,ae(r.focus_node,{"aria-expanded":"true"}),r.refreshState(),Ao(r.dropdown,{visibility:"hidden",display:"block"}),r.positionDropdown(),Ao(r.dropdown,{visibility:"visible",display:"block"}),r.focus(),r.trigger("dropdown_open",r.dropdown))}close(r=!0){var a=this,s=a.isOpen;r&&(a.setTextboxValue(),a.settings.mode==="single"&&a.items.length&&a.inputState()),a.isOpen=!1,ae(a.focus_node,{"aria-expanded":"false"}),Ao(a.dropdown,{display:"none"}),a.settings.hideSelected&&a.clearActiveOption(),a.refreshState(),s&&a.trigger("dropdown_close",a.dropdown)}positionDropdown(){if(this.settings.dropdownParent==="body"){var r=this.control,a=r.getBoundingClientRect(),s=r.offsetHeight+a.top+window.scrollY,u=a.left+window.scrollX;Ao(this.dropdown,{width:a.width+"px",top:s+"px",left:u+"px"})}}clear(r){var a=this;if(a.items.length){var s=a.controlChildren();ke(s,u=>{a.removeItem(u,!0)}),a.inputState(),r||a.updateOriginalInput(),a.trigger("clear")}}insertAtCaret(r){let a=this,s=a.caretPos,u=a.control;u.insertBefore(r,u.children[s]||null),a.setCaret(s+1)}deleteSelection(r){var a,s,u,f,p=this;a=r&&r.keyCode===mi?-1:1,s=Fn(p.control_input);let x=[];if(p.activeItems.length)f=pi(p.activeItems,a),u=Oo(f),a>0&&u++,ke(p.activeItems,L=>x.push(L));else if((p.isFocused||p.settings.mode==="single")&&p.items.length){let L=p.controlChildren(),_;a<0&&s.start===0&&s.length===0?_=L[p.caretPos-1]:a>0&&s.start===p.inputValue().length&&(_=L[p.caretPos]),_!==void 0&&x.push(_)}if(!p.shouldDelete(x,r))return!1;for(Q(r,!0),typeof u<"u"&&p.setCaret(u);x.length;)p.removeItem(x.pop());return p.inputState(),p.positionDropdown(),p.refreshOptions(!1),!0}shouldDelete(r,a){let s=r.map(u=>u.dataset.value);return!(!s.length||typeof this.settings.onDelete=="function"&&this.settings.onDelete.call(this,s,a)===!1)}advanceSelection(r,a){var s,u,f=this;f.rtl&&(r*=-1),!f.inputValue().length&&(_t(zo,a)||_t("shiftKey",a)?(s=f.getLastActive(r),s?s.classList.contains("active")?u=f.getAdjacent(s,r,"item"):u=s:r>0?u=f.control_input.nextElementSibling:u=f.control_input.previousElementSibling,u&&(u.classList.contains("active")&&f.removeActiveItem(s),f.setActiveItemClass(u))):f.moveCaret(r))}moveCaret(r){}getLastActive(r){let a=this.control.querySelector(".last-active");if(a)return a;var s=this.control.querySelectorAll(".active");if(s)return pi(s,r)}setCaret(r){this.caretPos=this.items.length}controlChildren(){return Array.from(this.control.querySelectorAll("[data-ts-item]"))}lock(){this.setLocked(!0)}unlock(){this.setLocked(!1)}setLocked(r=this.isReadOnly||this.isDisabled){this.isLocked=r,this.refreshState()}disable(){this.setDisabled(!0),this.close()}enable(){this.setDisabled(!1)}setDisabled(r){this.focus_node.tabIndex=r?-1:this.tabIndex,this.isDisabled=r,this.input.disabled=r,this.control_input.disabled=r,this.setLocked()}setReadOnly(r){this.isReadOnly=r,this.input.readOnly=r,this.control_input.readOnly=r,this.setLocked()}destroy(){var r=this,a=r.revertSettings;r.trigger("destroy"),r.off(),r.wrapper.remove(),r.dropdown.remove(),r.input.innerHTML=a.innerHTML,r.input.tabIndex=a.tabIndex,dt(r.input,"tomselected","ts-hidden-accessible"),r._destroy(),delete r.input.tomselect}render(r,a){var s,u;let f=this;if(typeof this.settings.render[r]!="function"||(u=f.settings.render[r].call(this,a,Eo),!u))return null;if(u=ye(u),r==="option"||r==="option_create"?a[f.settings.disabledField]?ae(u,{"aria-disabled":"true"}):ae(u,{"data-selectable":""}):r==="optgroup"&&(s=a.group[f.settings.optgroupValueField],ae(u,{"data-group":s}),a.group[f.settings.disabledField]&&ae(u,{"data-disabled":""})),r==="option"||r==="item"){let p=So(a[f.settings.valueField]);ae(u,{"data-value":p}),r==="item"?(Ae(u,f.settings.itemClass),ae(u,{"data-ts-item":""})):(Ae(u,f.settings.optionClass),ae(u,{role:"option",id:a.$id}),a.$div=u,f.options[p]=a)}return u}_render(r,a){let s=this.render(r,a);if(s==null)throw"HTMLElement expected";return s}clearCache(){ke(this.options,r=>{r.$div&&(r.$div.remove(),delete r.$div)})}uncacheValue(r){let a=this.getOption(r);a&&a.remove()}canCreate(r){return this.settings.create&&r.length>0&&this.settings.createFilter.call(this,r)}hook(r,a,s){var u=this,f=u[a];u[a]=function(){var p,x;return r==="after"&&(p=f.apply(u,arguments)),x=s.apply(u,arguments),r==="instead"?x:(r==="before"&&(p=f.apply(u,arguments)),p)}}}function Un(){J(this.input,"change",()=>{this.sync()})}function jn(l){var r=this,a=r.onOptionSelect;r.settings.hideSelected=!1;let s=Object.assign({className:"tomselect-checkbox",checkedClassNames:void 0,uncheckedClassNames:void 0},l);var u=function(x,L){L?(x.checked=!0,s.uncheckedClassNames&&x.classList.remove(...s.uncheckedClassNames),s.checkedClassNames&&x.classList.add(...s.checkedClassNames)):(x.checked=!1,s.checkedClassNames&&x.classList.remove(...s.checkedClassNames),s.uncheckedClassNames&&x.classList.add(...s.uncheckedClassNames))},f=function(x){setTimeout(()=>{var L=x.querySelector("input."+s.className);L instanceof HTMLInputElement&&u(L,x.classList.contains("selected"))},1)};r.hook("after","setupTemplates",()=>{var p=r.settings.render.option;r.settings.render.option=(x,L)=>{var _=ye(p.call(r,x,L)),z=document.createElement("input");s.className&&z.classList.add(s.className),z.addEventListener("click",function(R){Q(R)}),z.type="checkbox";let T=Pe(x[r.settings.valueField]);return u(z,!!(T&&r.items.indexOf(T)>-1)),_.prepend(z),_}}),r.on("item_remove",p=>{var x=r.getOption(p);x&&(x.classList.remove("selected"),f(x))}),r.on("item_add",p=>{var x=r.getOption(p);x&&f(x)}),r.hook("instead","onOptionSelect",(p,x)=>{if(x.classList.contains("selected")){x.classList.remove("selected"),r.removeItem(x.dataset.value),r.refreshOptions(),Q(p,!0);return}a.call(r,p,x),f(x)})}function Wn(l){let r=this,a=Object.assign({className:"clear-button",title:"Clear All",role:"button",tabindex:0,html:s=>`<div class="${s.className}" title="${s.title}" role="${s.role}" tabindex="${s.tabindex}">&times;</div>`},l);r.on("initialize",()=>{var s=ye(a.html(a));s.addEventListener("click",u=>{r.isLocked||(r.clear(),r.settings.mode==="single"&&r.settings.allowEmptyOption&&r.addItem(""),r.refreshOptions(!1),u.preventDefault(),u.stopPropagation())}),r.control.appendChild(s)})}let Yn=(l,r)=>{var a;(a=l.parentNode)==null||a.insertBefore(r,l.nextSibling)},Kn=(l,r)=>{var a;(a=l.parentNode)==null||a.insertBefore(r,l)},Gn=(l,r)=>{do{var a;if(r=(a=r)==null?void 0:a.previousElementSibling,l==r)return!0}while(r&&r.previousElementSibling);return!1};function Xn(){var l=this;if(l.settings.mode!=="multi")return;var r=l.lock,a=l.unlock;let s=!0,u;l.hook("after","setupTemplates",()=>{var f=l.settings.render.item;l.settings.render.item=(p,x)=>{let L=ye(f.call(l,p,x));ae(L,{draggable:"true"});let _=F=>{s||Q(F),F.stopPropagation()},z=F=>{u=L,setTimeout(()=>{L.classList.add("ts-dragging")},0)},T=F=>{F.preventDefault(),L.classList.add("ts-drag-over"),ne(L,u)},R=()=>{L.classList.remove("ts-drag-over")},ne=(F,X)=>{X!==void 0&&(Gn(X,L)?Yn(F,X):Kn(F,X))},E=()=>{var F;document.querySelectorAll(".ts-drag-over").forEach(ee=>ee.classList.remove("ts-drag-over")),(F=u)==null||F.classList.remove("ts-dragging"),u=void 0;var X=[];l.control.querySelectorAll("[data-value]").forEach(ee=>{if(ee.dataset.value){let ue=ee.dataset.value;ue&&X.push(ue)}}),l.setValue(X)};return J(L,"mousedown",_),J(L,"dragstart",z),J(L,"dragenter",T),J(L,"dragover",T),J(L,"dragleave",R),J(L,"dragend",E),L}}),l.hook("instead","lock",()=>(s=!1,r.call(l))),l.hook("instead","unlock",()=>(s=!0,a.call(l)))}function Qn(l){let r=this,a=Object.assign({title:"Untitled",headerClass:"dropdown-header",titleRowClass:"dropdown-header-title",labelClass:"dropdown-header-label",closeClass:"dropdown-header-close",html:s=>'<div class="'+s.headerClass+'"><div class="'+s.titleRowClass+'"><span class="'+s.labelClass+'">'+s.title+'</span><a class="'+s.closeClass+'">&times;</a></div></div>'},l);r.on("initialize",()=>{var s=ye(a.html(a)),u=s.querySelector("."+a.closeClass);u&&u.addEventListener("click",f=>{Q(f,!0),r.close()}),r.dropdown.insertBefore(s,r.dropdown.firstChild)})}function Jn(){var l=this;l.hook("instead","setCaret",r=>{l.settings.mode==="single"||!l.control.contains(l.control_input)?r=l.items.length:(r=Math.max(0,Math.min(l.items.length,r)),r!=l.caretPos&&!l.isPending&&l.controlChildren().forEach((a,s)=>{s<r?l.control_input.insertAdjacentElement("beforebegin",a):l.control.appendChild(a)})),l.caretPos=r}),l.hook("instead","moveCaret",r=>{if(!l.isFocused)return;let a=l.getLastActive(r);if(a){let s=Oo(a);l.setCaret(r>0?s+1:s),l.setActiveItem(),dt(a,"last-active")}else l.setCaret(l.caretPos+r)})}function Zn(){let l=this;l.settings.shouldOpen=!0,l.hook("before","setup",()=>{var r;l.focus_node=l.control,Ae(l.control_input,"dropdown-input");let a=ye('<div class="dropdown-input-wrap">');a.append(l.control_input),l.dropdown.insertBefore(a,l.dropdown.firstChild);let s=ye('<input class="items-placeholder" tabindex="-1" />');s.placeholder=l.settings.placeholder||"",l.control.append(s);let u=(r=l.input)==null?void 0:r.getAttribute("aria-label");u&&s.setAttribute("aria-label",u)}),l.on("initialize",()=>{l.control_input.addEventListener("keydown",a=>{switch(a.keyCode){case hi:l.isOpen&&(Q(a,!0),l.close()),l.clearActiveItems();return;case yr:l.focus_node.tabIndex=-1;break}return l.onKeyDown.call(l,a)}),l.on("blur",()=>{l.focus_node.tabIndex=l.isDisabled?-1:l.tabIndex}),l.on("dropdown_open",()=>{l.control_input.focus()});let r=l.onBlur;l.hook("instead","onBlur",a=>{if(!(a&&a.relatedTarget==l.control_input))return r.call(l)}),J(l.control_input,"blur",()=>l.onBlur()),l.hook("before","close",()=>{l.isOpen&&l.focus_node.focus({preventScroll:!0})})})}function es(){var l=this;l.on("initialize",()=>{var r=document.createElement("span"),a=l.control_input;r.style.cssText="position:absolute; top:-99999px; left:-99999px; width:auto; padding:0; white-space:pre; ",l.wrapper.appendChild(r);var s=["letterSpacing","fontSize","fontFamily","fontWeight","textTransform"];for(let f of s)r.style[f]=a.style[f];var u=()=>{r.textContent=a.value,a.style.width=r.clientWidth+"px"};u(),l.on("update item_add item_remove",u),J(a,"input",u),J(a,"keyup",u),J(a,"blur",u),J(a,"update",u)})}function ts(){var l=this,r=l.deleteSelection;this.hook("instead","deleteSelection",a=>l.activeItems.length?r.call(l,a):!1)}function os(){this.hook("instead","setActiveItem",()=>{}),this.hook("instead","selectAll",()=>{})}function rs(){var l=this,r=l.onKeyDown;l.hook("instead","onKeyDown",a=>{var s,u,f,p;if(!l.isOpen||!(a.keyCode===br||a.keyCode===fi))return r.call(l,a);l.ignoreHover=!0,p=$o(l.activeOption,"[data-group]"),s=Oo(l.activeOption,"[data-selectable]"),p&&(a.keyCode===br?p=p.previousSibling:p=p.nextSibling,p&&(f=p.querySelectorAll("[data-selectable]"),u=f[Math.min(f.length-1,s)],u&&l.setActiveOption(u)))})}function is(l){let r=Object.assign({label:"&times;",title:"Remove",className:"remove",append:!0},l);var a=this;if(r.append){var s='<a href="javascript:void(0)" class="'+r.className+'" tabindex="-1" title="'+Eo(r.title)+'">'+r.label+"</a>";a.hook("after","setupTemplates",()=>{var u=a.settings.render.item;a.settings.render.item=(f,p)=>{var x=ye(u.call(a,f,p)),L=ye(s);return x.appendChild(L),J(L,"mousedown",_=>{Q(_,!0)}),J(L,"click",_=>{a.isLocked||(Q(_,!0),!a.isLocked&&a.shouldDelete([x],_)&&(a.removeItem(x),a.refreshOptions(!1),a.inputState()))}),x}})}}function as(l){let r=this,a=Object.assign({text:s=>s[r.settings.labelField]},l);r.on("item_remove",function(s){if(r.isFocused&&r.control_input.value.trim()===""){var u=r.options[s];u&&r.setTextboxValue(a.text.call(r,u))}})}function ns(){let l=this,r=l.canLoad,a=l.clearActiveOption,s=l.loadCallback;var u={},f,p=!1,x,L=[],_=!1,z;if(l.settings.shouldLoadMore||(l.settings.shouldLoadMore=()=>{if(f.clientHeight/(f.scrollHeight-f.scrollTop)>.9)return!0;if(l.activeOption){var F=l.selectable(),X=Array.from(F).indexOf(l.activeOption);if(X>=F.length-2)return!0}return!1}),!l.settings.firstUrl)throw"virtual_scroll plugin requires a firstUrl() method";l.settings.sortField=[{field:"$order"},{field:"$score"}];let T=E=>typeof l.settings.maxOptions=="number"&&f.children.length>=l.settings.maxOptions?!1:!!(E in u&&u[E]),R=(E,F)=>l.items.indexOf(F)>=0||L.indexOf(F)>=0;l.setNextUrl=(E,F)=>{u[E]=F},l.getUrl=E=>{if(E in u){let F=u[E];return u[E]=!1,F}return l.clearPagination(),l.settings.firstUrl.call(l,E)},l.clearPagination=()=>{u={}},l.hook("instead","clearActiveOption",()=>{if(!p)return a.call(l)}),l.hook("instead","canLoad",E=>E in u?T(E):r.call(l,E)),l.hook("instead","loadCallback",(E,F)=>{if(!p)l.clearOptions(R);else if(x){let X=E[0];X!==void 0&&(x.dataset.value=X[l.settings.valueField])}s.call(l,E,F),!p&&!_&&(_=!0,l.lastValue===""&&(L=Object.keys(l.options),z=u[""])),p=!1}),l.hook("before","refreshOptions",()=>{l.activeOption&&l.activeOption.getAttribute("role")!=="option"&&l.setActiveOption(l.activeOption.previousElementSibling)}),l.hook("after","refreshOptions",()=>{let E=l.lastValue;var F;T(E)?(F=l.render("loading_more",{query:E}),F&&(F.setAttribute("data-selectable",""),x=F)):E in u&&!f.querySelector(".no-results")&&(F=l.render("no_more_results",{query:E})),F&&(Ae(F,l.settings.optionClass),f.append(F))});let ne=()=>{_&&(l.clearOptions(R),z&&(u[""]=z))};l.on("type",E=>{E===""&&(ne(),l.refreshOptions(!1))}),l.on("dropdown_close",ne),l.on("initialize",()=>{L=Object.keys(l.options),f=l.dropdown_content,l.settings.render=Object.assign({},{loading_more:()=>'<div class="loading-more-results">Loading more results ... </div>',no_more_results:()=>'<div class="no-more-results">No more results</div>'},l.settings.render),f.addEventListener("scroll",()=>{l.settings.shouldLoadMore.call(l)&&T(l.lastValue)&&(p||(p=!0,l.load.call(l,l.lastValue)))})})}return $e.define("change_listener",Un),$e.define("checkbox_options",jn),$e.define("clear_button",Wn),$e.define("drag_drop",Xn),$e.define("dropdown_header",Qn),$e.define("caret_position",Jn),$e.define("dropdown_input",Zn),$e.define("input_autogrow",es),$e.define("no_backspace_delete",ts),$e.define("no_active_items",os),$e.define("optgroup_columns",rs),$e.define("remove_button",is),$e.define("restore_on_backspace",as),$e.define("virtual_scroll",ns),$e}))});function vs(){document.documentElement.dataset.ua=typeof browser<"u"&&browser.runtime?"firefox":"chromium";let e=window.matchMedia("(prefers-color-scheme: dark)"),t=o=>{let i=document.documentElement.classList;i.toggle("wa-dark",o),i.toggle("wa-light",!o)};t(e.matches),e.addEventListener("change",o=>t(o.matches))}vs();var Fo=()=>({checkValidity(e){let t=e.input,o={message:"",isValid:!0,invalidKeys:[]};if(!t)return o;let i=!0;if("checkValidity"in t&&(i=t.checkValidity()),i)return o;if(o.isValid=!1,"validationMessage"in t&&(o.message=t.validationMessage),!("validity"in t))return o.invalidKeys.push("customError"),o;for(let n in t.validity){if(n==="valid")continue;let c=n;t.validity[c]&&o.invalidKeys.push(c)}return o}});var Mo=class extends Event{constructor(){super("wa-invalid",{bubbles:!0,cancelable:!1,composed:!0})}};var ws=Object.defineProperty,bs=Object.getOwnPropertyDescriptor,yi=e=>{throw TypeError(e)},h=(e,t,o,i)=>{for(var n=i>1?void 0:i?bs(t,o):t,c=e.length-1,d;c>=0;c--)(d=e[c])&&(n=(i?d(t,o,n):d(n))||n);return i&&n&&ws(t,o,n),n},xi=(e,t,o)=>t.has(e)||yi("Cannot "+o),Ci=(e,t,o)=>(xi(e,t,"read from private field"),o?o.call(e):t.get(e)),ki=(e,t,o)=>t.has(e)?yi("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,o),_i=(e,t,o,i)=>(xi(e,t,"write to private field"),i?i.call(e,o):t.set(e,o),o);var Bo=globalThis,Ro=Bo.ShadowRoot&&(Bo.ShadyCSS===void 0||Bo.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,xr=Symbol(),Li=new WeakMap,so=class{constructor(t,o,i){if(this._$cssResult$=!0,i!==xr)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=o}get styleSheet(){let t=this.o,o=this.t;if(Ro&&t===void 0){let i=o!==void 0&&o.length===1;i&&(t=Li.get(o)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&Li.set(o,t))}return t}toString(){return this.cssText}},Si=e=>new so(typeof e=="string"?e:e+"",void 0,xr),j=(e,...t)=>{let o=e.length===1?e[0]:t.reduce((i,n,c)=>i+(d=>{if(d._$cssResult$===!0)return d.cssText;if(typeof d=="number")return d;throw Error("Value passed to 'css' function must be a 'css' function result: "+d+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+e[c+1],e[0]);return new so(o,e,xr)},Ei=(e,t)=>{if(Ro)e.adoptedStyleSheets=t.map(o=>o instanceof CSSStyleSheet?o:o.styleSheet);else for(let o of t){let i=document.createElement("style"),n=Bo.litNonce;n!==void 0&&i.setAttribute("nonce",n),i.textContent=o.cssText,e.appendChild(i)}},Cr=Ro?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let o="";for(let i of t.cssRules)o+=i.cssText;return Si(o)})(e):e;var{is:ys,defineProperty:xs,getOwnPropertyDescriptor:Cs,getOwnPropertyNames:ks,getOwnPropertySymbols:_s,getPrototypeOf:Ls}=Object,Po=globalThis,Ai=Po.trustedTypes,Ss=Ai?Ai.emptyScript:"",Es=Po.reactiveElementPolyfillSupport,lo=(e,t)=>e,co={toAttribute(e,t){switch(t){case Boolean:e=e?Ss:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let o=e;switch(t){case Boolean:o=e!==null;break;case Number:o=e===null?null:Number(e);break;case Object:case Array:try{o=JSON.parse(e)}catch{o=null}}return o}},Do=(e,t)=>!ys(e,t),$i={attribute:!0,type:String,converter:co,reflect:!1,useDefault:!1,hasChanged:Do};Symbol.metadata??=Symbol("metadata"),Po.litPropertyMetadata??=new WeakMap;var ut=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,o=$i){if(o.state&&(o.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((o=Object.create(o)).wrapped=!0),this.elementProperties.set(t,o),!o.noAccessor){let i=Symbol(),n=this.getPropertyDescriptor(t,i,o);n!==void 0&&xs(this.prototype,t,n)}}static getPropertyDescriptor(t,o,i){let{get:n,set:c}=Cs(this.prototype,t)??{get(){return this[o]},set(d){this[o]=d}};return{get:n,set(d){let m=n?.call(this);c?.call(this,d),this.requestUpdate(t,m,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$i}static _$Ei(){if(this.hasOwnProperty(lo("elementProperties")))return;let t=Ls(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(lo("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(lo("properties"))){let o=this.properties,i=[...ks(o),..._s(o)];for(let n of i)this.createProperty(n,o[n])}let t=this[Symbol.metadata];if(t!==null){let o=litPropertyMetadata.get(t);if(o!==void 0)for(let[i,n]of o)this.elementProperties.set(i,n)}this._$Eh=new Map;for(let[o,i]of this.elementProperties){let n=this._$Eu(o,i);n!==void 0&&this._$Eh.set(n,o)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let o=[];if(Array.isArray(t)){let i=new Set(t.flat(1/0).reverse());for(let n of i)o.unshift(Cr(n))}else t!==void 0&&o.push(Cr(t));return o}static _$Eu(t,o){let i=o.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,o=this.constructor.elementProperties;for(let i of o.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ei(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,o,i){this._$AK(t,i)}_$ET(t,o){let i=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,i);if(n!==void 0&&i.reflect===!0){let c=(i.converter?.toAttribute!==void 0?i.converter:co).toAttribute(o,i.type);this._$Em=t,c==null?this.removeAttribute(n):this.setAttribute(n,c),this._$Em=null}}_$AK(t,o){let i=this.constructor,n=i._$Eh.get(t);if(n!==void 0&&this._$Em!==n){let c=i.getPropertyOptions(n),d=typeof c.converter=="function"?{fromAttribute:c.converter}:c.converter?.fromAttribute!==void 0?c.converter:co;this._$Em=n;let m=d.fromAttribute(o,c.type);this[n]=m??this._$Ej?.get(n)??m,this._$Em=null}}requestUpdate(t,o,i,n=!1,c){if(t!==void 0){let d=this.constructor;if(n===!1&&(c=this[t]),i??=d.getPropertyOptions(t),!((i.hasChanged??Do)(c,o)||i.useDefault&&i.reflect&&c===this._$Ej?.get(t)&&!this.hasAttribute(d._$Eu(t,i))))return;this.C(t,o,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,o,{useDefault:i,reflect:n,wrapped:c},d){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,d??o??this[t]),c!==!0||d!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(o=void 0),this._$AL.set(t,o)),n===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(o){Promise.reject(o)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[n,c]of this._$Ep)this[n]=c;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[n,c]of i){let{wrapped:d}=c,m=this[n];d!==!0||this._$AL.has(n)||m===void 0||this.C(n,void 0,c,m)}}let t=!1,o=this._$AL;try{t=this.shouldUpdate(o),t?(this.willUpdate(o),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(o)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(o)}willUpdate(t){}_$AE(t){this._$EO?.forEach(o=>o.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(o=>this._$ET(o,this[o])),this._$EM()}updated(t){}firstUpdated(t){}};ut.elementStyles=[],ut.shadowRootOptions={mode:"open"},ut[lo("elementProperties")]=new Map,ut[lo("finalized")]=new Map,Es?.({ReactiveElement:ut}),(Po.reactiveElementVersions??=[]).push("2.1.2");var _r=globalThis,Oi=e=>e,No=_r.trustedTypes,zi=No?No.createPolicy("lit-html",{createHTML:e=>e}):void 0,Lr="$lit$",pt=`lit$${Math.random().toFixed(9).slice(2)}$`,Sr="?"+pt,As=`<${Sr}>`,At=document,po=()=>At.createComment(""),ho=e=>e===null||typeof e!="object"&&typeof e!="function",Er=Array.isArray,Ri=e=>Er(e)||typeof e?.[Symbol.iterator]=="function",kr=`[ 	
\f\r]`,uo=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ii=/-->/g,Ti=/>/g,St=RegExp(`>|${kr}(?:([^\\s"'>=/]+)(${kr}*=${kr}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Fi=/'/g,Mi=/"/g,Pi=/^(?:script|style|textarea|title)$/i,Ar=e=>(t,...o)=>({_$litType$:e,strings:t,values:o}),O=Ar(1),Di=Ar(2),Ni=Ar(3),xe=Symbol.for("lit-noChange"),N=Symbol.for("lit-nothing"),Bi=new WeakMap,Et=At.createTreeWalker(At,129);function qi(e,t){if(!Er(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return zi!==void 0?zi.createHTML(t):t}var Vi=(e,t)=>{let o=e.length-1,i=[],n,c=t===2?"<svg>":t===3?"<math>":"",d=uo;for(let m=0;m<o;m++){let v=e[m],y,C,b=-1,S=0;for(;S<v.length&&(d.lastIndex=S,C=d.exec(v),C!==null);)S=d.lastIndex,d===uo?C[1]==="!--"?d=Ii:C[1]!==void 0?d=Ti:C[2]!==void 0?(Pi.test(C[2])&&(n=RegExp("</"+C[2],"g")),d=St):C[3]!==void 0&&(d=St):d===St?C[0]===">"?(d=n??uo,b=-1):C[1]===void 0?b=-2:(b=d.lastIndex-C[2].length,y=C[1],d=C[3]===void 0?St:C[3]==='"'?Mi:Fi):d===Mi||d===Fi?d=St:d===Ii||d===Ti?d=uo:(d=St,n=void 0);let k=d===St&&e[m+1].startsWith("/>")?" ":"";c+=d===uo?v+As:b>=0?(i.push(y),v.slice(0,b)+Lr+v.slice(b)+pt+k):v+pt+(b===-2?m:k)}return[qi(e,c+(e[o]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]},fo=class e{constructor({strings:t,_$litType$:o},i){let n;this.parts=[];let c=0,d=0,m=t.length-1,v=this.parts,[y,C]=Vi(t,o);if(this.el=e.createElement(y,i),Et.currentNode=this.el.content,o===2||o===3){let b=this.el.content.firstChild;b.replaceWith(...b.childNodes)}for(;(n=Et.nextNode())!==null&&v.length<m;){if(n.nodeType===1){if(n.hasAttributes())for(let b of n.getAttributeNames())if(b.endsWith(Lr)){let S=C[d++],k=n.getAttribute(b).split(pt),$=/([.?@])?(.*)/.exec(S);v.push({type:1,index:c,name:$[2],strings:k,ctor:$[1]==="."?Vo:$[1]==="?"?Ho:$[1]==="@"?Uo:Ot}),n.removeAttribute(b)}else b.startsWith(pt)&&(v.push({type:6,index:c}),n.removeAttribute(b));if(Pi.test(n.tagName)){let b=n.textContent.split(pt),S=b.length-1;if(S>0){n.textContent=No?No.emptyScript:"";for(let k=0;k<S;k++)n.append(b[k],po()),Et.nextNode(),v.push({type:2,index:++c});n.append(b[S],po())}}}else if(n.nodeType===8)if(n.data===Sr)v.push({type:2,index:c});else{let b=-1;for(;(b=n.data.indexOf(pt,b+1))!==-1;)v.push({type:7,index:c}),b+=pt.length-1}c++}}static createElement(t,o){let i=At.createElement("template");return i.innerHTML=t,i}};function $t(e,t,o=e,i){if(t===xe)return t;let n=i!==void 0?o._$Co?.[i]:o._$Cl,c=ho(t)?void 0:t._$litDirective$;return n?.constructor!==c&&(n?._$AO?.(!1),c===void 0?n=void 0:(n=new c(e),n._$AT(e,o,i)),i!==void 0?(o._$Co??=[])[i]=n:o._$Cl=n),n!==void 0&&(t=$t(e,n._$AS(e,t.values),n,i)),t}var qo=class{constructor(t,o){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=o}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:o},parts:i}=this._$AD,n=(t?.creationScope??At).importNode(o,!0);Et.currentNode=n;let c=Et.nextNode(),d=0,m=0,v=i[0];for(;v!==void 0;){if(d===v.index){let y;v.type===2?y=new jt(c,c.nextSibling,this,t):v.type===1?y=new v.ctor(c,v.name,v.strings,this,t):v.type===6&&(y=new jo(c,this,t)),this._$AV.push(y),v=i[++m]}d!==v?.index&&(c=Et.nextNode(),d++)}return Et.currentNode=At,n}p(t){let o=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,o),o+=i.strings.length-2):i._$AI(t[o])),o++}},jt=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,o,i,n){this.type=2,this._$AH=N,this._$AN=void 0,this._$AA=t,this._$AB=o,this._$AM=i,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,o=this._$AM;return o!==void 0&&t?.nodeType===11&&(t=o.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,o=this){t=$t(this,t,o),ho(t)?t===N||t==null||t===""?(this._$AH!==N&&this._$AR(),this._$AH=N):t!==this._$AH&&t!==xe&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ri(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==N&&ho(this._$AH)?this._$AA.nextSibling.data=t:this.T(At.createTextNode(t)),this._$AH=t}$(t){let{values:o,_$litType$:i}=t,n=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=fo.createElement(qi(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===n)this._$AH.p(o);else{let c=new qo(n,this),d=c.u(this.options);c.p(o),this.T(d),this._$AH=c}}_$AC(t){let o=Bi.get(t.strings);return o===void 0&&Bi.set(t.strings,o=new fo(t)),o}k(t){Er(this._$AH)||(this._$AH=[],this._$AR());let o=this._$AH,i,n=0;for(let c of t)n===o.length?o.push(i=new e(this.O(po()),this.O(po()),this,this.options)):i=o[n],i._$AI(c),n++;n<o.length&&(this._$AR(i&&i._$AB.nextSibling,n),o.length=n)}_$AR(t=this._$AA.nextSibling,o){for(this._$AP?.(!1,!0,o);t!==this._$AB;){let i=Oi(t).nextSibling;Oi(t).remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Ot=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,o,i,n,c){this.type=1,this._$AH=N,this._$AN=void 0,this.element=t,this.name=o,this._$AM=n,this.options=c,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=N}_$AI(t,o=this,i,n){let c=this.strings,d=!1;if(c===void 0)t=$t(this,t,o,0),d=!ho(t)||t!==this._$AH&&t!==xe,d&&(this._$AH=t);else{let m=t,v,y;for(t=c[0],v=0;v<c.length-1;v++)y=$t(this,m[i+v],o,v),y===xe&&(y=this._$AH[v]),d||=!ho(y)||y!==this._$AH[v],y===N?t=N:t!==N&&(t+=(y??"")+c[v+1]),this._$AH[v]=y}d&&!n&&this.j(t)}j(t){t===N?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Vo=class extends Ot{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===N?void 0:t}},Ho=class extends Ot{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==N)}},Uo=class extends Ot{constructor(t,o,i,n,c){super(t,o,i,n,c),this.type=5}_$AI(t,o=this){if((t=$t(this,t,o,0)??N)===xe)return;let i=this._$AH,n=t===N&&i!==N||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,c=t!==N&&(i===N||n);n&&this.element.removeEventListener(this.name,this,i),c&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},jo=class{constructor(t,o,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=o,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){$t(this,t)}},Hi={M:Lr,P:pt,A:Sr,C:1,L:Vi,R:qo,D:Ri,V:$t,I:jt,H:Ot,N:Ho,U:Uo,B:Vo,F:jo},$s=_r.litHtmlPolyfillSupport;$s?.(fo,jt),(_r.litHtmlVersions??=[]).push("3.3.3");var Ui=(e,t,o)=>{let i=o?.renderBefore??t,n=i._$litPart$;if(n===void 0){let c=o?.renderBefore??null;i._$litPart$=n=new jt(t.insertBefore(po(),c),c,void 0,o??{})}return n._$AI(e),n};var $r=globalThis,Fe=class extends ut{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let o=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Ui(o,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return xe}};Fe._$litElement$=!0,Fe.finalized=!0,$r.litElementHydrateSupport?.({LitElement:Fe});var Os=$r.litElementPolyfillSupport;Os?.({LitElement:Fe});($r.litElementVersions??=[]).push("4.2.2");var ie=e=>(t,o)=>{o!==void 0?o.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)};var zs={attribute:!0,type:String,converter:co,reflect:!1,hasChanged:Do},Is=(e=zs,t,o)=>{let{kind:i,metadata:n}=o,c=globalThis.litPropertyMetadata.get(n);if(c===void 0&&globalThis.litPropertyMetadata.set(n,c=new Map),i==="setter"&&((e=Object.create(e)).wrapped=!0),c.set(o.name,e),i==="accessor"){let{name:d}=o;return{set(m){let v=t.get.call(this);t.set.call(this,m),this.requestUpdate(d,v,e,!0,m)},init(m){return m!==void 0&&this.C(d,void 0,e,m),m}}}if(i==="setter"){let{name:d}=o;return function(m){let v=this[d];t.call(this,m),this.requestUpdate(d,v,e,!0,m)}}throw Error("Unsupported decorator location: "+i)};function w(e){return(t,o)=>typeof o=="object"?Is(e,t,o):((i,n,c)=>{let d=n.hasOwnProperty(c);return n.constructor.createProperty(c,i),d?Object.getOwnPropertyDescriptor(n,c):void 0})(e,t,o)}function ze(e){return w({...e,state:!0,attribute:!1})}var zt=(e,t,o)=>(o.configurable=!0,o.enumerable=!0,Reflect.decorate&&typeof t!="object"&&Object.defineProperty(e,t,o),o);function se(e,t){return(o,i,n)=>{let c=d=>d.renderRoot?.querySelector(e)??null;if(t){let{get:d,set:m}=typeof i=="object"?o:n??(()=>{let v=Symbol();return{get(){return this[v]},set(y){this[v]=y}}})();return zt(o,i,{get(){let v=d.call(this);return v===void 0&&(v=c(this),(v!==null||this.hasUpdated)&&m.call(this,v)),v}})}return zt(o,i,{get(){return c(this)}})}}var Ts=j`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }
`,Wo,ce=class extends Fe{constructor(){super(),ki(this,Wo,!1),this.initialReflectedProperties=new Map,this.didSSR=!!this.shadowRoot,this.customStates={set:(t,o)=>{if(this.internals?.states)try{o?this.internals.states.add(t):this.internals.states.delete(t)}catch(i){if(String(i).includes("must start with '--'"))console.error("Your browser implements an outdated version of CustomStateSet. Consider using a polyfill");else throw i}},has:t=>{if(!this.internals?.states)return!1;try{return this.internals.states.has(t)}catch{return!1}}};try{this.internals=this.attachInternals()}catch{console.error("Element internals are not supported in your browser. Consider using a polyfill")}this.customStates.set("wa-defined",!0);let e=this.constructor;for(let[t,o]of e.elementProperties)o.default==="inherit"&&o.initial!==void 0&&typeof t=="string"&&this.customStates.set(`initial-${t}-${o.initial}`,!0)}static get styles(){let e=Array.isArray(this.css)?this.css:this.css?[this.css]:[];return[Ts,...e]}connectedCallback(){super.connectedCallback(),this.shadowRoot?.prepend(document.createComment(` Web Awesome: https://webawesome.com/docs/components/${this.localName.replace("wa-","")} `))}attributeChangedCallback(e,t,o){Ci(this,Wo)||(this.constructor.elementProperties.forEach((i,n)=>{i.reflect&&this[n]!=null&&this.initialReflectedProperties.set(n,this[n])}),_i(this,Wo,!0)),super.attributeChangedCallback(e,t,o)}willUpdate(e){super.willUpdate(e),this.initialReflectedProperties.forEach((t,o)=>{e.has(o)&&this[o]==null&&(this[o]=t)})}firstUpdated(e){super.firstUpdated(e),this.didSSR&&this.shadowRoot?.querySelectorAll("slot").forEach(t=>{t.dispatchEvent(new Event("slotchange",{bubbles:!0,composed:!1,cancelable:!1}))})}update(e){try{super.update(e)}catch(t){if(this.didSSR&&!this.hasUpdated){let o=new Event("lit-hydration-error",{bubbles:!0,composed:!0,cancelable:!1});o.error=t,this.dispatchEvent(o)}throw t}}relayNativeEvent(e,t){e.stopImmediatePropagation(),this.dispatchEvent(new e.constructor(e.type,{...e,...t}))}};Wo=new WeakMap;h([w()],ce.prototype,"dir",2);h([w()],ce.prototype,"lang",2);h([w({type:Boolean,reflect:!0,attribute:"did-ssr"})],ce.prototype,"didSSR",2);var Fs=()=>({observedAttributes:["custom-error"],checkValidity(e){let t={message:"",isValid:!0,invalidKeys:[]};return e.customError&&(t.message=e.customError,t.isValid=!1,t.invalidKeys=["customError"]),t}}),Ce=class extends ce{constructor(){super(),this.name=null,this.disabled=!1,this.required=!1,this.assumeInteractionOn=["input"],this.validators=[],this.valueHasChanged=!1,this.hasInteracted=!1,this.customError=null,this.emittedEvents=[],this.emitInvalid=e=>{e.target===this&&(this.hasInteracted=!0,this.dispatchEvent(new Mo))},this.handleInteraction=e=>{let t=this.emittedEvents;t.includes(e.type)||t.push(e.type),t.length===this.assumeInteractionOn?.length&&(this.hasInteracted=!0)},this.addEventListener("invalid",this.emitInvalid)}static get validators(){return[Fs()]}static get observedAttributes(){let e=new Set(super.observedAttributes||[]);for(let t of this.validators)if(t.observedAttributes)for(let o of t.observedAttributes)e.add(o);return[...e]}connectedCallback(){super.connectedCallback(),this.updateValidity(),this.assumeInteractionOn.forEach(e=>{this.addEventListener(e,this.handleInteraction)})}firstUpdated(...e){super.firstUpdated(...e),this.updateValidity()}willUpdate(e){if(!!1&&e.has("customError")&&(this.customError||(this.customError=null),this.setCustomValidity(this.customError||"")),e.has("value")||e.has("disabled")||e.has("defaultValue")){let t=this.value;if(Array.isArray(t)){if(this.name){let o=new FormData;for(let i of t)o.append(this.name,i);this.setValue(o,o)}}else this.setValue(t,t)}e.has("disabled")&&(this.customStates.set("disabled",this.disabled),(this.hasAttribute("disabled")||!!1&&!this.matches(":disabled"))&&this.toggleAttribute("disabled",this.disabled)),super.willUpdate(e),this.updateValidity()}get labels(){return this.internals.labels}getForm(){return this.internals.form}set form(e){e?this.setAttribute("form",e):this.removeAttribute("form")}get form(){return this.internals.form}get validity(){return this.internals.validity}get willValidate(){return this.internals.willValidate}get validationMessage(){return this.internals.validationMessage}checkValidity(){return this.updateValidity(),this.internals.checkValidity()}reportValidity(){return this.updateValidity(),this.hasInteracted=!0,this.internals.reportValidity()}get validationTarget(){return this.input||void 0}setValidity(...e){let t=e[0],o=e[1],i=e[2];i||(i=this.validationTarget),this.internals.setValidity(t,o,i||void 0),this.requestUpdate("validity"),this.setCustomStates()}setCustomStates(){let e=!!this.required,t=this.internals.validity.valid,o=this.hasInteracted;this.customStates.set("required",e),this.customStates.set("optional",!e),this.customStates.set("invalid",!t),this.customStates.set("valid",t),this.customStates.set("user-invalid",!t&&o),this.customStates.set("user-valid",t&&o)}setCustomValidity(e){if(!e){this.customError=null,this.setValidity({});return}this.customError=e,this.setValidity({customError:!0},e,this.validationTarget)}formResetCallback(){this.resetValidity(),this.hasInteracted=!1,this.valueHasChanged=!1,this.emittedEvents=[],this.updateValidity()}formDisabledCallback(e){this.disabled=e,this.updateValidity()}formStateRestoreCallback(e,t){this.value=e,t==="restore"&&this.resetValidity(),this.updateValidity()}setValue(...e){let[t,o]=e;this.internals.setFormValue(t,o)}get allValidators(){let e=this.constructor.validators||[],t=this.validators||[];return[...e,...t]}resetValidity(){this.setCustomValidity(""),this.setValidity({})}updateValidity(){if(this.disabled||this.hasAttribute("disabled")||!this.willValidate){this.resetValidity();return}let e=this.allValidators;if(!e?.length)return;let t={customError:!!this.customError},o=this.validationTarget||this.input||void 0,i="";for(let n of e){let{isValid:c,message:d,invalidKeys:m}=n.checkValidity(this);c||(i||(i=d),m?.length>=0&&m.forEach(v=>t[v]=!0))}i||(i=this.validationMessage),this.setValidity(t,i,o)}};Ce.formAssociated=!0;h([w({reflect:!0})],Ce.prototype,"name",2);h([w({type:Boolean})],Ce.prototype,"disabled",2);h([w({state:!0,attribute:!1})],Ce.prototype,"valueHasChanged",2);h([w({state:!0,attribute:!1})],Ce.prototype,"hasInteracted",2);h([w({attribute:"custom-error",reflect:!0})],Ce.prototype,"customError",2);h([w({attribute:!1,state:!0,type:Object})],Ce.prototype,"validity",1);var ji={small:"s",medium:"m",large:"l"},Wi=new Set;function He(e,t){t in ji&&!Wi.has(`${e}:${t}`)&&(Wi.add(`${e}:${t}`),console.warn(`[${e}] size="${t}" is deprecated. Use size="${ji[t]}" instead. The long-form value will be removed in the next major version.`))}var ot=class{constructor(e,...t){this.slotNames=[],this.handleSlotChange=o=>{let i=o.target;(this.slotNames.includes("[default]")&&!i.name||i.name&&this.slotNames.includes(i.name))&&this.host.requestUpdate()},(this.host=e).addController(this),this.slotNames=t}hasDefaultSlot(){return this.host.childNodes?[...this.host.childNodes].some(e=>{if(e.nodeType===Node.TEXT_NODE&&e.textContent.trim()!=="")return!0;if(e.nodeType===Node.ELEMENT_NODE){let t=e;if(t.tagName.toLowerCase()==="wa-visually-hidden")return!1;if(!t.hasAttribute("slot"))return!0}return!1}):!1}hasNamedSlot(e){return this.host.querySelector?.(`:scope > [slot="${e}"]`)!==null}test(e){return e==="[default]"?this.hasDefaultSlot():this.hasNamedSlot(e)}hostConnected(){this.host.shadowRoot?.addEventListener?.("slotchange",this.handleSlotChange)}hostDisconnected(){this.host.shadowRoot?.removeEventListener?.("slotchange",this.handleSlotChange)}};var Ue=j`
  :host([size='xs']) {
    font-size: var(--wa-font-size-xs);
  }

  :host([size='s']),
  :host([size='small']) {
    font-size: var(--wa-font-size-s);
  }

  :host([size='m']),
  :host([size='medium']) {
    font-size: var(--wa-font-size-m);
  }

  :host([size='l']),
  :host([size='large']) {
    font-size: var(--wa-font-size-l);
  }

  :host([size='xl']) {
    font-size: var(--wa-font-size-xl);
  }
`;var Wt=j`
  :where(:root),
  .wa-neutral,
  :host([variant='neutral']) {
    --wa-color-fill-loud: var(--wa-color-neutral-fill-loud);
    --wa-color-fill-normal: var(--wa-color-neutral-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-neutral-fill-quiet);
    --wa-color-border-loud: var(--wa-color-neutral-border-loud);
    --wa-color-border-normal: var(--wa-color-neutral-border-normal);
    --wa-color-border-quiet: var(--wa-color-neutral-border-quiet);
    --wa-color-on-loud: var(--wa-color-neutral-on-loud);
    --wa-color-on-normal: var(--wa-color-neutral-on-normal);
    --wa-color-on-quiet: var(--wa-color-neutral-on-quiet);
  }

  .wa-brand,
  :host([variant='brand']) {
    --wa-color-fill-loud: var(--wa-color-brand-fill-loud);
    --wa-color-fill-normal: var(--wa-color-brand-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-brand-fill-quiet);
    --wa-color-border-loud: var(--wa-color-brand-border-loud);
    --wa-color-border-normal: var(--wa-color-brand-border-normal);
    --wa-color-border-quiet: var(--wa-color-brand-border-quiet);
    --wa-color-on-loud: var(--wa-color-brand-on-loud);
    --wa-color-on-normal: var(--wa-color-brand-on-normal);
    --wa-color-on-quiet: var(--wa-color-brand-on-quiet);
  }

  .wa-success,
  :host([variant='success']) {
    --wa-color-fill-loud: var(--wa-color-success-fill-loud);
    --wa-color-fill-normal: var(--wa-color-success-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-success-fill-quiet);
    --wa-color-border-loud: var(--wa-color-success-border-loud);
    --wa-color-border-normal: var(--wa-color-success-border-normal);
    --wa-color-border-quiet: var(--wa-color-success-border-quiet);
    --wa-color-on-loud: var(--wa-color-success-on-loud);
    --wa-color-on-normal: var(--wa-color-success-on-normal);
    --wa-color-on-quiet: var(--wa-color-success-on-quiet);
  }

  .wa-warning,
  :host([variant='warning']) {
    --wa-color-fill-loud: var(--wa-color-warning-fill-loud);
    --wa-color-fill-normal: var(--wa-color-warning-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-warning-fill-quiet);
    --wa-color-border-loud: var(--wa-color-warning-border-loud);
    --wa-color-border-normal: var(--wa-color-warning-border-normal);
    --wa-color-border-quiet: var(--wa-color-warning-border-quiet);
    --wa-color-on-loud: var(--wa-color-warning-on-loud);
    --wa-color-on-normal: var(--wa-color-warning-on-normal);
    --wa-color-on-quiet: var(--wa-color-warning-on-quiet);
  }

  .wa-danger,
  :host([variant='danger']) {
    --wa-color-fill-loud: var(--wa-color-danger-fill-loud);
    --wa-color-fill-normal: var(--wa-color-danger-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-danger-fill-quiet);
    --wa-color-border-loud: var(--wa-color-danger-border-loud);
    --wa-color-border-normal: var(--wa-color-danger-border-normal);
    --wa-color-border-quiet: var(--wa-color-danger-border-quiet);
    --wa-color-on-loud: var(--wa-color-danger-on-loud);
    --wa-color-on-normal: var(--wa-color-danger-on-normal);
    --wa-color-on-quiet: var(--wa-color-danger-on-quiet);
  }
`;var Yi=j`
  @layer wa-component {
    :host {
      display: inline-block;

      /* Workaround because Chrome doesn't like :host(:has()) below
       * https://issues.chromium.org/issues/40062355
       * Firefox doesn't like this nested rule, so both are needed */
      &:has(wa-badge) {
        position: relative;
      }
    }

    /* Apply relative positioning only when needed to position wa-badge
     * This avoids creating a new stacking context for every button */
    :host(:has(wa-badge)) {
      position: relative;
    }
  }

  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
    vertical-align: middle;
    transition-property: background, border, box-shadow, color, opacity, transform;
    transition-duration: var(--wa-transition-fast);
    transition-timing-function: var(--wa-transition-easing);
    transform-origin: center;
    cursor: pointer;
    padding: 0 var(--wa-form-control-padding-inline);
    font-family: inherit;
    font-size: inherit;
    font-weight: var(--wa-font-weight-action);
    height: var(--wa-form-control-height);
    width: 100%;

    background-color: var(--wa-color-fill-loud, var(--wa-color-neutral-fill-loud));
    border-color: transparent;
    color: var(--wa-color-on-loud, var(--wa-color-neutral-on-loud));
    border-start-start-radius: var(--_button-start-start-radius, var(--wa-form-control-border-radius));
    border-start-end-radius: var(--_button-start-end-radius, var(--wa-form-control-border-radius));
    border-end-start-radius: var(--_button-end-start-radius, var(--wa-form-control-border-radius));
    border-end-end-radius: var(--_button-end-end-radius, var(--wa-form-control-border-radius));
    border-style: var(--wa-form-control-border-style);
    border-width: var(--wa-form-control-border-width);
  }

  /* Hover and active transforms */
  .button:not(.disabled):not(.loading) {
    @media (hover: hover) {
      &:hover {
        transform: var(--wa-button-transform-hover);
      }
    }
    &:active {
      transform: var(--wa-button-transform-active);
    }

    @media (prefers-reduced-motion: reduce) {
      &:hover,
      &:active {
        transform: none;
      }
    }
  }

  /* Appearance modifiers */
  :host([appearance='plain']) {
    /* Indentation overrides for grouping */
    margin-inline-start: var(--_button-horizontal-indent);
    margin-block-start: var(--_button-vertical-indent);

    .button {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: transparent;
      border-color: transparent;
    }
    @media (hover: hover) {
      .button:not(.disabled):not(.loading):hover {
        color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
        background-color: var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet));
      }
    }
    .button:not(.disabled):not(.loading):active {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: color-mix(
        in oklab,
        var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet)),
        var(--wa-color-mix-active)
      );
    }
  }

  :host([appearance='outlined']) {
    /* Indentation overrides for grouping outlined */
    margin-inline-start: var(--_button-horizontal-indent-outlined);
    margin-block-start: var(--_button-vertical-indent-outlined);

    .button {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: transparent;
      border-color: var(--wa-color-border-loud, var(--wa-color-neutral-border-loud));
    }
    @media (hover: hover) {
      .button:not(.disabled):not(.loading):hover {
        color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
        background-color: var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet));
      }
    }
    .button:not(.disabled):not(.loading):active {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: color-mix(
        in oklab,
        var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet)),
        var(--wa-color-mix-active)
      );
    }
  }

  :host([appearance='filled']) {
    /* Indentation overrides for grouping */
    margin-inline-start: var(--_button-horizontal-indent);
    margin-block-start: var(--_button-vertical-indent);

    .button {
      color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
      background-color: var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal));
      border-color: transparent;
    }
    @media (hover: hover) {
      .button:not(.disabled):not(.loading):hover {
        color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
        background-color: color-mix(
          in oklab,
          var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal)),
          var(--wa-color-mix-hover)
        );
      }
    }
    .button:not(.disabled):not(.loading):active {
      color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
      background-color: color-mix(
        in oklab,
        var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal)),
        var(--wa-color-mix-active)
      );
    }
  }

  :host([appearance='filled-outlined']) {
    /* Indentation overrides for grouping outlined */
    margin-inline-start: var(--_button-horizontal-indent-outlined);
    margin-block-start: var(--_button-vertical-indent-outlined);

    .button {
      color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
      background-color: var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal));
      border-color: var(--wa-color-border-normal, var(--wa-color-neutral-border-normal));
    }
    @media (hover: hover) {
      .button:not(.disabled):not(.loading):hover {
        color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
        background-color: color-mix(
          in oklab,
          var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal)),
          var(--wa-color-mix-hover)
        );
      }
    }
    .button:not(.disabled):not(.loading):active {
      color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
      background-color: color-mix(
        in oklab,
        var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal)),
        var(--wa-color-mix-active)
      );
    }
  }

  :host([appearance='accent']) {
    /* Indentation overrides for grouping */
    margin-inline-start: var(--_button-horizontal-indent);
    margin-block-start: var(--_button-vertical-indent);

    .button {
      color: var(--wa-color-on-loud, var(--wa-color-neutral-on-loud));
      background-color: var(--wa-color-fill-loud, var(--wa-color-neutral-fill-loud));
      border-color: transparent;
    }
    @media (hover: hover) {
      .button:not(.disabled):not(.loading):hover {
        background-color: color-mix(
          in oklab,
          var(--wa-color-fill-loud, var(--wa-color-neutral-fill-loud)),
          var(--wa-color-mix-hover)
        );
      }
    }
    .button:not(.disabled):not(.loading):active {
      background-color: color-mix(
        in oklab,
        var(--wa-color-fill-loud, var(--wa-color-neutral-fill-loud)),
        var(--wa-color-mix-active)
      );
    }
  }

  /* Focus states */
  .button:focus {
    outline: none;
  }

  .button:focus-visible {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  /* Disabled state */
  :host([disabled]) {
    opacity: 0.5;
    cursor: not-allowed;

    /* When disabled, prevent mouse events from bubbling up from children */
    .button {
      pointer-events: none;
    }
  }

  /* Keep it last so Safari doesn't stop parsing this block */
  .button::-moz-focus-inner {
    border: 0;
  }

  /* Icon buttons */
  .button.is-icon-button {
    outline-offset: 2px;
    width: var(--wa-form-control-height);
    aspect-ratio: 1;
  }

  /* Icon buttons with a caret need to grow to fit both the icon and the caret */
  .button.is-icon-button.caret {
    width: auto;
    aspect-ratio: auto;
    min-width: var(--wa-form-control-height);
  }

  /* Pill modifier */
  :host([pill]) .button {
    border-start-start-radius: var(--_button-start-start-radius, var(--wa-border-radius-pill));
    border-start-end-radius: var(--_button-start-end-radius, var(--wa-border-radius-pill));
    border-end-start-radius: var(--_button-end-start-radius, var(--wa-border-radius-pill));
    border-end-end-radius: var(--_button-end-end-radius, var(--wa-border-radius-pill));
  }

  /*
   * Label
   */

  .start,
  .end {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  .label {
    display: inline-block;
  }

  .is-icon-button .label {
    display: flex;
  }

  .label::slotted(wa-icon) {
    align-self: center;
  }

  /*
   * Caret modifier
   */

  wa-icon[part='caret'] {
    display: flex;
    align-self: center;
    align-items: center;

    &::part(svg) {
      width: 0.875em;
      height: 0.875em;
    }

    .button:has(&) .end {
      display: none;
    }
  }

  /*
   * Loading modifier
   */

  .loading {
    position: relative;
    cursor: wait;

    .start,
    .label,
    .end,
    .caret {
      visibility: hidden;
    }

    wa-spinner {
      --indicator-color: currentColor;
      --track-color: color-mix(in oklab, currentColor, transparent 90%);

      position: absolute;
      font-size: 1em;
      height: 1em;
      width: 1em;
      top: calc(50% - 0.5em);
      left: calc(50% - 0.5em);
    }
  }

  /*
   * Badges
   */

  .button ::slotted(wa-badge) {
    border-color: var(--wa-color-surface-default);
    position: absolute;
    inset-block-start: 0;
    inset-inline-end: 0;
    translate: 50% -50%;
    pointer-events: none;
  }

  :host(:dir(rtl)) ::slotted(wa-badge) {
    translate: -50% -50%;
  }

  /*
  * Button spacing
  */

  slot[name='start']::slotted(*) {
    margin-inline-end: 0.75em;
  }

  slot[name='end']::slotted(*),
  .button:not(.visually-hidden-label) [part='caret'] {
    margin-inline-start: 0.75em;
  }
`;var Or=new Set,Yt=new Map,It,zr="ltr",Ir="en",Ki=typeof MutationObserver<"u"&&typeof document<"u"&&typeof document.documentElement<"u";if(Ki){let e=new MutationObserver(Gi);zr=document.documentElement.dir||"ltr",Ir=document.documentElement.lang||navigator.language,e.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]})}function mo(...e){e.map(t=>{let o=t.$code.toLowerCase();Yt.has(o)?Yt.set(o,Object.assign(Object.assign({},Yt.get(o)),t)):Yt.set(o,t),It||(It=t)}),Gi()}function Gi(){Ki&&(zr=document.documentElement.dir||"ltr",Ir=document.documentElement.lang||navigator.language),[...Or.keys()].map(e=>{typeof e.requestUpdate=="function"&&e.requestUpdate()})}var Yo=class{constructor(t){this.host=t,this.host.addController(this)}hostConnected(){Or.add(this.host)}hostDisconnected(){Or.delete(this.host)}dir(){return`${this.host.dir||zr}`.toLowerCase()}lang(){return`${this.host.lang||Ir}`.toLowerCase()}getTranslationData(t){var o,i;let n;try{n=new Intl.Locale(t.replace(/_/g,"-"))}catch{return{locale:void 0,language:"",region:"",primary:void 0,secondary:void 0}}let c=n.language.toLowerCase(),d=(i=(o=n.region)===null||o===void 0?void 0:o.toLowerCase())!==null&&i!==void 0?i:"",m=Yt.get(`${c}-${d}`),v=Yt.get(c);return{locale:n,language:c,region:d,primary:m,secondary:v}}exists(t,o){var i;let{primary:n,secondary:c}=this.getTranslationData((i=o.lang)!==null&&i!==void 0?i:this.lang());return o=Object.assign({includeFallback:!1},o),!!(n&&n[t]||c&&c[t]||o.includeFallback&&It&&It[t])}term(t,...o){let{primary:i,secondary:n}=this.getTranslationData(this.lang()),c;if(i&&i[t])c=i[t];else if(n&&n[t])c=n[t];else if(It&&It[t])c=It[t];else return console.error(`No translation found for: ${String(t)}`),String(t);return typeof c=="function"?c(...o):c}date(t,o){return t=new Date(t),new Intl.DateTimeFormat(this.lang(),o).format(t)}number(t,o){return t=Number(t),isNaN(t)?"":new Intl.NumberFormat(this.lang(),o).format(t)}relativeTime(t,o,i){return new Intl.RelativeTimeFormat(this.lang(),i).format(t,o)}};var Xi={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",captions:"Captions",clearEntry:"Clear entry",close:"Close",createOption:e=>`Create "${e}"`,copied:"Copied",copy:"Copy",currentValue:"Current value",dropFileHere:"Drop file here or click to browse",decrement:"Decrement",dropFilesHere:"Drop files here or click to browse",error:"Error",enterFullscreen:"Enter fullscreen",exitFullscreen:"Exit fullscreen",goToSlide:(e,t)=>`Go to slide ${e} of ${t}`,hidePassword:"Hide password",increment:"Increment",loading:"Loading",moreOptions:"More Options",mute:"Mute",nextSlide:"Next slide",nextVideo:"Next Video",numCharacters:e=>e===1?"1 character":`${e} characters`,numCharactersRemaining:e=>e===1?"1 character remaining":`${e} characters remaining`,numOptionsSelected:e=>e===0?"No options selected":e===1?"1 option selected":`${e} options selected`,pause:"Pause",pauseAnimation:"Pause animation",pictureInPicture:"Picture in picture",play:"Play",playbackSpeed:"Playback speed",playlist:"Playlist",playAnimation:"Play animation",previousSlide:"Previous slide",previousVideo:"Previous video",progress:"Progress",remove:"Remove",resize:"Resize",scrollableRegion:"Scrollable region",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:e=>`Slide ${e}`,toggleColorFormat:"Toggle color format",seek:"Seek",seekProgress:(e,t)=>`${e} of ${t}`,currentlyPlaying:"currently playing",unmute:"Unmute",videoPlayer:"Video player",volume:"Volume",zoomIn:"Zoom in",zoomOut:"Zoom out"};mo(Xi);var Qi=Xi;var Se=class extends Yo{};mo(Qi);function W(e,t){let o={waitUntilFirstUpdate:!1,...t};return(i,n)=>{let{update:c}=i,d=Array.isArray(e)?e:[e];i.update=function(m){d.forEach(v=>{let y=v;if(m.has(y)){let C=m.get(y),b=this[y];C!==b&&(!o.waitUntilFirstUpdate||this.hasUpdated)&&this[n](C,b)}}),c.call(this,m)}}}var De={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},bt=e=>(...t)=>({_$litDirective$:e,values:t}),rt=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,o,i){this._$Ct=t,this._$AM=o,this._$Ci=i}_$AS(t,o){return this.update(t,o)}update(t,o){return this.render(...o)}};var we=bt(class extends rt{constructor(e){if(super(e),e.type!==De.ATTRIBUTE||e.name!=="class"||e.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter(t=>e[t]).join(" ")+" "}update(e,[t]){if(this.st===void 0){this.st=new Set,e.strings!==void 0&&(this.nt=new Set(e.strings.join(" ").split(/\s/).filter(i=>i!=="")));for(let i in t)t[i]&&!this.nt?.has(i)&&this.st.add(i);return this.render(t)}let o=e.element.classList;for(let i of this.st)i in t||(o.remove(i),this.st.delete(i));for(let i in t){let n=!!t[i];n===this.st.has(i)||this.nt?.has(i)||(n?(o.add(i),this.st.add(i)):(o.remove(i),this.st.delete(i)))}return xe}});var te=e=>e??N;var Zi=Symbol.for(""),Ms=e=>{if(e?.r===Zi)return e?._$litStatic$};var Tr=(e,...t)=>({_$litStatic$:t.reduce((o,i,n)=>o+(c=>{if(c._$litStatic$!==void 0)return c._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${c}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)})(i)+e[n+1],e[0]),r:Zi}),Ji=new Map,Fr=e=>(t,...o)=>{let i=o.length,n,c,d=[],m=[],v,y=0,C=!1;for(;y<i;){for(v=t[y];y<i&&(c=o[y],(n=Ms(c))!==void 0);)v+=n+t[++y],C=!0;y!==i&&m.push(c),d.push(v),y++}if(y===i&&d.push(t[i]),C){let b=d.join("$$lit$$");(t=Ji.get(b))===void 0&&(d.raw=d,Ji.set(b,t=d)),o=m}return e(t,...o)},Ko=Fr(O),Vd=Fr(Di),Hd=Fr(Ni);var V=class extends Ce{constructor(){super(...arguments),this.assumeInteractionOn=["click"],this.hasSlotController=new ot(this,"[default]","start","end"),this.localize=new Se(this),this.invalid=!1,this.isIconButton=!1,this.title="",this.variant="neutral",this.appearance="accent",this.size="m",this.withCaret=!1,this.withStart=!1,this.withEnd=!1,this.disabled=!1,this.loading=!1,this.pill=!1,this.type="button"}static get validators(){return[...super.validators,Fo()]}handleSizeChange(){He(this.localName,this.size)}constructLightDOMButton(){let e=document.createElement("button");for(let t of this.attributes)t.name!=="style"&&e.setAttribute(t.name,t.value);return e.type=this.type,e.style.position="absolute !important",e.style.width="0 !important",e.style.height="0 !important",e.style.clipPath="inset(50%) !important",e.style.overflow="hidden !important",e.style.whiteSpace="nowrap !important",this.name&&(e.name=this.name),e.value=this.value||"",e}handleClick(e){if(this.disabled||this.loading){e.preventDefault(),e.stopImmediatePropagation();return}if(this.type!=="submit"&&this.type!=="reset"||!this.getForm())return;let o=this.constructLightDOMButton();this.parentElement?.append(o),o.click(),o.remove()}handleInvalid(){this.dispatchEvent(new Mo)}handleLabelSlotChange(){let e=this.labelSlot.assignedNodes({flatten:!0}),t=!1,o=!1,i=!1,n=!1;[...e].forEach(c=>{if(c.nodeType===Node.ELEMENT_NODE){let d=c;d.localName==="wa-icon"?(o=!0,t||(t=d.label!==void 0)):n=!0}else c.nodeType===Node.TEXT_NODE&&(c.textContent?.trim()||"").length>0&&(i=!0)}),this.isIconButton=o&&!i&&!n,this.customStates.set("icon-button",this.isIconButton),this.isIconButton&&!t&&console.warn('Icon buttons must have a label for screen readers. Add <wa-icon label="..."> to remove this warning.',this)}isButton(){return!this.href}isLink(){return!!this.href}handleDisabledChange(){this.customStates.set("disabled",this.disabled),this.updateValidity()}handleHrefChange(){this.customStates.set("link",this.isLink())}handleLoadingChange(){this.customStates.set("loading",this.loading)}setValue(...e){}click(){this.button.click()}focus(e){this.button.focus(e)}blur(){this.button.blur()}render(){let e=this.isLink(),t=e?Tr`a`:Tr`button`;return Ko`
      <${t}
        part="base"
        class=${we({button:!0,caret:this.withCaret,disabled:this.disabled,loading:this.loading,rtl:this.localize.dir()==="rtl","has-label":this.hasSlotController.test("[default]"),"has-start":this.hasUpdated?this.hasSlotController.test("start"):this.withStart,"has-end":this.hasUpdated?this.hasSlotController.test("end"):this.withEnd,"is-icon-button":this.isIconButton})}
        ?disabled=${te(e?void 0:this.disabled)}
        type=${te(e?void 0:this.type)}
        title=${this.title}
        name=${te(e?void 0:this.name)}
        value=${te(e?void 0:this.value)}
        href=${te(e?this.href:void 0)}
        target=${te(e?this.target:void 0)}
        download=${te(e?this.download:void 0)}
        rel=${te(e&&this.rel?this.rel:void 0)}
        role=${te(e?void 0:"button")}
        aria-disabled=${te(e&&this.disabled?"true":void 0)}
        tabindex=${this.disabled?"-1":"0"}
        @invalid=${this.isButton()?this.handleInvalid:null}
        @click=${this.handleClick}
      >
        <slot name="start" part="start" class="start"></slot>
        <slot part="label" class="label" @slotchange=${this.handleLabelSlotChange}></slot>
        <slot name="end" part="end" class="end"></slot>
        ${this.withCaret?Ko`
                <wa-icon part="caret" class="caret" library="system" name="chevron-down" variant="solid"></wa-icon>
              `:""}
        ${this.loading?Ko`<wa-spinner part="spinner"></wa-spinner>`:""}
      </${t}>
    `}};V.shadowRootOptions={...Ce.shadowRootOptions,delegatesFocus:!0};V.css=[Yi,Wt,Ue];h([se(".button")],V.prototype,"button",2);h([se("slot:not([name])")],V.prototype,"labelSlot",2);h([ze()],V.prototype,"invalid",2);h([ze()],V.prototype,"isIconButton",2);h([w()],V.prototype,"title",2);h([w({reflect:!0})],V.prototype,"variant",2);h([w({reflect:!0})],V.prototype,"appearance",2);h([w({reflect:!0})],V.prototype,"size",2);h([W("size")],V.prototype,"handleSizeChange",1);h([w({attribute:"with-caret",type:Boolean,reflect:!0})],V.prototype,"withCaret",2);h([w({attribute:"with-start",type:Boolean})],V.prototype,"withStart",2);h([w({attribute:"with-end",type:Boolean})],V.prototype,"withEnd",2);h([w({type:Boolean})],V.prototype,"disabled",2);h([w({type:Boolean,reflect:!0})],V.prototype,"loading",2);h([w({type:Boolean,reflect:!0})],V.prototype,"pill",2);h([w()],V.prototype,"type",2);h([w({reflect:!0})],V.prototype,"name",2);h([w({reflect:!0})],V.prototype,"value",2);h([w({reflect:!0})],V.prototype,"href",2);h([w()],V.prototype,"target",2);h([w()],V.prototype,"rel",2);h([w()],V.prototype,"download",2);h([w({attribute:"formaction"})],V.prototype,"formAction",2);h([w({attribute:"formenctype"})],V.prototype,"formEnctype",2);h([w({attribute:"formmethod"})],V.prototype,"formMethod",2);h([w({attribute:"formnovalidate",type:Boolean})],V.prototype,"formNoValidate",2);h([w({attribute:"formtarget"})],V.prototype,"formTarget",2);h([W("disabled",{waitUntilFirstUpdate:!0})],V.prototype,"handleDisabledChange",1);h([W("href")],V.prototype,"handleHrefChange",1);h([W("loading",{waitUntilFirstUpdate:!0})],V.prototype,"handleLoadingChange",1);V=h([ie("wa-button")],V);V.disableWarning?.("change-in-update");var ea=j`
  :host {
    --track-width: 2px;
    --track-color: var(--wa-color-neutral-fill-normal);
    --indicator-color: var(--wa-color-brand-fill-loud);
    --speed: 2s;
    --size: 1em;

    /*
      Resizing a spinner element using anything but font-size will break the animation because the animation uses em
      units. Therefore, if a spinner is used in a flex container without \`flex: none\` applied, the spinner can
      grow/shrink and break the animation. The use of \`flex: none\` on the host element prevents this by always having
      the spinner sized according to its actual dimensions.
    */
    flex: none;
    display: inline-flex;
    width: var(--size);
    height: var(--size);
  }

  svg {
    width: 100%;
    height: 100%;
    aspect-ratio: 1;
    animation: spin var(--speed) linear infinite;
  }

  .track,
  .indicator {
    --radius: calc(var(--size) / 2 - var(--track-width) / 2);
    --circumference: calc(var(--radius) * 2 * 3.141592654);

    cx: calc(var(--size) / 2);
    cy: calc(var(--size) / 2);
    r: var(--radius);
    fill: none;
    stroke-width: var(--track-width);
  }

  .track {
    stroke: var(--track-color);
  }

  .indicator {
    stroke: var(--indicator-color);
    stroke-linecap: round;
    stroke-dasharray: calc(0.597 * var(--circumference)), calc(0.796 * var(--circumference));
    stroke-dashoffset: calc(-0.04 * var(--circumference));
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: calc(0.008 * var(--circumference)), calc(1.194 * var(--circumference));
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: calc(0.716 * var(--circumference)), calc(1.194 * var(--circumference));
      stroke-dashoffset: calc(-0.278 * var(--circumference));
    }
    100% {
      stroke-dasharray: calc(0.716 * var(--circumference)), calc(1.194 * var(--circumference));
      stroke-dashoffset: calc(-0.987 * var(--circumference));
    }
  }
`;var Mr=class extends ce{constructor(){super(...arguments),this.localize=new Se(this)}render(){return O`
      <svg
        part="base"
        role="progressbar"
        aria-label=${this.localize.term("loading")}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle class="track" />
        <circle class="indicator" />
      </svg>
    `}};Mr.css=ea;Mr=h([ie("wa-spinner")],Mr);var ta=class extends Event{constructor(){super("wa-error",{bubbles:!0,cancelable:!1,composed:!0})}};var oa=class extends Event{constructor(){super("wa-load",{bubbles:!0,cancelable:!1,composed:!0})}};var ra=j`
  :host {
    --primary-color: currentColor;
    --primary-opacity: 1;
    --secondary-color: currentColor;
    --secondary-opacity: 0.4;
    --rotate-angle: 0deg;

    box-sizing: content-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: -0.125em;
  }

  /* Standard */
  :host(:not([auto-width])) {
    width: 1.25em;
    height: 1em;
  }

  /* Auto-width */
  :host([auto-width]) {
    width: auto;
    height: 1em;
  }

  svg {
    height: 1em;
    overflow: visible;
    width: auto;

    /* Duotone colors with path-specific opacity fallback */
    path[data-duotone-primary] {
      color: var(--primary-color);
      opacity: var(--path-opacity, var(--primary-opacity));
    }

    path[data-duotone-secondary] {
      color: var(--secondary-color);
      opacity: var(--path-opacity, var(--secondary-opacity));
    }
  }

  /* Rotation */
  :host([rotate]) {
    transform: rotate(var(--rotate-angle, 0deg));
  }

  /* Flipping */
  :host([flip='x']) {
    transform: scaleX(-1);
  }
  :host([flip='y']) {
    transform: scaleY(-1);
  }
  :host([flip='both']) {
    transform: scale(-1, -1);
  }

  /* Rotation and Flipping combined */
  :host([rotate][flip='x']) {
    transform: rotate(var(--rotate-angle, 0deg)) scaleX(-1);
  }
  :host([rotate][flip='y']) {
    transform: rotate(var(--rotate-angle, 0deg)) scaleY(-1);
  }
  :host([rotate][flip='both']) {
    transform: rotate(var(--rotate-angle, 0deg)) scale(-1, -1);
  }

  /* Animations */
  :host([animation='beat']) {
    animation-name: beat;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-in-out);
  }

  :host([animation='fade']) {
    animation-name: fade;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
  }

  :host([animation='beat-fade']) {
    animation-name: beat-fade;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
  }

  :host([animation='bounce']) {
    animation-name: bounce;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
  }

  :host([animation='flip']) {
    animation-name: flip;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-in-out);
  }

  :host([animation='shake']) {
    animation-name: shake;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, linear);
  }

  :host([animation='spin']) {
    animation-name: spin;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 2s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, linear);
  }

  :host([animation='spin-pulse']) {
    animation-name: spin-pulse;
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, steps(8));
  }

  :host([animation='spin-reverse']) {
    animation-name: spin;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, reverse);
    animation-duration: var(--animation-duration, 2s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, linear);
  }

  /* Keyframes */
  @media (prefers-reduced-motion: reduce) {
    :host([animation='beat']),
    :host([animation='bounce']),
    :host([animation='fade']),
    :host([animation='beat-fade']),
    :host([animation='flip']),
    :host([animation='shake']),
    :host([animation='spin']),
    :host([animation='spin-pulse']),
    :host([animation='spin-reverse']) {
      animation: none !important;
      transition: none !important;
    }
  }
  @keyframes beat {
    0%,
    90% {
      transform: scale(1);
    }
    45% {
      transform: scale(var(--beat-scale, 1.25));
    }
  }

  @keyframes fade {
    50% {
      opacity: var(--fade-opacity, 0.4);
    }
  }

  @keyframes beat-fade {
    0%,
    100% {
      opacity: var(--beat-fade-opacity, 0.4);
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(var(--beat-fade-scale, 1.125));
    }
  }

  @keyframes bounce {
    0% {
      transform: scale(1, 1) translateY(0);
    }
    10% {
      transform: scale(var(--bounce-start-scale-x, 1.1), var(--bounce-start-scale-y, 0.9)) translateY(0);
    }
    30% {
      transform: scale(var(--bounce-jump-scale-x, 0.9), var(--bounce-jump-scale-y, 1.1))
        translateY(var(--bounce-height, -0.5em));
    }
    50% {
      transform: scale(var(--bounce-land-scale-x, 1.05), var(--bounce-land-scale-y, 0.95)) translateY(0);
    }
    57% {
      transform: scale(1, 1) translateY(var(--bounce-rebound, -0.125em));
    }
    64% {
      transform: scale(1, 1) translateY(0);
    }
    100% {
      transform: scale(1, 1) translateY(0);
    }
  }

  @keyframes flip {
    50% {
      transform: rotate3d(var(--flip-x, 0), var(--flip-y, 1), var(--flip-z, 0), var(--flip-angle, -180deg));
    }
  }

  @keyframes shake {
    0% {
      transform: rotate(-15deg);
    }
    4% {
      transform: rotate(15deg);
    }
    8%,
    24% {
      transform: rotate(-18deg);
    }
    12%,
    28% {
      transform: rotate(18deg);
    }
    16% {
      transform: rotate(-22deg);
    }
    20% {
      transform: rotate(22deg);
    }
    32% {
      transform: rotate(-12deg);
    }
    36% {
      transform: rotate(12deg);
    }
    40%,
    100% {
      transform: rotate(0deg);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes spin-pulse {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;function Bs(e){return`data:image/svg+xml,${encodeURIComponent(e)}`}var Br={solid:{backward:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M236.3 107.1C247.9 96 265 92.9 279.7 99.2C294.4 105.5 304 120 304 136L304 272.3L476.3 107.2C487.9 96 505 92.9 519.7 99.2C534.4 105.5 544 120 544 136L544 504C544 520 534.4 534.5 519.7 540.8C505 547.1 487.9 544 476.3 532.9L304 367.7L304 504C304 520 294.4 534.5 279.7 540.8C265 547.1 247.9 544 236.3 532.9L44.3 348.9C36.5 341.3 32 330.9 32 320C32 309.1 36.5 298.7 44.3 291.1L236.3 107.1z"/></svg>',"backward-step":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M491 100.8C478.1 93.8 462.3 94.5 450 102.6L192 272.1L192 128C192 110.3 177.7 96 160 96C142.3 96 128 110.3 128 128L128 512C128 529.7 142.3 544 160 544C177.7 544 192 529.7 192 512L192 367.9L450 537.5C462.3 545.6 478 546.3 491 539.3C504 532.3 512 518.8 512 504.1L512 136.1C512 121.4 503.9 107.9 491 100.9z"/></svg>',check:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"/></svg>',"chevron-down":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>',"chevron-left":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>',"chevron-right":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M311.1 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L243.2 256 73.9 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>',circle:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0z"/></svg>',"closed-captioning":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M64 192C64 156.7 92.7 128 128 128L512 128C547.3 128 576 156.7 576 192L576 448C576 483.3 547.3 512 512 512L128 512C92.7 512 64 483.3 64 448L64 192zM216 272L248 272C252.4 272 256 275.6 256 280C256 293.3 266.7 304 280 304C293.3 304 304 293.3 304 280C304 249.1 278.9 224 248 224L216 224C185.1 224 160 249.1 160 280L160 360C160 390.9 185.1 416 216 416L248 416C278.9 416 304 390.9 304 360C304 346.7 293.3 336 280 336C266.7 336 256 346.7 256 360C256 364.4 252.4 368 248 368L216 368C211.6 368 208 364.4 208 360L208 280C208 275.6 211.6 272 216 272zM384 280C384 275.6 387.6 272 392 272L424 272C428.4 272 432 275.6 432 280C432 293.3 442.7 304 456 304C469.3 304 480 293.3 480 280C480 249.1 454.9 224 424 224L392 224C361.1 224 336 249.1 336 280L336 360C336 390.9 361.1 416 392 416L424 416C454.9 416 480 390.9 480 360C480 346.7 469.3 336 456 336C442.7 336 432 346.7 432 360C432 364.4 428.4 368 424 368L392 368C387.6 368 384 364.4 384 360L384 280z"/></svg>',"closed-captioning-slash":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M39 39.1C48.4 29.7 63.6 29.7 72.9 39.1L161.8 128L512 128C547.3 128 576 156.7 576 192L576 448C576 473.5 561.1 495.4 539.6 505.8L601 567.1C610.4 576.5 610.4 591.7 601 601C591.6 610.3 576.4 610.4 567.1 601L39 73.1C29.7 63.7 29.7 48.5 39 39.1zM384 350.1L384 279.9C384 275.5 387.6 271.9 392 271.9L424 271.9C428.4 271.9 432 275.5 432 279.9C432 293.2 442.7 303.9 456 303.9C469.3 303.9 480 293.2 480 279.9C480 249 454.9 223.9 424 223.9L392 223.9C361.1 223.9 336 249 336 279.9L336 302.1L384 350.1zM445.5 411.6C465.7 403.2 480 383.2 480 359.9C480 346.6 469.3 335.9 456 335.9C442.7 335.9 432 346.6 432 359.9C432 364.3 428.4 367.9 424 367.9L401.8 367.9L445.5 411.6zM162.3 264.1C160.8 269.1 160 274.5 160 280L160 360C160 390.9 185.1 416 216 416L248 416C266.1 416 282.1 407.5 292.4 394.2L410.2 512L128 512C92.7 512 64 483.3 64 448L64 192C64 184.2 65.4 176.7 68 169.8L162.3 264.1zM256.1 357.9C256 358.6 256 359.3 256 360C256 364.4 252.4 368 248 368L216 368C211.6 368 208 364.4 208 360L208 309.8L256.1 357.9z"/></svg>',compress:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M160 64c0-17.7-14.3-32-32-32S96 46.3 96 64l0 64-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c17.7 0 32-14.3 32-32l0-96zM32 320c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0 0 64c0 17.7 14.3 32 32 32s32-14.3 32-32l0-96c0-17.7-14.3-32-32-32l-96 0zM352 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7 14.3 32 32 32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0 0-64zM320 320c-17.7 0-32 14.3-32 32l0 96c0 17.7 14.3 32 32 32s32-14.3 32-32l0-64 64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0z"/></svg>',"ellipsis-vertical":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M320 208C289.1 208 264 182.9 264 152C264 121.1 289.1 96 320 96C350.9 96 376 121.1 376 152C376 182.9 350.9 208 320 208zM320 432C350.9 432 376 457.1 376 488C376 518.9 350.9 544 320 544C289.1 544 264 518.9 264 488C264 457.1 289.1 432 320 432zM376 320C376 350.9 350.9 376 320 376C289.1 376 264 350.9 264 320C264 289.1 289.1 264 320 264C350.9 264 376 289.1 376 320z"/></svg>',expand:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 96C110.3 96 96 110.3 96 128L96 224C96 241.7 110.3 256 128 256C145.7 256 160 241.7 160 224L160 160L224 160C241.7 160 256 145.7 256 128C256 110.3 241.7 96 224 96L128 96zM160 416C160 398.3 145.7 384 128 384C110.3 384 96 398.3 96 416L96 512C96 529.7 110.3 544 128 544L224 544C241.7 544 256 529.7 256 512C256 494.3 241.7 480 224 480L160 480L160 416zM416 96C398.3 96 384 110.3 384 128C384 145.7 398.3 160 416 160L480 160L480 224C480 241.7 494.3 256 512 256C529.7 256 544 241.7 544 224L544 128C544 110.3 529.7 96 512 96L416 96zM544 416C544 398.3 529.7 384 512 384C494.3 384 480 398.3 480 416L480 480L416 480C398.3 480 384 494.3 384 512C384 529.7 398.3 544 416 544L512 544C529.7 544 544 529.7 544 512L544 416z"/></svg>',eyedropper:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M341.6 29.2l-101.6 101.6-9.4-9.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-9.4-9.4 101.6-101.6c39-39 39-102.2 0-141.1s-102.2-39-141.1 0zM55.4 323.3c-15 15-23.4 35.4-23.4 56.6l0 42.4-26.6 39.9c-8.5 12.7-6.8 29.6 4 40.4s27.7 12.5 40.4 4l39.9-26.6 42.4 0c21.2 0 41.6-8.4 56.6-23.4l109.4-109.4-45.3-45.3-109.4 109.4c-3 3-7.1 4.7-11.3 4.7l-36.1 0 0-36.1c0-4.2 1.7-8.3 4.7-11.3l109.4-109.4-45.3-45.3-109.4 109.4z"/></svg>',forward:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M403.7 107.1C392.1 96 375 92.9 360.3 99.2C345.6 105.5 336 120 336 136L336 272.3L163.7 107.2C152.1 96 135 92.9 120.3 99.2C105.6 105.5 96 120 96 136L96 504C96 520 105.6 534.5 120.3 540.8C135 547.1 152.1 544 163.7 532.9L336 367.7L336 504C336 520 345.6 534.5 360.3 540.8C375 547.1 392.1 544 403.7 532.9L595.7 348.9C603.6 341.4 608 330.9 608 320C608 309.1 603.5 298.7 595.7 291.1L403.7 107.1z"/></svg>',file:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M192 64C156.7 64 128 92.7 128 128L128 512C128 547.3 156.7 576 192 576L448 576C483.3 576 512 547.3 512 512L512 234.5C512 217.5 505.3 201.2 493.3 189.2L386.7 82.7C374.7 70.7 358.5 64 341.5 64L192 64zM453.5 240L360 240C346.7 240 336 229.3 336 216L336 122.5L453.5 240z"/></svg>',"file-audio":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM389.8 307.7C380.7 301.4 368.3 303.6 362 312.7C355.7 321.8 357.9 334.2 367 340.5C390.9 357.2 406.4 384.8 406.4 416C406.4 447.2 390.8 474.9 367 491.5C357.9 497.8 355.7 510.3 362 519.3C368.3 528.3 380.8 530.6 389.8 524.3C423.9 500.5 446.4 460.8 446.4 416C446.4 371.2 424 331.5 389.8 307.7zM208 376C199.2 376 192 383.2 192 392L192 440C192 448.8 199.2 456 208 456L232 456L259.2 490C262.2 493.8 266.8 496 271.7 496L272 496C280.8 496 288 488.8 288 480L288 352C288 343.2 280.8 336 272 336L271.7 336C266.8 336 262.2 338.2 259.2 342L232 376L208 376zM336 448.2C336 458.9 346.5 466.4 354.9 459.8C367.8 449.5 376 433.7 376 416C376 398.3 367.8 382.5 354.9 372.2C346.5 365.5 336 373.1 336 383.8L336 448.3z"/></svg>',"file-code":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM282.2 359.6C290.8 349.5 289.7 334.4 279.6 325.8C269.5 317.2 254.4 318.3 245.8 328.4L197.8 384.4C190.1 393.4 190.1 406.6 197.8 415.6L245.8 471.6C254.4 481.7 269.6 482.8 279.6 474.2C289.6 465.6 290.8 450.4 282.2 440.4L247.6 400L282.2 359.6zM394.2 328.4C385.6 318.3 370.4 317.2 360.4 325.8C350.4 334.4 349.2 349.6 357.8 359.6L392.4 400L357.8 440.4C349.2 450.5 350.3 465.6 360.4 474.2C370.5 482.8 385.6 481.7 394.2 471.6L442.2 415.6C449.9 406.6 449.9 393.4 442.2 384.4L394.2 328.4z"/></svg>',"file-excel":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM292 330.7C284.6 319.7 269.7 316.7 258.7 324C247.7 331.3 244.7 346.3 252 357.3L291.2 416L252 474.7C244.6 485.7 247.6 500.6 258.7 508C269.8 515.4 284.6 512.4 292 501.3L320 459.3L348 501.3C355.4 512.3 370.3 515.3 381.3 508C392.3 500.7 395.3 485.7 388 474.7L348.8 416L388 357.3C395.4 346.3 392.4 331.4 381.3 324C370.2 316.6 355.4 319.6 348 330.7L320 372.7L292 330.7z"/></svg>',"file-image":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM256 320C256 302.3 241.7 288 224 288C206.3 288 192 302.3 192 320C192 337.7 206.3 352 224 352C241.7 352 256 337.7 256 320zM220.6 512L419.4 512C435.2 512 448 499.2 448 483.4C448 476.1 445.2 469 440.1 463.7L343.3 361.9C337.3 355.6 328.9 352 320.1 352L319.8 352C311 352 302.7 355.6 296.6 361.9L199.9 463.7C194.8 469 192 476.1 192 483.4C192 499.2 204.8 512 220.6 512z"/></svg>',"file-pdf":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 64C92.7 64 64 92.7 64 128L64 512C64 547.3 92.7 576 128 576L208 576L208 464C208 428.7 236.7 400 272 400L448 400L448 234.5C448 217.5 441.3 201.2 429.3 189.2L322.7 82.7C310.7 70.7 294.5 64 277.5 64L128 64zM389.5 240L296 240C282.7 240 272 229.3 272 216L272 122.5L389.5 240zM272 444C261 444 252 453 252 464L252 592C252 603 261 612 272 612C283 612 292 603 292 592L292 564L304 564C337.1 564 364 537.1 364 504C364 470.9 337.1 444 304 444L272 444zM304 524L292 524L292 484L304 484C315 484 324 493 324 504C324 515 315 524 304 524zM400 444C389 444 380 453 380 464L380 592C380 603 389 612 400 612L432 612C460.7 612 484 588.7 484 560L484 496C484 467.3 460.7 444 432 444L400 444zM420 572L420 484L432 484C438.6 484 444 489.4 444 496L444 560C444 566.6 438.6 572 432 572L420 572zM508 464L508 592C508 603 517 612 528 612C539 612 548 603 548 592L548 548L576 548C587 548 596 539 596 528C596 517 587 508 576 508L548 508L548 484L576 484C587 484 596 475 596 464C596 453 587 444 576 444L528 444C517 444 508 453 508 464z"/></svg>',"file-powerpoint":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM280 320C266.7 320 256 330.7 256 344L256 488C256 501.3 266.7 512 280 512C293.3 512 304 501.3 304 488L304 464L328 464C367.8 464 400 431.8 400 392C400 352.2 367.8 320 328 320L280 320zM328 416L304 416L304 368L328 368C341.3 368 352 378.7 352 392C352 405.3 341.3 416 328 416z"/></svg>',"file-video":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM208 368L208 464C208 481.7 222.3 496 240 496L336 496C353.7 496 368 481.7 368 464L368 440L403 475C406.2 478.2 410.5 480 415 480C424.4 480 432 472.4 432 463L432 368.9C432 359.5 424.4 351.9 415 351.9C410.5 351.9 406.2 353.7 403 356.9L368 391.9L368 367.9C368 350.2 353.7 335.9 336 335.9L240 335.9C222.3 335.9 208 350.2 208 367.9z"/></svg>',"file-word":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM263.4 338.8C260.5 325.9 247.7 317.7 234.8 320.6C221.9 323.5 213.7 336.3 216.6 349.2L248.6 493.2C250.9 503.7 260 511.4 270.8 512C281.6 512.6 291.4 505.9 294.8 495.6L320 419.9L345.2 495.6C348.6 505.8 358.4 512.5 369.2 512C380 511.5 389.1 503.8 391.4 493.2L423.4 349.2C426.3 336.3 418.1 323.4 405.2 320.6C392.3 317.8 379.4 325.9 376.6 338.8L363.4 398.2L342.8 336.4C339.5 326.6 330.4 320 320 320C309.6 320 300.5 326.6 297.2 336.4L276.6 398.2L263.4 338.8z"/></svg>',"file-zipper":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM192 136C192 149.3 202.7 160 216 160L264 160C277.3 160 288 149.3 288 136C288 122.7 277.3 112 264 112L216 112C202.7 112 192 122.7 192 136zM192 232C192 245.3 202.7 256 216 256L264 256C277.3 256 288 245.3 288 232C288 218.7 277.3 208 264 208L216 208C202.7 208 192 218.7 192 232zM256 304L224 304C206.3 304 192 318.3 192 336L192 384C192 410.5 213.5 432 240 432C266.5 432 288 410.5 288 384L288 336C288 318.3 273.7 304 256 304zM240 368C248.8 368 256 375.2 256 384C256 392.8 248.8 400 240 400C231.2 400 224 392.8 224 384C224 375.2 231.2 368 240 368z"/></svg>',"forward-step":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M21 36.8c12.9-7 28.7-6.3 41 1.8L320 208.1 320 64c0-17.7 14.3-32 32-32s32 14.3 32 32l0 384c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-144.1-258 169.6c-12.3 8.1-28 8.8-41 1.8S0 454.7 0 440L0 72C0 57.3 8.1 43.8 21 36.8z"/></svg>',gauge:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zm320 96c0-26.9-16.5-49.9-40-59.3L280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 172.7c-23.5 9.5-40 32.5-40 59.3 0 35.3 28.7 64 64 64s64-28.7 64-64zM144 176a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm-16 80a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM400 144a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>',gear:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M259.1 73.5C262.1 58.7 275.2 48 290.4 48L350.2 48C365.4 48 378.5 58.7 381.5 73.5L396 143.5C410.1 149.5 423.3 157.2 435.3 166.3L503.1 143.8C517.5 139 533.3 145 540.9 158.2L570.8 210C578.4 223.2 575.7 239.8 564.3 249.9L511 297.3C511.9 304.7 512.3 312.3 512.3 320C512.3 327.7 511.8 335.3 511 342.7L564.4 390.2C575.8 400.3 578.4 417 570.9 430.1L541 481.9C533.4 495 517.6 501.1 503.2 496.3L435.4 473.8C423.3 482.9 410.1 490.5 396.1 496.6L381.7 566.5C378.6 581.4 365.5 592 350.4 592L290.6 592C275.4 592 262.3 581.3 259.3 566.5L244.9 496.6C230.8 490.6 217.7 482.9 205.6 473.8L137.5 496.3C123.1 501.1 107.3 495.1 99.7 481.9L69.8 430.1C62.2 416.9 64.9 400.3 76.3 390.2L129.7 342.7C128.8 335.3 128.4 327.7 128.4 320C128.4 312.3 128.9 304.7 129.7 297.3L76.3 249.8C64.9 239.7 62.3 223 69.8 209.9L99.7 158.1C107.3 144.9 123.1 138.9 137.5 143.7L205.3 166.2C217.4 157.1 230.6 149.5 244.6 143.4L259.1 73.5zM320.3 400C364.5 399.8 400.2 363.9 400 319.7C399.8 275.5 363.9 239.8 319.7 240C275.5 240.2 239.8 276.1 240 320.3C240.2 364.5 276.1 400.2 320.3 400z"/></svg>',"grip-vertical":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M128 40c0-22.1-17.9-40-40-40L40 0C17.9 0 0 17.9 0 40L0 88c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zM0 424l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM320 40c0-22.1-17.9-40-40-40L232 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zM192 232l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM320 424c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z"/></svg>',indeterminate:'<svg part="indeterminate-icon" class="icon" viewBox="0 0 16 16"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round"><g stroke="currentColor" stroke-width="2"><g transform="translate(2.285714 6.857143)"><path d="M10.2857143,1.14285714 L1.14285714,1.14285714"/></g></g></g></svg>',minus:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32z"/></svg>',pause:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M48 32C21.5 32 0 53.5 0 80L0 432c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48L48 32zm224 0c-26.5 0-48 21.5-48 48l0 352c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48l-64 0z"/></svg>',"picture-in-picture":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M448 32c35.3 0 64 28.7 64 64l0 112-64 0 0-112-384 0 0 320 144 0 0 64-144 0-6.5-.3c-30.1-3.1-54.1-27-57.1-57.1L0 416 0 96C0 62.9 25.2 35.6 57.5 32.3L64 32 448 32zm16 224c26.5 0 48 21.5 48 48l0 128c0 26.5-21.5 48-48 48l-160 0c-26.5 0-48-21.5-48-48l0-128c0-26.5 21.5-48 48-48l160 0z"/></svg>',play:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M91.2 36.9c-12.4-6.8-27.4-6.5-39.6 .7S32 57.9 32 72l0 368c0 14.1 7.5 27.2 19.6 34.4s27.2 7.5 39.6 .7l336-184c12.8-7 20.8-20.5 20.8-35.1s-8-28.1-20.8-35.1l-336-184z"/></svg>',"play-circle":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9l0 176c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z"/></svg>',plus:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"/></svg>',star:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M309.5-18.9c-4.1-8-12.4-13.1-21.4-13.1s-17.3 5.1-21.4 13.1L193.1 125.3 33.2 150.7c-8.9 1.4-16.3 7.7-19.1 16.3s-.5 18 5.8 24.4l114.4 114.5-25.2 159.9c-1.4 8.9 2.3 17.9 9.6 23.2s16.9 6.1 25 2L288.1 417.6 432.4 491c8 4.1 17.7 3.3 25-2s11-14.2 9.6-23.2L441.7 305.9 556.1 191.4c6.4-6.4 8.6-15.8 5.8-24.4s-10.1-14.9-19.1-16.3L383 125.3 309.5-18.9z"/></svg>',upload:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M352 173.3L352 384C352 401.7 337.7 416 320 416C302.3 416 288 401.7 288 384L288 173.3L246.6 214.7C234.1 227.2 213.8 227.2 201.3 214.7C188.8 202.2 188.8 181.9 201.3 169.4L297.3 73.4C309.8 60.9 330.1 60.9 342.6 73.4L438.6 169.4C451.1 181.9 451.1 202.2 438.6 214.7C426.1 227.2 405.8 227.2 393.3 214.7L352 173.3zM320 464C364.2 464 400 428.2 400 384L480 384C515.3 384 544 412.7 544 448L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 448C96 412.7 124.7 384 160 384L240 384C240 428.2 275.8 464 320 464zM464 488C477.3 488 488 477.3 488 464C488 450.7 477.3 440 464 440C450.7 440 440 450.7 440 464C440 477.3 450.7 488 464 488z"/></svg>',user:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M224 248a120 120 0 1 0 0-240 120 120 0 1 0 0 240zm-29.7 56C95.8 304 16 383.8 16 482.3 16 498.7 29.3 512 45.7 512l356.6 0c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3l-59.4 0z"/></svg>',volume:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M48 352l48 0 134.1 119.2c6.4 5.7 14.6 8.8 23.1 8.8 19.2 0 34.8-15.6 34.8-34.8l0-378.4c0-19.2-15.6-34.8-34.8-34.8-8.5 0-16.7 3.1-23.1 8.8L96 160 48 160c-26.5 0-48 21.5-48 48l0 96c0 26.5 21.5 48 48 48zM441.1 107c-10.3-8.4-25.4-6.8-33.8 3.5s-6.8 25.4 3.5 33.8C443.3 170.7 464 210.9 464 256s-20.7 85.3-53.2 111.8c-10.3 8.4-11.8 23.5-3.5 33.8s23.5 11.8 33.8 3.5c43.2-35.2 70.9-88.9 70.9-149s-27.7-113.8-70.9-149zm-60.5 74.5c-10.3-8.4-25.4-6.8-33.8 3.5s-6.8 25.4 3.5 33.8C361.1 227.6 368 241 368 256s-6.9 28.4-17.7 37.3c-10.3 8.4-11.8 23.5-3.5 33.8s23.5 11.8 33.8 3.5C402.1 312.9 416 286.1 416 256s-13.9-56.9-35.5-74.5z"/></svg>',"volume-low":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M48 352l48 0 134.1 119.2c6.4 5.7 14.6 8.8 23.1 8.8 19.2 0 34.8-15.6 34.8-34.8l0-378.4c0-19.2-15.6-34.8-34.8-34.8-8.5 0-16.7 3.1-23.1 8.8L96 160 48 160c-26.5 0-48 21.5-48 48l0 96c0 26.5 21.5 48 48 48zM380.6 181.5c-10.3-8.4-25.4-6.8-33.8 3.5s-6.8 25.4 3.5 33.8C361.1 227.6 368 241 368 256s-6.9 28.4-17.7 37.3c-10.3 8.4-11.8 23.5-3.5 33.8s23.5 11.8 33.8 3.5C402.1 312.9 416 286.1 416 256s-13.9-56.9-35.5-74.5z"/></svg>',"volume-xmark":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M48 352l48 0 134.1 119.2c6.4 5.7 14.6 8.8 23.1 8.8 19.2 0 34.8-15.6 34.8-34.8l0-378.4c0-19.2-15.6-34.8-34.8-34.8-8.5 0-16.7 3.1-23.1 8.8L96 160 48 160c-26.5 0-48 21.5-48 48l0 96c0 26.5 21.5 48 48 48zM367 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>',xmark:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z"/></svg>'},regular:{"circle-question":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M464 256a208 208 0 1 0 -416 0 208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zm256-80c-17.7 0-32 14.3-32 32 0 13.3-10.7 24-24 24s-24-10.7-24-24c0-44.2 35.8-80 80-80s80 35.8 80 80c0 47.2-36 67.2-56 74.5l0 3.8c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-8.1c0-20.5 14.8-35.2 30.1-40.2 6.4-2.1 13.2-5.5 18.2-10.3 4.3-4.2 7.7-10 7.7-19.6 0-17.7-14.3-32-32-32zM224 368a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>',"circle-xmark":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464a256 256 0 1 0 0-512 256 256 0 1 0 0 512zM167 167c-9.4 9.4-9.4 24.6 0 33.9l55 55-55 55c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l55-55 55 55c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-55-55 55-55c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-55 55-55-55c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>',copy:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M384 336l-192 0c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l133.5 0c4.2 0 8.3 1.7 11.3 4.7l58.5 58.5c3 3 4.7 7.1 4.7 11.3L400 320c0 8.8-7.2 16-16 16zM192 384l192 0c35.3 0 64-28.7 64-64l0-197.5c0-17-6.7-33.3-18.7-45.3L370.7 18.7C358.7 6.7 342.5 0 325.5 0L192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-16-48 0 0 16c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l16 0 0-48-16 0z"/></svg>',eye:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M288 80C222.8 80 169.2 109.6 128.1 147.7 89.6 183.5 63 226 49.4 256 63 286 89.6 328.5 128.1 364.3 169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256 513 226 486.4 183.5 447.9 147.7 406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1 3.3 7.9 3.3 16.7 0 24.6-14.9 35.7-46.2 87.7-93 131.1-47.1 43.7-111.8 80.6-192.6 80.6S142.5 443.2 95.4 399.4c-46.8-43.5-78.1-95.4-93-131.1-3.3-7.9-3.3-16.7 0-24.6 14.9-35.7 46.2-87.7 93-131.1zM288 336c44.2 0 80-35.8 80-80 0-29.6-16.1-55.5-40-69.3-1.4 59.7-49.6 107.9-109.3 109.3 13.8 23.9 39.7 40 69.3 40zm-79.6-88.4c2.5 .3 5 .4 7.6 .4 35.3 0 64-28.7 64-64 0-2.6-.2-5.1-.4-7.6-37.4 3.9-67.2 33.7-71.1 71.1zm45.6-115c10.8-3 22.2-4.5 33.9-4.5 8.8 0 17.5 .9 25.8 2.6 .3 .1 .5 .1 .8 .2 57.9 12.2 101.4 63.7 101.4 125.2 0 70.7-57.3 128-128 128-61.6 0-113-43.5-125.2-101.4-1.8-8.6-2.8-17.5-2.8-26.6 0-11 1.4-21.8 4-32 .2-.7 .3-1.3 .5-1.9 11.9-43.4 46.1-77.6 89.5-89.5z"/></svg>',"eye-slash":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M41-24.9c-9.4-9.4-24.6-9.4-33.9 0S-2.3-.3 7 9.1l528 528c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-96.4-96.4c2.7-2.4 5.4-4.8 8-7.2 46.8-43.5 78.1-95.4 93-131.1 3.3-7.9 3.3-16.7 0-24.6-14.9-35.7-46.2-87.7-93-131.1-47.1-43.7-111.8-80.6-192.6-80.6-56.8 0-105.6 18.2-146 44.2L41-24.9zM176.9 111.1c32.1-18.9 69.2-31.1 111.1-31.1 65.2 0 118.8 29.6 159.9 67.7 38.5 35.7 65.1 78.3 78.6 108.3-13.6 30-40.2 72.5-78.6 108.3-3.1 2.8-6.2 5.6-9.4 8.4L393.8 328c14-20.5 22.2-45.3 22.2-72 0-70.7-57.3-128-128-128-26.7 0-51.5 8.2-72 22.2l-39.1-39.1zm182 182l-108-108c11.1-5.8 23.7-9.1 37.1-9.1 44.2 0 80 35.8 80 80 0 13.4-3.3 26-9.1 37.1zM103.4 173.2l-34-34c-32.6 36.8-55 75.8-66.9 104.5-3.3 7.9-3.3 16.7 0 24.6 14.9 35.7 46.2 87.7 93 131.1 47.1 43.7 111.8 80.6 192.6 80.6 37.3 0 71.2-7.9 101.5-20.6L352.2 422c-20 6.4-41.4 10-64.2 10-65.2 0-118.8-29.6-159.9-67.7-38.5-35.7-65.1-78.3-78.6-108.3 10.4-23.1 28.6-53.6 54-82.8z"/></svg>',star:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M288.1-32c9 0 17.3 5.1 21.4 13.1L383 125.3 542.9 150.7c8.9 1.4 16.3 7.7 19.1 16.3s.5 18-5.8 24.4L441.7 305.9 467 465.8c1.4 8.9-2.3 17.9-9.6 23.2s-17 6.1-25 2L288.1 417.6 143.8 491c-8 4.1-17.7 3.3-25-2s-11-14.2-9.6-23.2L134.4 305.9 20 191.4c-6.4-6.4-8.6-15.8-5.8-24.4s10.1-14.9 19.1-16.3l159.9-25.4 73.6-144.2c4.1-8 12.4-13.1 21.4-13.1zm0 76.8L230.3 158c-3.5 6.8-10 11.6-17.6 12.8l-125.5 20 89.8 89.9c5.4 5.4 7.9 13.1 6.7 20.7l-19.8 125.5 113.3-57.6c6.8-3.5 14.9-3.5 21.8 0l113.3 57.6-19.8-125.5c-1.2-7.6 1.3-15.3 6.7-20.7l89.8-89.9-125.5-20c-7.6-1.2-14.1-6-17.6-12.8L288.1 44.8z"/></svg>'}},Rs={name:"system",resolver:(e,t="classic",o="solid")=>{let n=Br[o][e]??Br.regular[e]??Br.regular["circle-question"];return n?Bs(n):""}},ia=Rs;var Ps="",Rr="";function aa(){return Ps.replace(/\/$/,"")}function Ds(e){Rr=e}function na(){if(!Rr){let e=document.querySelector("[data-fa-kit-code]");e&&Ds(e.getAttribute("data-fa-kit-code")||"")}return Rr}var sa="7.2.0";function Ns(e,t,o){let i="solid";return t==="chisel"&&(i="chisel-regular"),t==="etch"&&(i="etch-solid"),t==="graphite"&&(i="graphite-thin"),t==="jelly"&&(i="jelly-regular",o==="duo-regular"&&(i="jelly-duo-regular"),o==="fill-regular"&&(i="jelly-fill-regular")),t==="jelly-duo"&&(i="jelly-duo-regular"),t==="jelly-fill"&&(i="jelly-fill-regular"),t==="notdog"&&(o==="solid"&&(i="notdog-solid"),o==="duo-solid"&&(i="notdog-duo-solid")),t==="notdog-duo"&&(i="notdog-duo-solid"),t==="slab"&&((o==="solid"||o==="regular")&&(i="slab-regular"),o==="press-regular"&&(i="slab-press-regular")),t==="slab-press"&&(i="slab-press-regular"),t==="thumbprint"&&(i="thumbprint-light"),t==="utility"&&(i="utility-semibold"),t==="utility-duo"&&(i="utility-duo-semibold"),t==="utility-fill"&&(i="utility-fill-semibold"),t==="whiteboard"&&(i="whiteboard-semibold"),t==="classic"&&(o==="thin"&&(i="thin"),o==="light"&&(i="light"),o==="regular"&&(i="regular"),o==="solid"&&(i="solid")),t==="duotone"&&(o==="thin"&&(i="duotone-thin"),o==="light"&&(i="duotone-light"),o==="regular"&&(i="duotone-regular"),o==="solid"&&(i="duotone")),t==="sharp"&&(o==="thin"&&(i="sharp-thin"),o==="light"&&(i="sharp-light"),o==="regular"&&(i="sharp-regular"),o==="solid"&&(i="sharp-solid")),t==="sharp-duotone"&&(o==="thin"&&(i="sharp-duotone-thin"),o==="light"&&(i="sharp-duotone-light"),o==="regular"&&(i="sharp-duotone-regular"),o==="solid"&&(i="sharp-duotone-solid")),t==="brands"&&(i="brands"),i}function qs(e,t,o){let i=Ns(e,t,o),n=aa();if(n)return`${n}/${i}/${e}.svg`;let c=na();return c.length>0?`https://ka-p.fontawesome.com/releases/v${sa}/svgs/${i}/${e}.svg?token=${encodeURIComponent(c)}`:`https://ka-f.fontawesome.com/releases/v${sa}/svgs/${i}/${e}.svg`}var Vs={name:"default",resolver:(e,t="classic",o="solid")=>qs(e,t,o),mutator:(e,t)=>{if(t?.family&&!e.hasAttribute("data-duotone-initialized")){let{family:o,variant:i}=t;if(o==="duotone"||o==="sharp-duotone"||o==="notdog-duo"||o==="notdog"&&i==="duo-solid"||o==="jelly-duo"||o==="jelly"&&i==="duo-regular"||o==="utility-duo"||o==="thumbprint"){let n=[...e.querySelectorAll("path")],c=n.find(m=>!m.hasAttribute("opacity")),d=n.find(m=>m.hasAttribute("opacity"));if(!c||!d)return;if(c.setAttribute("data-duotone-primary",""),d.setAttribute("data-duotone-secondary",""),t.swapOpacity&&c&&d){let m=d.getAttribute("opacity")||"0.4";c.style.setProperty("--path-opacity",m),d.style.setProperty("--path-opacity","1")}e.setAttribute("data-duotone-initialized","")}}}},la=Vs;var Hs="classic",Us=[la,ia],Pr=[];function ca(e){Pr.push(e)}function da(e){Pr=Pr.filter(t=>t!==e)}function Go(e){return Us.find(t=>t.name===e)}function ua(){return Hs}var{I:js}=Hi,pa=e=>e;var fa=(e,t)=>t===void 0?e?._$litType$!==void 0:e?._$litType$===t;var ma=e=>e.strings===void 0,ha=()=>document.createComment(""),Kt=(e,t,o)=>{let i=e._$AA.parentNode,n=t===void 0?e._$AB:t._$AA;if(o===void 0){let c=i.insertBefore(ha(),n),d=i.insertBefore(ha(),n);o=new js(c,d,e,e.options)}else{let c=o._$AB.nextSibling,d=o._$AM,m=d!==e;if(m){let v;o._$AQ?.(e),o._$AM=e,o._$AP!==void 0&&(v=e._$AU)!==d._$AU&&o._$AP(v)}if(c!==n||m){let v=o._$AA;for(;v!==c;){let y=pa(v).nextSibling;pa(i).insertBefore(v,n),v=y}}}return o},yt=(e,t,o=e)=>(e._$AI(t,o),e),Ws={},Xo=(e,t=Ws)=>e._$AH=t,ga=e=>e._$AH,Qo=e=>{e._$AR(),e._$AA.remove()};var go=Symbol(),Jo=Symbol(),Dr,Nr=new Map,_e=class extends ce{constructor(){super(...arguments),this.svg=null,this.autoWidth=!1,this.swapOpacity=!1,this.label="",this.library="default",this.rotate=0,this.resolveIcon=async(e,t)=>{let o;if(t?.spriteSheet){this.hasUpdated||await this.updateComplete,this.svg=O`<svg part="svg">
        <use part="use" href="${e}"></use>
      </svg>`,await this.updateComplete;let i=this.shadowRoot.querySelector("[part='svg']");return typeof t.mutator=="function"&&t.mutator(i,this),this.svg}try{if(o=await fetch(e,{mode:"cors"}),!o.ok)return o.status===410?go:Jo}catch{return Jo}try{let i=document.createElement("div");i.innerHTML=await o.text();let n=i.firstElementChild;if(n?.tagName?.toLowerCase()!=="svg")return go;Dr||(Dr=new DOMParser);let d=Dr.parseFromString(n.outerHTML,"text/html").body.querySelector("svg");return d?(d.part.add("svg"),document.adoptNode(d)):go}catch{return go}}}connectedCallback(){super.connectedCallback(),ca(this)}firstUpdated(e){super.firstUpdated(e),this.hasAttribute("rotate")&&this.style.setProperty("--rotate-angle",`${this.rotate}deg`),this.setIcon()}disconnectedCallback(){super.disconnectedCallback(),da(this)}async getIconSource(){let e=Go(this.library),t=this.family||ua();if(this.name&&e){let o;try{o=await e.resolver(this.name,t,this.variant,this.autoWidth)}catch{o=void 0}return{url:o,fromLibrary:!0}}return{url:this.src,fromLibrary:!1}}handleLabelChange(){typeof this.label=="string"&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"))}async setIcon(){let{url:e,fromLibrary:t}=await this.getIconSource(),o=t?Go(this.library):void 0;if(!e){this.svg=null;return}let i=Nr.get(e);i||(i=this.resolveIcon(e,o),Nr.set(e,i));let n=await i;n===Jo&&Nr.delete(e);let c=await this.getIconSource();if(e===c.url){if(fa(n)){this.svg=n;return}switch(n){case Jo:case go:this.svg=null,this.dispatchEvent(new ta);break;default:this.svg=n.cloneNode(!0),o?.mutator?.(this.svg,this),this.dispatchEvent(new oa)}}}updated(e){super.updated(e);let t=Go(this.library);this.hasAttribute("rotate")&&this.style.setProperty("--rotate-angle",`${this.rotate}deg`);let o=this.shadowRoot?.querySelector("svg");o&&t?.mutator?.(o,this)}render(){return this.hasUpdated?this.svg:O`<svg part="svg" width="16" height="16"></svg>`}};_e.css=ra;h([ze()],_e.prototype,"svg",2);h([w({reflect:!0})],_e.prototype,"name",2);h([w({reflect:!0})],_e.prototype,"family",2);h([w({reflect:!0})],_e.prototype,"variant",2);h([w({attribute:"auto-width",type:Boolean,reflect:!0})],_e.prototype,"autoWidth",2);h([w({attribute:"swap-opacity",type:Boolean,reflect:!0})],_e.prototype,"swapOpacity",2);h([w()],_e.prototype,"src",2);h([w()],_e.prototype,"label",2);h([w({reflect:!0})],_e.prototype,"library",2);h([w({type:Number,reflect:!0})],_e.prototype,"rotate",2);h([w({type:String,reflect:!0})],_e.prototype,"flip",2);h([w({type:String,reflect:!0})],_e.prototype,"animation",2);h([W("label")],_e.prototype,"handleLabelChange",1);h([W(["family","name","library","variant","src","autoWidth","swapOpacity"],{waitUntilFirstUpdate:!0})],_e.prototype,"setIcon",1);_e=h([ie("wa-icon")],_e);var va=j`
  :host {
    --tag-max-size: 10ch;
    --show-duration: 100ms;
    --hide-duration: 100ms;
  }

  /* Add ellipses to multi select options */
  :host wa-tag::part(content) {
    display: initial;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: var(--tag-max-size);
  }

  :host .disabled [part~='combobox'] {
    opacity: 0.5;
    cursor: not-allowed;
    outline: none;
  }

  :host .enabled:is(.open, :focus-within) [part~='combobox'] {
    outline-color: var(--wa-color-focus);
  }

  /** The popup */
  .select {
    flex: 1 1 auto;
    display: inline-flex;
    width: 100%;
    position: relative;
    vertical-align: middle;

    /* Pass through from select to the popup */
    --show-duration: inherit;
    --hide-duration: inherit;

    &::part(popup) {
      z-index: 900;
    }

    &[data-current-placement^='top']::part(popup) {
      transform-origin: bottom;
    }

    &[data-current-placement^='bottom']::part(popup) {
      transform-origin: top;
    }
  }

  /* Combobox */
  .combobox {
    flex: 1;
    display: flex;
    width: 100%;
    min-width: 0;
    align-items: center;
    justify-content: start;

    min-height: var(--wa-form-control-height);

    background-color: var(--wa-form-control-background-color);
    border-color: var(--wa-form-control-border-color);
    border-radius: var(--wa-form-control-border-radius);
    border-style: var(--wa-form-control-border-style);
    border-width: var(--wa-form-control-border-width);
    color: var(--wa-form-control-value-color);
    cursor: pointer;
    font-family: inherit;
    font-weight: var(--wa-form-control-value-font-weight);
    line-height: var(--wa-form-control-value-line-height);
    overflow: hidden;
    padding: 0 var(--wa-form-control-padding-inline);
    position: relative;
    vertical-align: middle;
    transition:
      background-color var(--wa-transition-normal),
      border-color var(--wa-transition-normal),
      outline-color var(--wa-transition-fast);
    transition-timing-function: var(--wa-transition-easing);
    outline: var(--wa-focus-ring-style) var(--wa-focus-ring-width) transparent;
    outline-offset: var(--wa-focus-ring-offset);

    /* Pills */
    :host([pill]) & {
      border-radius: var(--wa-border-radius-pill);
    }
  }

  /* Appearance modifiers */
  :host([appearance='outlined']) .combobox {
    background-color: var(--wa-form-control-background-color);
    border-color: var(--wa-form-control-border-color);
  }

  :host([appearance='filled']) .combobox {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: var(--wa-color-neutral-fill-quiet);
  }

  :host([appearance='filled-outlined']) .combobox {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: var(--wa-form-control-border-color);
  }

  .display-input {
    position: relative;
    width: 100%;
    font: inherit;
    border: none;
    background: none;
    line-height: var(--wa-form-control-value-line-height);
    color: var(--wa-form-control-value-color);
    cursor: inherit;
    overflow: hidden;
    padding: 0;
    margin: 0;
    -webkit-appearance: none;

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: var(--wa-form-control-placeholder-color);
    }
  }

  /* Manage spacing when tags are present */
  :host([multiple]) {
    --_padding-with-tags: calc(var(--wa-form-control-height) * 0.1 - var(--wa-form-control-border-width));

    & .combobox:has(.tags wa-tag) {
      padding-block: var(--_padding-with-tags);
      padding-inline-start: var(--_padding-with-tags);
    }
  }

  /* Visually hide the display input when multiple is enabled */
  :host([multiple]) .combobox:has(.tags wa-tag) .display-input {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  .value-input {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    padding: 0;
    margin: 0;
  }

  .tags {
    display: flex;
    flex: 1;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.25em;

    &::slotted(wa-tag) {
      cursor: pointer !important;
    }

    .disabled &,
    .disabled &::slotted(wa-tag) {
      cursor: not-allowed !important;
    }
  }

  /* Start and End */

  .start,
  .end {
    flex: 0;
    display: inline-flex;
    align-items: center;
    color: var(--wa-color-neutral-on-quiet);
  }

  .end::slotted(*) {
    margin-inline-start: var(--wa-form-control-padding-inline);
  }

  .start::slotted(*) {
    margin-inline-end: var(--wa-form-control-padding-inline);
  }

  :host([multiple]) .combobox:has(.tags wa-tag) .start::slotted(*) {
    margin-inline-start: calc(var(--wa-form-control-padding-inline) - var(--_padding-with-tags));
  }

  /* Clear button */
  [part~='clear-button'] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    color: var(--wa-color-neutral-on-quiet);
    border: none;
    background: none;
    padding: 0;
    transition: color var(--wa-transition-normal);
    cursor: pointer;
    margin-inline-start: var(--wa-form-control-padding-inline);

    &:focus {
      outline: none;
    }

    @media (hover: hover) {
      &:hover {
        color: color-mix(in oklab, currentColor, var(--wa-color-mix-hover));
      }
    }

    &:active {
      color: color-mix(in oklab, currentColor, var(--wa-color-mix-active));
    }
  }

  /* Expand icon */
  .expand-icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    color: var(--wa-color-neutral-on-quiet);
    transition: rotate var(--wa-transition-slow) ease;
    rotate: 0deg;
    margin-inline-start: var(--wa-form-control-padding-inline);

    .open & {
      rotate: -180deg;
    }
  }

  /* Listbox */
  .listbox {
    display: block;
    position: relative;
    font: inherit;
    box-shadow: var(--wa-shadow-m);
    background: var(--wa-color-surface-raised);
    border-color: var(--wa-color-surface-border);
    border-radius: var(--wa-border-radius-m);
    border-style: var(--wa-border-style);
    border-width: var(--wa-border-width-s);
    padding-block: 0.5em;
    padding-inline: 0;
    overflow: auto;
    overscroll-behavior: none;

    /* Make sure it adheres to the popup's auto size */
    max-width: var(--auto-size-available-width);
    max-height: var(--auto-size-available-height);

    &::slotted(wa-divider) {
      --spacing: 0.5em;
    }
  }

  slot:not([name])::slotted(small) {
    display: block;
    font-size: var(--wa-font-size-smaller);
    font-weight: var(--wa-font-weight-semibold);
    color: var(--wa-color-text-quiet);
    padding-block: 0.5em;
    padding-inline: 2.25em;
  }
`;function Ys(e,t){return{top:Math.round(e.getBoundingClientRect().top-t.getBoundingClientRect().top),left:Math.round(e.getBoundingClientRect().left-t.getBoundingClientRect().left)}}var qr=new Set;function Ks(){let e=document.documentElement.clientWidth;return Math.abs(window.innerWidth-e)}function Gs(){let e=Number(getComputedStyle(document.body).paddingRight.replace(/px/,""));return isNaN(e)||!e?0:e}function Vr(e){if(qr.add(e),!document.documentElement.classList.contains("wa-scroll-lock")){let t=Ks()+Gs(),o=getComputedStyle(document.documentElement).scrollbarGutter;(!o||o==="auto")&&(o="stable"),t<2&&(o=""),document.documentElement.style.setProperty("--wa-scroll-lock-gutter",o),document.documentElement.classList.add("wa-scroll-lock"),document.documentElement.style.setProperty("--wa-scroll-lock-size",`${t}px`)}}function Hr(e){qr.delete(e),qr.size===0&&(document.documentElement.classList.remove("wa-scroll-lock"),document.documentElement.style.removeProperty("--wa-scroll-lock-size"))}function wa(e,t,o="vertical",i="smooth"){let n=Ys(e,t),c=n.top+t.scrollTop,d=n.left+t.scrollLeft,m=t.scrollLeft,v=t.scrollLeft+t.offsetWidth,y=t.scrollTop,C=t.scrollTop+t.offsetHeight;(o==="horizontal"||o==="both")&&(d<m?t.scrollTo({left:d,behavior:i}):d+e.clientWidth>v&&t.scrollTo({left:d-t.offsetWidth+e.clientWidth,behavior:i})),(o==="vertical"||o==="both")&&(c<y?t.scrollTo({top:c,behavior:i}):c+e.clientHeight>C&&t.scrollTo({top:c-t.offsetHeight+e.clientHeight,behavior:i}))}var Zo=class extends Event{constructor(){super("wa-clear",{bubbles:!0,cancelable:!1,composed:!0})}};var Tt=[];function Gt(e){Tt.push(e)}function Ft(e){for(let t=Tt.length-1;t>=0;t--)if(Tt[t]===e){Tt.splice(t,1);break}}function Mt(e){return Tt.length>0&&Tt[Tt.length-1]===e}var Xt=class extends Event{constructor(){super("wa-show",{bubbles:!0,cancelable:!0,composed:!0})}};var Qt=class extends Event{constructor(e){super("wa-hide",{bubbles:!0,cancelable:!0,composed:!0}),this.detail=e}};var Jt=class extends Event{constructor(){super("wa-after-hide",{bubbles:!0,cancelable:!1,composed:!0})}};var Zt=class extends Event{constructor(){super("wa-after-show",{bubbles:!0,cancelable:!1,composed:!0})}};function eo(e,t){return new Promise(o=>{function i(n){n.target===e&&(e.removeEventListener(t,i),o())}e.addEventListener(t,i)})}function Ge(e,t){return new Promise(o=>{let i=new AbortController,{signal:n}=i;if(e.classList.contains(t))return;e.classList.add(t);let c=!1,d=()=>{c||(c=!0,e.classList.remove(t),o(),i.abort())};e.addEventListener("animationend",d,{once:!0,signal:n}),e.addEventListener("animationcancel",d,{once:!0,signal:n}),requestAnimationFrame(()=>{!c&&e.getAnimations().length===0&&d()})})}var er=(e={})=>{let{validationElement:t,validationProperty:o}=e;t||(t=Object.assign(document.createElement("input"),{required:!0})),o||(o="value");let i={observedAttributes:["required"],message:t.validationMessage,checkValidity(n){let c={message:"",isValid:!0,invalidKeys:[]};return(n.required??n.hasAttribute("required"))&&!n[o]&&(c.message=typeof i.message=="function"?i.message(n):i.message||"",c.isValid=!1,c.invalidKeys.push("valueMissing")),c}};return i};var to=j`
  :host {
    display: flex;
    flex-direction: column;
  }

  /* Treat wrapped labels, inputs, and hints as direct children of the host element */
  [part~='form-control'] {
    display: contents;
  }

  /* Label */
  :is([part~='form-control-label'], [part~='label']):has(*:not(:empty)),
  :is([part~='form-control-label'], [part~='label']).has-label {
    display: inline-flex;
    color: var(--wa-form-control-label-color);
    font-weight: var(--wa-form-control-label-font-weight);
    line-height: var(--wa-form-control-label-line-height);
    margin-block-end: 0.5em;
  }

  :host([required]) :is([part~='form-control-label'], [part~='label'])::after {
    content: var(--wa-form-control-required-content);
    margin-inline-start: var(--wa-form-control-required-content-offset);
    color: var(--wa-form-control-required-content-color);
  }

  /* Help text */
  [part~='hint'] {
    display: block;
    color: var(--wa-form-control-hint-color);
    font-weight: var(--wa-form-control-hint-font-weight);
    line-height: var(--wa-form-control-hint-line-height);
    margin-block-start: 0.5em;
    font-size: var(--wa-font-size-smaller);

    &:not(.has-slotted, .has-hint) {
      display: none;
    }
  }
`;var vo=class extends rt{constructor(t){if(super(t),this.it=N,t.type!==De.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===N||t==null)return this._t=void 0,this.it=t;if(t===xe)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let o=[t];return o.raw=o,this._t={_$litType$:this.constructor.resultType,strings:o,values:[]}}};vo.directiveName="unsafeHTML",vo.resultType=1;var ba=bt(vo);var H=class extends Ce{constructor(){super(...arguments),this.assumeInteractionOn=["blur","input"],this.cachedOptions=null,this.hasSlotController=new ot(this,"hint","label"),this.localize=new Se(this),this.selectionOrder=new Map,this.typeToSelectString="",this.slotChangePending=!1,this.displayLabel="",this.selectedOptions=[],this.name="",this._defaultValue=null,this.size="m",this.placeholder="",this.multiple=!1,this.maxOptionsVisible=3,this.disabled=!1,this.withClear=!1,this.open=!1,this.appearance="outlined",this.pill=!1,this.label="",this.placement="bottom",this.hint="",this.withLabel=!1,this.withHint=!1,this.required=!1,this.getTag=e=>O`
        <wa-tag
          part="tag"
          exportparts="
            base:tag__base,
            content:tag__content,
            remove-button:tag__remove-button,
            remove-button__base:tag__remove-button__base
          "
          ?pill=${this.pill}
          size=${this.size}
          with-remove
          data-value=${e.value}
          @wa-remove=${t=>this.handleTagRemove(t,e)}
        >
          ${e.label}
        </wa-tag>
      `,this.handleDocumentFocusIn=e=>{let t=e.composedPath();this&&!t.includes(this)&&this.hide()},this.handleDocumentKeyDown=e=>{let t=e.target,o=t.closest('[part~="clear-button"]')!==null,i=t.closest("wa-button")!==null;if(!(o||i)){if(e.key==="Escape"&&this.open&&Mt(this)&&(e.preventDefault(),e.stopPropagation(),this.hide(),this.displayInput.focus({preventScroll:!0})),e.key==="Enter"||e.key===" "&&this.typeToSelectString===""){if(e.preventDefault(),e.stopImmediatePropagation(),!this.open){this.show();return}this.currentOption&&!this.currentOption.disabled&&(this.valueHasChanged=!0,this.hasInteracted=!0,this.multiple?this.toggleOptionSelection(this.currentOption):this.setSelectedOptions(this.currentOption),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:!0})));return}if(["ArrowUp","ArrowDown","Home","End"].includes(e.key)){let n=this.getAllOptions(),c=n.indexOf(this.currentOption),d=Math.max(0,c);if(e.preventDefault(),!this.open&&(this.show(),this.currentOption))return;e.key==="ArrowDown"?(d=c+1,d>n.length-1&&(d=0)):e.key==="ArrowUp"?(d=c-1,d<0&&(d=n.length-1)):e.key==="Home"?d=0:e.key==="End"&&(d=n.length-1),this.setCurrentOption(n[d])}if(e.key?.length===1||e.key==="Backspace"){let n=this.getAllOptions();if(e.metaKey||e.ctrlKey||e.altKey)return;if(!this.open){if(e.key==="Backspace")return;this.show()}e.stopPropagation(),e.preventDefault(),clearTimeout(this.typeToSelectTimeout),this.typeToSelectTimeout=window.setTimeout(()=>this.typeToSelectString="",1e3),e.key==="Backspace"?this.typeToSelectString=this.typeToSelectString.slice(0,-1):this.typeToSelectString+=e.key.toLowerCase();for(let c of n)if(c.label.toLowerCase().startsWith(this.typeToSelectString)){this.setCurrentOption(c);break}}}},this.handleDocumentMouseDown=e=>{let t=e.composedPath();this&&!t.includes(this)&&this.hide()}}static get validators(){let e=[er({validationElement:Object.assign(document.createElement("select"),{required:!0})})];return[...super.validators,...e]}get validationTarget(){return this.valueInput}set defaultValue(e){this._defaultValue=this.convertDefaultValue(e)}get defaultValue(){return this.convertDefaultValue(this._defaultValue)}rawValuesEqual(e,t){return e==null&&t==null?!0:e==null||t==null||e.length!==t.length?!1:e.every((o,i)=>o===t[i])}convertDefaultValue(e){return!(this.multiple||this.hasAttribute("multiple"))&&Array.isArray(e)&&(e=e[0]),e}set value(e){let t=this.value;e instanceof FormData&&(e=e.getAll(this.name)),e!=null&&!Array.isArray(e)&&(e=[e]);let o=this._value;this._value=e??null,this.rawValuesEqual(o,this._value)||(this.valueHasChanged=!0,this.requestUpdate("value",t))}get value(){let e=this._value??this.defaultValue??null;e!=null&&(e=Array.isArray(e)?e:[e]),this.optionValues=new Set(this.getAllOptions().filter(o=>!o.disabled).map(o=>o.value));let t=e;return e!=null&&(t=e.filter(o=>this.optionValues.has(o)),t=this.multiple?t:t[0],t=t??null),t}handleSizeChange(){He(this.localName,this.size)}connectedCallback(){super.connectedCallback(),this.processSlotChange(),this.open=!1}disconnectedCallback(){super.disconnectedCallback(),this.removeOpenListeners(),this.cachedOptions=null}updateDefaultValue(){let t=this.getAllOptions().filter(o=>o.hasAttribute("selected")||o.defaultSelected);if(t.length>0){let o=t.map(i=>i.value);this._defaultValue=this.multiple?o:o[0]}this.hasAttribute("value")&&(this._defaultValue=this.getAttribute("value")||null)}addOpenListeners(){document.addEventListener("focusin",this.handleDocumentFocusIn),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown),Gt(this),this.getRootNode()!==document&&this.getRootNode().addEventListener("focusin",this.handleDocumentFocusIn)}removeOpenListeners(){document.removeEventListener("focusin",this.handleDocumentFocusIn),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),Ft(this),this.getRootNode()!==document&&this.getRootNode().removeEventListener("focusin",this.handleDocumentFocusIn)}handleFocus(){this.displayInput.setSelectionRange(0,0)}handleLabelClick(){this.displayInput.focus()}handleComboboxClick(e){e.preventDefault()}handleComboboxMouseDown(e){let o=e.composedPath().some(i=>i instanceof Element&&i.tagName.toLowerCase()==="wa-button");this.disabled||o||(e.preventDefault(),this.displayInput.focus({preventScroll:!0}),this.open=!this.open)}handleComboboxKeyDown(e){e.stopPropagation(),this.handleDocumentKeyDown(e)}handleClearClick(e){e.stopPropagation(),this.hasInteracted=!0,this.valueHasChanged=!0,this.value!==null&&(this.displayLabel="",this.selectionOrder.clear(),this.setSelectedOptions([]),this.displayInput.focus({preventScroll:!0}),this.updateComplete.then(()=>{this.dispatchEvent(new Zo),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}))}handleClearMouseDown(e){e.stopPropagation(),e.preventDefault()}handleOptionClick(e){let o=e.target.closest("wa-option");o&&!o.disabled&&(this.hasInteracted=!0,this.valueHasChanged=!0,this.multiple?this.toggleOptionSelection(o):this.setSelectedOptions(o),this.updateComplete.then(()=>this.displayInput.focus({preventScroll:!0})),this.requestUpdate("value"),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:!0})))}handleDefaultSlotChange(){this.slotChangePending||(this.slotChangePending=!0,queueMicrotask(()=>{this.slotChangePending=!1,this.processSlotChange()}))}processSlotChange(){customElements.get("wa-option")||customElements.whenDefined("wa-option").then(()=>this.handleDefaultSlotChange()),this.cachedOptions=null;let e=this.getAllOptions();this.updateDefaultValue();let t=this.value;if(t==null||!this.valueHasChanged&&!this.hasInteracted){this.selectionChanged();return}Array.isArray(t)||(t=[t]);let o=e.filter(i=>t.includes(i.value));this.setSelectedOptions(o)}handleTagRemove(e,t){if(e.stopPropagation(),this.disabled)return;this.hasInteracted=!0,this.valueHasChanged=!0;let o=t;if(!o){let i=e.target.closest("wa-tag[data-value]");if(i){let n=i.dataset.value;o=this.selectedOptions.find(c=>c.value===n)}}o&&(this.toggleOptionSelection(o,!1),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}))}getAllOptions(){return this.cachedOptions?this.cachedOptions:this?.querySelectorAll?(this.cachedOptions=[...this.querySelectorAll("wa-option")],this.cachedOptions):[]}getFirstOption(){return this.querySelector("wa-option")}setCurrentOption(e){this.getAllOptions().forEach(o=>{o.current=!1,o.tabIndex=-1}),e&&(this.currentOption=e,e.current=!0,e.tabIndex=0,e.focus({preventScroll:!0}))}setSelectedOptions(e){let t=this.getAllOptions(),o=Array.isArray(e)?e:[e];t.forEach(i=>{o.includes(i)||(i.selected=!1)}),o.length&&o.forEach(i=>i.selected=!0),this.selectionChanged()}toggleOptionSelection(e,t){t===!0||t===!1?e.selected=t:e.selected=!e.selected,this.selectionChanged()}selectionChanged(){let t=this.getAllOptions().filter(d=>{if(!this.hasInteracted&&!this.valueHasChanged){let m=this.defaultValue,v=Array.isArray(m)?m:[m];return d.hasAttribute("selected")||d.defaultSelected||d.selected||v?.includes(d.value)}return d.selected}),o=new Set(t.map(d=>d.value));for(let d of this.selectionOrder.keys())o.has(d)||this.selectionOrder.delete(d);let n=(this.selectionOrder.size>0?Math.max(...this.selectionOrder.values()):-1)+1;for(let d of t)this.selectionOrder.has(d.value)||this.selectionOrder.set(d.value,n++);this.selectedOptions=t.sort((d,m)=>{let v=this.selectionOrder.get(d.value)??0,y=this.selectionOrder.get(m.value)??0;return v-y});let c=new Set(this.selectedOptions.map(d=>d.value));if(c.size>0||this._value){let d=this._value;if(this._value==null){let m=this.defaultValue??[];this._value=Array.isArray(m)?m:[m]}this._value=this._value?.filter(m=>!this.optionValues?.has(m))??null,this._value?.unshift(...c),this.requestUpdate("value",d)}if(this.multiple)this.placeholder&&!this.value?.length?this.displayLabel="":this.displayLabel=this.localize.term("numOptionsSelected",this.selectedOptions.length);else{let d=this.selectedOptions[0];this.displayLabel=d?.label??""}this.updateComplete.then(()=>{this.updateValidity()})}get tags(){return this.selectedOptions.map((e,t)=>{if(t<this.maxOptionsVisible||this.maxOptionsVisible<=0){let o=this.getTag(e,t);return o?typeof o=="string"?ba(o):o:null}else if(t===this.maxOptionsVisible)return O`
          <wa-tag
            part="tag"
            exportparts="
              base:tag__base,
              content:tag__content,
              remove-button:tag__remove-button,
              remove-button__base:tag__remove-button__base
            "
            >+${this.selectedOptions.length-t}</wa-tag
          >
        `;return null})}updated(e){super.updated(e),(e.has("value")||e.has("displayLabel"))&&this.customStates.set("blank",!this.value&&!this.displayLabel)}handleDisabledChange(){this.disabled&&this.open&&(this.open=!1)}handleValueChange(){let e=this.getAllOptions(),t=Array.isArray(this.value)?this.value:[this.value],o=e.filter(i=>t.includes(i.value));this.setSelectedOptions(o),this.updateValidity()}async handleOpenChange(){if(this.open&&!this.disabled){this.setCurrentOption(this.selectedOptions[0]||this.getFirstOption());let e=new Xt;if(this.dispatchEvent(e),e.defaultPrevented){this.open=!1;return}this.addOpenListeners(),this.listbox.hidden=!1,this.popup.active=!0,requestAnimationFrame(()=>{this.setCurrentOption(this.currentOption)}),await Ge(this.popup.popup,"show"),this.currentOption&&wa(this.currentOption,this.listbox,"vertical","auto"),this.dispatchEvent(new Zt)}else{let e=new Qt;if(this.dispatchEvent(e),e.defaultPrevented){this.open=!1;return}this.removeOpenListeners(),await Ge(this.popup.popup,"hide"),this.listbox.hidden=!0,this.popup.active=!1,this.dispatchEvent(new Jt)}}async show(){if(this.open||this.disabled){this.open=!1;return}return this.open=!0,eo(this,"wa-after-show")}async hide(){if(!this.open||this.disabled){this.open=!1;return}return this.open=!1,eo(this,"wa-after-hide")}focus(e){this.displayInput.focus(e)}blur(){this.displayInput.blur()}formResetCallback(){this.selectionOrder.clear(),this.value=this.defaultValue,super.formResetCallback(),this.handleValueChange(),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}render(){let e=this.hasUpdated?this.hasSlotController.test("label"):this.withLabel,t=this.hasUpdated?this.hasSlotController.test("hint"):this.withHint,o=this.label?!0:!!e,i=this.hint?!0:!!t,n=(this.hasUpdated||!1)&&this.withClear&&!this.disabled&&(this.displayLabel||this.value&&this.value.length>0);return O`
      <div
        part="form-control"
        class=${we({"form-control":!0,"form-control-has-label":o})}
      >
        <label
          id="label"
          part="form-control-label label"
          class=${we({label:!0,"has-label":o})}
          aria-hidden=${o?"false":"true"}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <wa-popup
            class=${we({select:!0,open:this.open,disabled:this.disabled,enabled:!this.disabled,multiple:this.multiple})}
            placement=${this.placement}
            flip
            shift
            sync="width"
            auto-size="vertical"
            auto-size-padding="10"
          >
            <div
              part="combobox"
              class="combobox"
              slot="anchor"
              @keydown=${this.handleComboboxKeyDown}
              @mousedown=${this.handleComboboxMouseDown}
              @click=${this.handleComboboxClick}
            >
              <slot part="start" name="start" class="start"></slot>

              <input
                part="display-input"
                class="display-input"
                type="text"
                placeholder=${this.placeholder}
                .disabled=${this.disabled}
                .value=${this.displayLabel}
                ?required=${this.required}
                autocomplete="off"
                spellcheck="false"
                autocapitalize="off"
                readonly
                aria-invalid=${!this.validity.valid}
                aria-controls="listbox"
                aria-expanded=${this.open?"true":"false"}
                aria-haspopup="listbox"
                aria-labelledby="label"
                aria-disabled=${this.disabled?"true":"false"}
                aria-describedby="hint"
                role="combobox"
                tabindex="0"
                @focus=${this.handleFocus}
              />

              <!-- Tags need to wait for first hydration before populating otherwise it will create a hydration mismatch. -->
              ${this.multiple&&this.hasUpdated?O`<div part="tags" class="tags" @wa-remove=${this.handleTagRemove}>${this.tags}</div>`:""}

              <input
                class="value-input"
                type="text"
                ?disabled=${this.disabled}
                ?required=${this.required}
                .value=${Array.isArray(this.value)?this.value.join(", "):this.value}
                tabindex="-1"
                aria-hidden="true"
                @focus=${()=>this.focus()}
              />

              ${n?O`
                    <button
                      part="clear-button"
                      type="button"
                      aria-label=${this.localize.term("clearEntry")}
                      @mousedown=${this.handleClearMouseDown}
                      @click=${this.handleClearClick}
                      tabindex="-1"
                    >
                      <slot name="clear-icon">
                        <wa-icon name="circle-xmark" library="system" variant="regular"></wa-icon>
                      </slot>
                    </button>
                  `:""}

              <slot name="end" part="end" class="end"></slot>

              <slot name="expand-icon" part="expand-icon" class="expand-icon">
                <wa-icon library="system" name="chevron-down" variant="solid"></wa-icon>
              </slot>
            </div>

            <div
              id="listbox"
              role="listbox"
              aria-expanded=${this.open?"true":"false"}
              aria-multiselectable=${this.multiple?"true":"false"}
              aria-labelledby="label"
              part="listbox"
              class="listbox"
              tabindex="-1"
              @mouseup=${this.handleOptionClick}
            >
              <slot @slotchange=${this.handleDefaultSlotChange}></slot>
            </div>
          </wa-popup>
        </div>

        <slot
          id="hint"
          name="hint"
          part="hint"
          class=${we({"has-slotted":i})}
          aria-hidden=${i?"false":"true"}
          >${this.hint}</slot
        >
      </div>
    `}};H.css=[va,to,Ue];h([se(".select")],H.prototype,"popup",2);h([se(".combobox")],H.prototype,"combobox",2);h([se(".display-input")],H.prototype,"displayInput",2);h([se(".value-input")],H.prototype,"valueInput",2);h([se(".listbox")],H.prototype,"listbox",2);h([ze()],H.prototype,"displayLabel",2);h([ze()],H.prototype,"currentOption",2);h([ze()],H.prototype,"selectedOptions",2);h([w({reflect:!0})],H.prototype,"name",2);h([w({attribute:!1})],H.prototype,"defaultValue",1);h([w({attribute:"value",reflect:!1})],H.prototype,"value",1);h([w({reflect:!0})],H.prototype,"size",2);h([W("size")],H.prototype,"handleSizeChange",1);h([w()],H.prototype,"placeholder",2);h([w({type:Boolean,reflect:!0})],H.prototype,"multiple",2);h([w({attribute:"max-options-visible",type:Number})],H.prototype,"maxOptionsVisible",2);h([w({type:Boolean})],H.prototype,"disabled",2);h([w({attribute:"with-clear",type:Boolean})],H.prototype,"withClear",2);h([w({type:Boolean,reflect:!0})],H.prototype,"open",2);h([w({reflect:!0})],H.prototype,"appearance",2);h([w({type:Boolean,reflect:!0})],H.prototype,"pill",2);h([w()],H.prototype,"label",2);h([w({reflect:!0})],H.prototype,"placement",2);h([w({attribute:"hint"})],H.prototype,"hint",2);h([w({attribute:"with-label",type:Boolean})],H.prototype,"withLabel",2);h([w({attribute:"with-hint",type:Boolean})],H.prototype,"withHint",2);h([w({type:Boolean,reflect:!0})],H.prototype,"required",2);h([w({attribute:!1})],H.prototype,"getTag",2);h([W("disabled",{waitUntilFirstUpdate:!0})],H.prototype,"handleDisabledChange",1);h([W("value",{waitUntilFirstUpdate:!0})],H.prototype,"handleValueChange",1);h([W("open",{waitUntilFirstUpdate:!0})],H.prototype,"handleOpenChange",1);H=h([ie("wa-select")],H);H.disableWarning?.("change-in-update");var ya=class extends Event{constructor(){super("wa-remove",{bubbles:!0,cancelable:!1,composed:!0})}};var xa=j`
  @layer wa-component {
    :host {
      display: inline-flex;
      gap: 0.5em;
      border-radius: var(--wa-border-radius-m);
      align-items: center;
      background-color: var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet));
      border-color: var(--wa-color-border-normal, var(--wa-color-neutral-border-normal));
      border-style: var(--wa-border-style);
      border-width: var(--wa-border-width-s);
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      font-size: inherit;
      line-height: 1;
      white-space: nowrap;
      user-select: none;
      -webkit-user-select: none;
      height: calc(var(--wa-form-control-height) * 0.8);
      line-height: calc(var(--wa-form-control-height) - var(--wa-form-control-border-width) * 2);
      padding: 0 0.75em;
    }

    /* Appearance modifiers */
    :host([appearance='outlined']) {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: transparent;
      border-color: var(--wa-color-border-loud, var(--wa-color-neutral-border-loud));
    }

    :host([appearance='filled']) {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet));
      border-color: transparent;
    }

    :host([appearance='filled-outlined']) {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet));
      border-color: var(--wa-color-border-normal, var(--wa-color-neutral-border-normal));
    }

    :host([appearance='accent']) {
      color: var(--wa-color-on-loud, var(--wa-color-neutral-on-loud));
      background-color: var(--wa-color-fill-loud, var(--wa-color-neutral-fill-loud));
      border-color: transparent;
    }
  }

  .content {
    font-size: var(--wa-font-size-smaller);
  }

  [part='remove-button'] {
    line-height: 1;
  }

  [part='remove-button']::part(base) {
    padding: 0;
    height: 1em;
    width: 1em;
    color: currentColor;
  }

  @media (hover: hover) {
    :host(:hover) > [part='remove-button']::part(base) {
      background-color: transparent;
      color: color-mix(in oklab, currentColor, var(--wa-color-mix-hover));
    }
  }

  :host(:active) > [part='remove-button']::part(base) {
    background-color: transparent;
    color: color-mix(in oklab, currentColor, var(--wa-color-mix-active));
  }

  /*
   * Pill modifier
   */
  :host([pill]) {
    border-radius: var(--wa-border-radius-pill);
  }
`;var ht=class extends ce{constructor(){super(...arguments),this.localize=new Se(this),this.variant="neutral",this.appearance="filled-outlined",this.size="m",this.pill=!1,this.withRemove=!1}handleSizeChange(){He(this.localName,this.size)}handleRemoveClick(){this.dispatchEvent(new ya)}render(){return O`
      <slot part="content" class="content"></slot>

      ${this.withRemove?O`
            <wa-button
              part="remove-button"
              exportparts="base:remove-button__base"
              class="remove"
              appearance="plain"
              @click=${this.handleRemoveClick}
              tabindex="-1"
            >
              <wa-icon name="xmark" library="system" variant="solid" label=${this.localize.term("remove")}></wa-icon>
            </wa-button>
          `:""}
    `}};ht.css=[xa,Wt,Ue];h([w({reflect:!0})],ht.prototype,"variant",2);h([w({reflect:!0})],ht.prototype,"appearance",2);h([w({reflect:!0})],ht.prototype,"size",2);h([W("size")],ht.prototype,"handleSizeChange",1);h([w({type:Boolean,reflect:!0})],ht.prototype,"pill",2);h([w({attribute:"with-remove",type:Boolean})],ht.prototype,"withRemove",2);ht=h([ie("wa-tag")],ht);var Ca=j`
  :host {
    display: block;
    color: var(--wa-color-text-normal);
    -webkit-user-select: none;
    user-select: none;

    position: relative;
    display: flex;
    align-items: center;
    font: inherit;
    padding: 0.5em 1em 0.5em 0.25em;
    line-height: var(--wa-line-height-condensed);
    transition: fill var(--wa-transition-normal) var(--wa-transition-easing);
    cursor: pointer;
  }

  :host(:focus) {
    outline: none;
  }

  @media (hover: hover) {
    :host(:not(:state(disabled), :state(current)):is(:state(hover), :hover)) {
      background-color: var(--wa-color-neutral-fill-normal);
      color: var(--wa-color-neutral-on-normal);
    }
  }

  :host(:state(current)),
  :host(:state(disabled):state(current)) {
    background-color: var(--wa-color-brand-fill-loud);
    color: var(--wa-color-brand-on-loud);
    opacity: 1;
  }

  :host(:state(disabled)) {
    outline: none;
    opacity: 0.5;
    cursor: not-allowed;
  }

  .label {
    flex: 1 1 auto;
    display: inline-block;
  }

  .check {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--wa-font-size-smaller);
    visibility: hidden;
    width: 2em;
  }

  :host(:state(selected)) .check {
    visibility: visible;
  }

  .start,
  .end {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .start::slotted(*) {
    margin-inline-end: 0.5em;
  }

  .end::slotted(*) {
    margin-inline-start: 0.5em;
  }

  @media (forced-colors: active) {
    :host(:hover:not([aria-disabled='true'])) {
      outline: dashed 1px SelectedItem;
      outline-offset: -1px;
    }
  }
`;function wo(e,t=0){if(!e||!globalThis.Node)return"";if(typeof e[Symbol.iterator]=="function")return(Array.isArray(e)?e:[...e]).map(n=>wo(n,--t)).join("");let o=e;if(o.nodeType===Node.TEXT_NODE)return o.textContent??"";if(o.nodeType===Node.ELEMENT_NODE){let i=o;if(i.hasAttribute("slot")||i.matches("style, script"))return"";if(i instanceof HTMLSlotElement){let n=i.assignedNodes({flatten:!0});if(n.length>0)return wo(n,--t)}return t>-1?wo(i,--t):i.textContent??""}return o.hasChildNodes()?wo(o.childNodes,--t):""}var Xe=class extends ce{constructor(){super(...arguments),this.localize=new Se(this),this.cachedDefaultLabel="",this.isInitialized=!1,this.isDefaultLabelDirty=!0,this.current=!1,this.value="",this.disabled=!1,this.selected=!1,this.defaultSelected=!1,this._label="",this.handleHover=e=>{e.type==="mouseenter"?this.customStates.set("hover",!0):e.type==="mouseleave"&&this.customStates.set("hover",!1)}}set label(e){let t=this._label;this._label=e||"",this._label!==t&&this.requestUpdate("label",t)}get label(){return this._label?this._label:this.defaultLabel}get defaultLabel(){return(this.isDefaultLabelDirty||!this.cachedDefaultLabel)&&this.updateDefaultLabel(),this.cachedDefaultLabel}connectedCallback(){super.connectedCallback(),this.setAttribute("role","option"),this.setAttribute("aria-selected","false"),this.addEventListener("mouseenter",this.handleHover),this.addEventListener("mouseleave",this.handleHover)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("mouseenter",this.handleHover),this.removeEventListener("mouseleave",this.handleHover)}handleDefaultSlotChange(){this.isDefaultLabelDirty=!0,this.isInitialized?(customElements.whenDefined("wa-select").then(()=>{let e=this.closest("wa-select");e&&e.handleDefaultSlotChange()}),customElements.whenDefined("wa-combobox").then(()=>{let e=this.closest("wa-combobox");e&&e.handleDefaultSlotChange()})):this.isInitialized=!0}willUpdate(e){if(e.has("defaultSelected")&&!this.closest("wa-combobox, wa-select")?.hasInteracted&&this.defaultSelected){let t=this.selected;this.selected=this.defaultSelected,this.requestUpdate("selected",t)}super.willUpdate(e)}updated(e){super.updated(e),e.has("disabled")&&(this.setAttribute("aria-disabled",this.disabled?"true":"false"),this.customStates.set("disabled",this.disabled)),e.has("selected")&&(this.setAttribute("aria-selected",this.selected?"true":"false"),this.customStates.set("selected",this.selected)),e.has("value")&&(typeof this.value!="string"&&(this.value=String(this.value)),this.handleDefaultSlotChange()),e.has("current")&&this.customStates.set("current",this.current)}firstUpdated(e){if(super.firstUpdated(e),this.selected&&!this.defaultSelected){let t=this.closest("wa-select, wa-combobox");t&&!t.hasInteracted&&t.selectionChanged?.()}}updateDefaultLabel(){let e=this.cachedDefaultLabel;this.cachedDefaultLabel=wo(this).trim(),this.isDefaultLabelDirty=!1;let t=this.cachedDefaultLabel!==e;return!this._label&&t&&this.requestUpdate("label",e),t}render(){return O`
      ${this.selected?O`<wa-icon
            part="checked-icon"
            class="check"
            name="check"
            library="system"
            variant="solid"
            aria-hidden="true"
          ></wa-icon>`:O`<span part="checked-icon" class="check" aria-hidden="true"></span>`}
      <slot part="start" name="start" class="start"></slot>
      <slot part="label" class="label" @slotchange=${this.handleDefaultSlotChange}></slot>
      <slot part="end" name="end" class="end"></slot>
    `}};Xe.css=Ca;h([se(".label")],Xe.prototype,"defaultSlot",2);h([ze()],Xe.prototype,"current",2);h([w({reflect:!0})],Xe.prototype,"value",2);h([w({type:Boolean})],Xe.prototype,"disabled",2);h([w({type:Boolean,attribute:!1})],Xe.prototype,"selected",2);h([w({type:Boolean,attribute:"selected"})],Xe.prototype,"defaultSelected",2);h([w()],Xe.prototype,"label",1);Xe=h([ie("wa-option")],Xe);var ka=class extends Event{constructor(){super("wa-reposition",{bubbles:!0,cancelable:!1,composed:!0})}};var _a=j`
  :host {
    --arrow-color: black;
    --arrow-size: var(--wa-tooltip-arrow-size);
    --popup-border-width: 0px;
    --show-duration: 100ms;
    --hide-duration: 100ms;

    /*
     * These properties are computed to account for the arrow's dimensions after being rotated 45º. The constant
     * 0.7071 is derived from sin(45) to calculate the length of the arrow after rotation.
     *
     * The diamond will be translated inward by --arrow-base-offset, the border thickness, to centralise it on
     * the inner edge of the popup border. This also means we need to increase the size of the arrow by the
     * same amount to compensate.
     *
     * A diamond shaped clipping mask is used to avoid overlap of popup content. This extends slightly inward so
     * the popup border is covered with no sub-pixel rounding artifacts. The diamond corners are mitred at 22.5º
     * to properly merge any arrow border with the popup border. The constant 1.4142 is derived from 1 + tan(22.5).
     *
     */
    --arrow-base-offset: var(--popup-border-width);
    --arrow-size-diagonal: calc((var(--arrow-size) + var(--arrow-base-offset)) * 0.7071);
    --arrow-padding-offset: calc(var(--arrow-size-diagonal) - var(--arrow-size));
    --arrow-size-div: calc(var(--arrow-size-diagonal) * 2);
    --arrow-clipping-corner: calc(var(--arrow-base-offset) * 1.4142);

    display: contents;
  }

  .popup {
    position: absolute;
    isolation: isolate;
    max-width: var(--auto-size-available-width, none);
    max-height: var(--auto-size-available-height, none);

    /* Clear UA styles for [popover] */
    :where(&) {
      inset: unset;
      padding: unset;
      margin: unset;
      width: unset;
      height: unset;
      color: unset;
      background: unset;
      border: unset;
      overflow: unset;
    }
  }

  .popup-fixed {
    position: fixed;
  }

  .popup:not(.popup-active) {
    display: none;
  }

  .arrow {
    position: absolute;
    width: var(--arrow-size-div);
    height: var(--arrow-size-div);
    background: var(--arrow-color);
    z-index: 3;
    clip-path: polygon(
      var(--arrow-clipping-corner) 100%,
      var(--arrow-base-offset) calc(100% - var(--arrow-base-offset)),
      calc(var(--arrow-base-offset) - 2px) calc(100% - var(--arrow-base-offset)),
      calc(100% - var(--arrow-base-offset)) calc(var(--arrow-base-offset) - 2px),
      calc(100% - var(--arrow-base-offset)) var(--arrow-base-offset),
      100% var(--arrow-clipping-corner),
      100% 100%
    );
    rotate: 45deg;
  }

  :host([data-current-placement|='left']) .arrow {
    rotate: -45deg;
  }

  :host([data-current-placement|='right']) .arrow {
    rotate: 135deg;
  }

  :host([data-current-placement|='bottom']) .arrow {
    rotate: 225deg;
  }

  /* Hover bridge */
  .popup-hover-bridge:not(.popup-hover-bridge-visible) {
    display: none;
  }

  .popup-hover-bridge {
    position: fixed;
    z-index: 899;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    clip-path: polygon(
      var(--hover-bridge-top-left-x, 0) var(--hover-bridge-top-left-y, 0),
      var(--hover-bridge-top-right-x, 0) var(--hover-bridge-top-right-y, 0),
      var(--hover-bridge-bottom-right-x, 0) var(--hover-bridge-bottom-right-y, 0),
      var(--hover-bridge-bottom-left-x, 0) var(--hover-bridge-bottom-left-y, 0)
    );
  }

  /* Built-in animations */
  .show {
    animation: show var(--show-duration) ease;
  }

  .hide {
    animation: show var(--hide-duration) ease reverse;
  }

  @keyframes show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .show-with-scale {
    animation: show-with-scale var(--show-duration) ease;
  }

  .hide-with-scale {
    animation: show-with-scale var(--hide-duration) ease reverse;
  }

  @keyframes show-with-scale {
    from {
      opacity: 0;
      scale: 0.8;
    }
    to {
      opacity: 1;
      scale: 1;
    }
  }
`;var it=Math.min,Ie=Math.max,yo=Math.round,xo=Math.floor,Qe=e=>({x:e,y:e}),Xs={left:"right",right:"left",bottom:"top",top:"bottom"};function or(e,t,o){return Ie(e,it(t,o))}function Bt(e,t){return typeof e=="function"?e(t):e}function ft(e){return e.split("-")[0]}function Rt(e){return e.split("-")[1]}function Ur(e){return e==="x"?"y":"x"}function rr(e){return e==="y"?"height":"width"}function at(e){let t=e[0];return t==="t"||t==="b"?"y":"x"}function ir(e){return Ur(at(e))}function Ea(e,t,o){o===void 0&&(o=!1);let i=Rt(e),n=ir(e),c=rr(n),d=n==="x"?i===(o?"end":"start")?"right":"left":i==="start"?"bottom":"top";return t.reference[c]>t.floating[c]&&(d=bo(d)),[d,bo(d)]}function Aa(e){let t=bo(e);return[tr(e),t,tr(t)]}function tr(e){return e.includes("start")?e.replace("start","end"):e.replace("end","start")}var La=["left","right"],Sa=["right","left"],Qs=["top","bottom"],Js=["bottom","top"];function Zs(e,t,o){switch(e){case"top":case"bottom":return o?t?Sa:La:t?La:Sa;case"left":case"right":return t?Qs:Js;default:return[]}}function $a(e,t,o,i){let n=Rt(e),c=Zs(ft(e),o==="start",i);return n&&(c=c.map(d=>d+"-"+n),t&&(c=c.concat(c.map(tr)))),c}function bo(e){let t=ft(e);return Xs[t]+e.slice(t.length)}function el(e){return{top:0,right:0,bottom:0,left:0,...e}}function jr(e){return typeof e!="number"?el(e):{top:e,right:e,bottom:e,left:e}}function Pt(e){let{x:t,y:o,width:i,height:n}=e;return{width:i,height:n,top:o,left:t,right:t+i,bottom:o+n,x:t,y:o}}function Oa(e,t,o){let{reference:i,floating:n}=e,c=at(t),d=ir(t),m=rr(d),v=ft(t),y=c==="y",C=i.x+i.width/2-n.width/2,b=i.y+i.height/2-n.height/2,S=i[m]/2-n[m]/2,k;switch(v){case"top":k={x:C,y:i.y-n.height};break;case"bottom":k={x:C,y:i.y+i.height};break;case"right":k={x:i.x+i.width,y:b};break;case"left":k={x:i.x-n.width,y:b};break;default:k={x:i.x,y:i.y}}switch(Rt(t)){case"start":k[d]-=S*(o&&y?-1:1);break;case"end":k[d]+=S*(o&&y?-1:1);break}return k}async function za(e,t){var o;t===void 0&&(t={});let{x:i,y:n,platform:c,rects:d,elements:m,strategy:v}=e,{boundary:y="clippingAncestors",rootBoundary:C="viewport",elementContext:b="floating",altBoundary:S=!1,padding:k=0}=Bt(t,e),$=jr(k),D=m[S?b==="floating"?"reference":"floating":b],B=Pt(await c.getClippingRect({element:(o=await(c.isElement==null?void 0:c.isElement(D)))==null||o?D:D.contextElement||await(c.getDocumentElement==null?void 0:c.getDocumentElement(m.floating)),boundary:y,rootBoundary:C,strategy:v})),Y=b==="floating"?{x:i,y:n,width:d.floating.width,height:d.floating.height}:d.reference,G=await(c.getOffsetParent==null?void 0:c.getOffsetParent(m.floating)),oe=await(c.isElement==null?void 0:c.isElement(G))?await(c.getScale==null?void 0:c.getScale(G))||{x:1,y:1}:{x:1,y:1},he=Pt(c.convertOffsetParentRelativeRectToViewportRelativeRect?await c.convertOffsetParentRelativeRectToViewportRelativeRect({elements:m,rect:Y,offsetParent:G,strategy:v}):Y);return{top:(B.top-he.top+$.top)/oe.y,bottom:(he.bottom-B.bottom+$.bottom)/oe.y,left:(B.left-he.left+$.left)/oe.x,right:(he.right-B.right+$.right)/oe.x}}var tl=50,Ia=async(e,t,o)=>{let{placement:i="bottom",strategy:n="absolute",middleware:c=[],platform:d}=o,m=d.detectOverflow?d:{...d,detectOverflow:za},v=await(d.isRTL==null?void 0:d.isRTL(t)),y=await d.getElementRects({reference:e,floating:t,strategy:n}),{x:C,y:b}=Oa(y,i,v),S=i,k=0,$={};for(let I=0;I<c.length;I++){let D=c[I];if(!D)continue;let{name:B,fn:Y}=D,{x:G,y:oe,data:he,reset:fe}=await Y({x:C,y:b,initialPlacement:i,placement:S,strategy:n,middlewareData:$,rects:y,platform:m,elements:{reference:e,floating:t}});C=G??C,b=oe??b,$[B]={...$[B],...he},fe&&k<tl&&(k++,typeof fe=="object"&&(fe.placement&&(S=fe.placement),fe.rects&&(y=fe.rects===!0?await d.getElementRects({reference:e,floating:t,strategy:n}):fe.rects),{x:C,y:b}=Oa(y,S,v)),I=-1)}return{x:C,y:b,placement:S,strategy:n,middlewareData:$}},Ta=e=>({name:"arrow",options:e,async fn(t){let{x:o,y:i,placement:n,rects:c,platform:d,elements:m,middlewareData:v}=t,{element:y,padding:C=0}=Bt(e,t)||{};if(y==null)return{};let b=jr(C),S={x:o,y:i},k=ir(n),$=rr(k),I=await d.getDimensions(y),D=k==="y",B=D?"top":"left",Y=D?"bottom":"right",G=D?"clientHeight":"clientWidth",oe=c.reference[$]+c.reference[k]-S[k]-c.floating[$],he=S[k]-c.reference[k],fe=await(d.getOffsetParent==null?void 0:d.getOffsetParent(y)),be=fe?fe[G]:0;(!be||!await(d.isElement==null?void 0:d.isElement(fe)))&&(be=m.floating[G]||c.floating[$]);let Ye=oe/2-he/2,qe=be/2-I[$]/2-1,Te=it(b[B],qe),et=it(b[Y],qe),Be=Te,tt=be-I[$]-et,ge=be/2-I[$]/2+Ye,ct=or(Be,ge,tt),Ke=!v.arrow&&Rt(n)!=null&&ge!==ct&&c.reference[$]/2-(ge<Be?Te:et)-I[$]/2<0,Re=Ke?ge<Be?ge-Be:ge-tt:0;return{[k]:S[k]+Re,data:{[k]:ct,centerOffset:ge-ct-Re,...Ke&&{alignmentOffset:Re}},reset:Ke}}});var Fa=function(e){return e===void 0&&(e={}),{name:"flip",options:e,async fn(t){var o,i;let{placement:n,middlewareData:c,rects:d,initialPlacement:m,platform:v,elements:y}=t,{mainAxis:C=!0,crossAxis:b=!0,fallbackPlacements:S,fallbackStrategy:k="bestFit",fallbackAxisSideDirection:$="none",flipAlignment:I=!0,...D}=Bt(e,t);if((o=c.arrow)!=null&&o.alignmentOffset)return{};let B=ft(n),Y=at(m),G=ft(m)===m,oe=await(v.isRTL==null?void 0:v.isRTL(y.floating)),he=S||(G||!I?[bo(m)]:Aa(m)),fe=$!=="none";!S&&fe&&he.push(...$a(m,I,$,oe));let be=[m,...he],Ye=await v.detectOverflow(t,D),qe=[],Te=((i=c.flip)==null?void 0:i.overflows)||[];if(C&&qe.push(Ye[B]),b){let ge=Ea(n,d,oe);qe.push(Ye[ge[0]],Ye[ge[1]])}if(Te=[...Te,{placement:n,overflows:qe}],!qe.every(ge=>ge<=0)){var et,Be;let ge=(((et=c.flip)==null?void 0:et.index)||0)+1,ct=be[ge];if(ct&&(!(b==="alignment"?Y!==at(ct):!1)||Te.every(Ee=>at(Ee.placement)===Y?Ee.overflows[0]>0:!0)))return{data:{index:ge,overflows:Te},reset:{placement:ct}};let Ke=(Be=Te.filter(Re=>Re.overflows[0]<=0).sort((Re,Ee)=>Re.overflows[1]-Ee.overflows[1])[0])==null?void 0:Be.placement;if(!Ke)switch(k){case"bestFit":{var tt;let Re=(tt=Te.filter(Ee=>{if(fe){let Ve=at(Ee.placement);return Ve===Y||Ve==="y"}return!0}).map(Ee=>[Ee.placement,Ee.overflows.filter(Ve=>Ve>0).reduce((Ve,Ht)=>Ve+Ht,0)]).sort((Ee,Ve)=>Ee[1]-Ve[1])[0])==null?void 0:tt[0];Re&&(Ke=Re);break}case"initialPlacement":Ke=m;break}if(n!==Ke)return{reset:{placement:Ke}}}return{}}}};var ol=new Set(["left","top"]);async function rl(e,t){let{placement:o,platform:i,elements:n}=e,c=await(i.isRTL==null?void 0:i.isRTL(n.floating)),d=ft(o),m=Rt(o),v=at(o)==="y",y=ol.has(d)?-1:1,C=c&&v?-1:1,b=Bt(t,e),{mainAxis:S,crossAxis:k,alignmentAxis:$}=typeof b=="number"?{mainAxis:b,crossAxis:0,alignmentAxis:null}:{mainAxis:b.mainAxis||0,crossAxis:b.crossAxis||0,alignmentAxis:b.alignmentAxis};return m&&typeof $=="number"&&(k=m==="end"?$*-1:$),v?{x:k*C,y:S*y}:{x:S*y,y:k*C}}var Ma=function(e){return e===void 0&&(e=0),{name:"offset",options:e,async fn(t){var o,i;let{x:n,y:c,placement:d,middlewareData:m}=t,v=await rl(t,e);return d===((o=m.offset)==null?void 0:o.placement)&&(i=m.arrow)!=null&&i.alignmentOffset?{}:{x:n+v.x,y:c+v.y,data:{...v,placement:d}}}}},Ba=function(e){return e===void 0&&(e={}),{name:"shift",options:e,async fn(t){let{x:o,y:i,placement:n,platform:c}=t,{mainAxis:d=!0,crossAxis:m=!1,limiter:v={fn:B=>{let{x:Y,y:G}=B;return{x:Y,y:G}}},...y}=Bt(e,t),C={x:o,y:i},b=await c.detectOverflow(t,y),S=at(ft(n)),k=Ur(S),$=C[k],I=C[S];if(d){let B=k==="y"?"top":"left",Y=k==="y"?"bottom":"right",G=$+b[B],oe=$-b[Y];$=or(G,$,oe)}if(m){let B=S==="y"?"top":"left",Y=S==="y"?"bottom":"right",G=I+b[B],oe=I-b[Y];I=or(G,I,oe)}let D=v.fn({...t,[k]:$,[S]:I});return{...D,data:{x:D.x-o,y:D.y-i,enabled:{[k]:d,[S]:m}}}}}};var Ra=function(e){return e===void 0&&(e={}),{name:"size",options:e,async fn(t){var o,i;let{placement:n,rects:c,platform:d,elements:m}=t,{apply:v=()=>{},...y}=Bt(e,t),C=await d.detectOverflow(t,y),b=ft(n),S=Rt(n),k=at(n)==="y",{width:$,height:I}=c.floating,D,B;b==="top"||b==="bottom"?(D=b,B=S===(await(d.isRTL==null?void 0:d.isRTL(m.floating))?"start":"end")?"left":"right"):(B=b,D=S==="end"?"top":"bottom");let Y=I-C.top-C.bottom,G=$-C.left-C.right,oe=it(I-C[D],Y),he=it($-C[B],G),fe=!t.middlewareData.shift,be=oe,Ye=he;if((o=t.middlewareData.shift)!=null&&o.enabled.x&&(Ye=G),(i=t.middlewareData.shift)!=null&&i.enabled.y&&(be=Y),fe&&!S){let Te=Ie(C.left,0),et=Ie(C.right,0),Be=Ie(C.top,0),tt=Ie(C.bottom,0);k?Ye=$-2*(Te!==0||et!==0?Te+et:Ie(C.left,C.right)):be=I-2*(Be!==0||tt!==0?Be+tt:Ie(C.top,C.bottom))}await v({...t,availableWidth:Ye,availableHeight:be});let qe=await d.getDimensions(m.floating);return $!==qe.width||I!==qe.height?{reset:{rects:!0}}:{}}}};function ar(){return typeof window<"u"}function Nt(e){return Da(e)?(e.nodeName||"").toLowerCase():"#document"}function Me(e){var t;return(e==null||(t=e.ownerDocument)==null?void 0:t.defaultView)||window}function Je(e){var t;return(t=(Da(e)?e.ownerDocument:e.document)||window.document)==null?void 0:t.documentElement}function Da(e){return ar()?e instanceof Node||e instanceof Me(e).Node:!1}function je(e){return ar()?e instanceof Element||e instanceof Me(e).Element:!1}function nt(e){return ar()?e instanceof HTMLElement||e instanceof Me(e).HTMLElement:!1}function Pa(e){return!ar()||typeof ShadowRoot>"u"?!1:e instanceof ShadowRoot||e instanceof Me(e).ShadowRoot}function oo(e){let{overflow:t,overflowX:o,overflowY:i,display:n}=We(e);return/auto|scroll|overlay|hidden|clip/.test(t+i+o)&&n!=="inline"&&n!=="contents"}function Na(e){return/^(table|td|th)$/.test(Nt(e))}function Co(e){try{if(e.matches(":popover-open"))return!0}catch{}try{return e.matches(":modal")}catch{return!1}}var il=/transform|translate|scale|rotate|perspective|filter/,al=/paint|layout|strict|content/,Dt=e=>!!e&&e!=="none",Wr;function ro(e){let t=je(e)?We(e):e;return Dt(t.transform)||Dt(t.translate)||Dt(t.scale)||Dt(t.rotate)||Dt(t.perspective)||!nr()&&(Dt(t.backdropFilter)||Dt(t.filter))||il.test(t.willChange||"")||al.test(t.contain||"")}function qa(e){let t=mt(e);for(;nt(t)&&!qt(t);){if(ro(t))return t;if(Co(t))return null;t=mt(t)}return null}function nr(){return Wr==null&&(Wr=typeof CSS<"u"&&CSS.supports&&CSS.supports("-webkit-backdrop-filter","none")),Wr}function qt(e){return/^(html|body|#document)$/.test(Nt(e))}function We(e){return Me(e).getComputedStyle(e)}function ko(e){return je(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:{scrollLeft:e.scrollX,scrollTop:e.scrollY}}function mt(e){if(Nt(e)==="html")return e;let t=e.assignedSlot||e.parentNode||Pa(e)&&e.host||Je(e);return Pa(t)?t.host:t}function Va(e){let t=mt(e);return qt(t)?e.ownerDocument?e.ownerDocument.body:e.body:nt(t)&&oo(t)?t:Va(t)}function gt(e,t,o){var i;t===void 0&&(t=[]),o===void 0&&(o=!0);let n=Va(e),c=n===((i=e.ownerDocument)==null?void 0:i.body),d=Me(n);if(c){let m=sr(d);return t.concat(d,d.visualViewport||[],oo(n)?n:[],m&&o?gt(m):[])}else return t.concat(n,gt(n,[],o))}function sr(e){return e.parent&&Object.getPrototypeOf(e.parent)?e.frameElement:null}function Wa(e){let t=We(e),o=parseFloat(t.width)||0,i=parseFloat(t.height)||0,n=nt(e),c=n?e.offsetWidth:o,d=n?e.offsetHeight:i,m=yo(o)!==c||yo(i)!==d;return m&&(o=c,i=d),{width:o,height:i,$:m}}function Kr(e){return je(e)?e:e.contextElement}function io(e){let t=Kr(e);if(!nt(t))return Qe(1);let o=t.getBoundingClientRect(),{width:i,height:n,$:c}=Wa(t),d=(c?yo(o.width):o.width)/i,m=(c?yo(o.height):o.height)/n;return(!d||!Number.isFinite(d))&&(d=1),(!m||!Number.isFinite(m))&&(m=1),{x:d,y:m}}var nl=Qe(0);function Ya(e){let t=Me(e);return!nr()||!t.visualViewport?nl:{x:t.visualViewport.offsetLeft,y:t.visualViewport.offsetTop}}function sl(e,t,o){return t===void 0&&(t=!1),!o||t&&o!==Me(e)?!1:t}function Vt(e,t,o,i){t===void 0&&(t=!1),o===void 0&&(o=!1);let n=e.getBoundingClientRect(),c=Kr(e),d=Qe(1);t&&(i?je(i)&&(d=io(i)):d=io(e));let m=sl(c,o,i)?Ya(c):Qe(0),v=(n.left+m.x)/d.x,y=(n.top+m.y)/d.y,C=n.width/d.x,b=n.height/d.y;if(c){let S=Me(c),k=i&&je(i)?Me(i):i,$=S,I=sr($);for(;I&&i&&k!==$;){let D=io(I),B=I.getBoundingClientRect(),Y=We(I),G=B.left+(I.clientLeft+parseFloat(Y.paddingLeft))*D.x,oe=B.top+(I.clientTop+parseFloat(Y.paddingTop))*D.y;v*=D.x,y*=D.y,C*=D.x,b*=D.y,v+=G,y+=oe,$=Me(I),I=sr($)}}return Pt({width:C,height:b,x:v,y})}function lr(e,t){let o=ko(e).scrollLeft;return t?t.left+o:Vt(Je(e)).left+o}function Ka(e,t){let o=e.getBoundingClientRect(),i=o.left+t.scrollLeft-lr(e,o),n=o.top+t.scrollTop;return{x:i,y:n}}function ll(e){let{elements:t,rect:o,offsetParent:i,strategy:n}=e,c=n==="fixed",d=Je(i),m=t?Co(t.floating):!1;if(i===d||m&&c)return o;let v={scrollLeft:0,scrollTop:0},y=Qe(1),C=Qe(0),b=nt(i);if((b||!b&&!c)&&((Nt(i)!=="body"||oo(d))&&(v=ko(i)),b)){let k=Vt(i);y=io(i),C.x=k.x+i.clientLeft,C.y=k.y+i.clientTop}let S=d&&!b&&!c?Ka(d,v):Qe(0);return{width:o.width*y.x,height:o.height*y.y,x:o.x*y.x-v.scrollLeft*y.x+C.x+S.x,y:o.y*y.y-v.scrollTop*y.y+C.y+S.y}}function cl(e){return Array.from(e.getClientRects())}function dl(e){let t=Je(e),o=ko(e),i=e.ownerDocument.body,n=Ie(t.scrollWidth,t.clientWidth,i.scrollWidth,i.clientWidth),c=Ie(t.scrollHeight,t.clientHeight,i.scrollHeight,i.clientHeight),d=-o.scrollLeft+lr(e),m=-o.scrollTop;return We(i).direction==="rtl"&&(d+=Ie(t.clientWidth,i.clientWidth)-n),{width:n,height:c,x:d,y:m}}var Ha=25;function ul(e,t){let o=Me(e),i=Je(e),n=o.visualViewport,c=i.clientWidth,d=i.clientHeight,m=0,v=0;if(n){c=n.width,d=n.height;let C=nr();(!C||C&&t==="fixed")&&(m=n.offsetLeft,v=n.offsetTop)}let y=lr(i);if(y<=0){let C=i.ownerDocument,b=C.body,S=getComputedStyle(b),k=C.compatMode==="CSS1Compat"&&parseFloat(S.marginLeft)+parseFloat(S.marginRight)||0,$=Math.abs(i.clientWidth-b.clientWidth-k);$<=Ha&&(c-=$)}else y<=Ha&&(c+=y);return{width:c,height:d,x:m,y:v}}function pl(e,t){let o=Vt(e,!0,t==="fixed"),i=o.top+e.clientTop,n=o.left+e.clientLeft,c=nt(e)?io(e):Qe(1),d=e.clientWidth*c.x,m=e.clientHeight*c.y,v=n*c.x,y=i*c.y;return{width:d,height:m,x:v,y}}function Ua(e,t,o){let i;if(t==="viewport")i=ul(e,o);else if(t==="document")i=dl(Je(e));else if(je(t))i=pl(t,o);else{let n=Ya(e);i={x:t.x-n.x,y:t.y-n.y,width:t.width,height:t.height}}return Pt(i)}function Ga(e,t){let o=mt(e);return o===t||!je(o)||qt(o)?!1:We(o).position==="fixed"||Ga(o,t)}function hl(e,t){let o=t.get(e);if(o)return o;let i=gt(e,[],!1).filter(m=>je(m)&&Nt(m)!=="body"),n=null,c=We(e).position==="fixed",d=c?mt(e):e;for(;je(d)&&!qt(d);){let m=We(d),v=ro(d);!v&&m.position==="fixed"&&(n=null),(c?!v&&!n:!v&&m.position==="static"&&!!n&&(n.position==="absolute"||n.position==="fixed")||oo(d)&&!v&&Ga(e,d))?i=i.filter(C=>C!==d):n=m,d=mt(d)}return t.set(e,i),i}function fl(e){let{element:t,boundary:o,rootBoundary:i,strategy:n}=e,d=[...o==="clippingAncestors"?Co(t)?[]:hl(t,this._c):[].concat(o),i],m=Ua(t,d[0],n),v=m.top,y=m.right,C=m.bottom,b=m.left;for(let S=1;S<d.length;S++){let k=Ua(t,d[S],n);v=Ie(k.top,v),y=it(k.right,y),C=it(k.bottom,C),b=Ie(k.left,b)}return{width:y-b,height:C-v,x:b,y:v}}function ml(e){let{width:t,height:o}=Wa(e);return{width:t,height:o}}function gl(e,t,o){let i=nt(t),n=Je(t),c=o==="fixed",d=Vt(e,!0,c,t),m={scrollLeft:0,scrollTop:0},v=Qe(0);function y(){v.x=lr(n)}if(i||!i&&!c)if((Nt(t)!=="body"||oo(n))&&(m=ko(t)),i){let k=Vt(t,!0,c,t);v.x=k.x+t.clientLeft,v.y=k.y+t.clientTop}else n&&y();c&&!i&&n&&y();let C=n&&!i&&!c?Ka(n,m):Qe(0),b=d.left+m.scrollLeft-v.x-C.x,S=d.top+m.scrollTop-v.y-C.y;return{x:b,y:S,width:d.width,height:d.height}}function Yr(e){return We(e).position==="static"}function ja(e,t){if(!nt(e)||We(e).position==="fixed")return null;if(t)return t(e);let o=e.offsetParent;return Je(e)===o&&(o=o.ownerDocument.body),o}function Xa(e,t){let o=Me(e);if(Co(e))return o;if(!nt(e)){let n=mt(e);for(;n&&!qt(n);){if(je(n)&&!Yr(n))return n;n=mt(n)}return o}let i=ja(e,t);for(;i&&Na(i)&&Yr(i);)i=ja(i,t);return i&&qt(i)&&Yr(i)&&!ro(i)?o:i||qa(e)||o}var vl=async function(e){let t=this.getOffsetParent||Xa,o=this.getDimensions,i=await o(e.floating);return{reference:gl(e.reference,await t(e.floating),e.strategy),floating:{x:0,y:0,width:i.width,height:i.height}}};function wl(e){return We(e).direction==="rtl"}var _o={convertOffsetParentRelativeRectToViewportRelativeRect:ll,getDocumentElement:Je,getClippingRect:fl,getOffsetParent:Xa,getElementRects:vl,getClientRects:cl,getDimensions:ml,getScale:io,isElement:je,isRTL:wl};function Qa(e,t){return e.x===t.x&&e.y===t.y&&e.width===t.width&&e.height===t.height}function bl(e,t){let o=null,i,n=Je(e);function c(){var m;clearTimeout(i),(m=o)==null||m.disconnect(),o=null}function d(m,v){m===void 0&&(m=!1),v===void 0&&(v=1),c();let y=e.getBoundingClientRect(),{left:C,top:b,width:S,height:k}=y;if(m||t(),!S||!k)return;let $=xo(b),I=xo(n.clientWidth-(C+S)),D=xo(n.clientHeight-(b+k)),B=xo(C),G={rootMargin:-$+"px "+-I+"px "+-D+"px "+-B+"px",threshold:Ie(0,it(1,v))||1},oe=!0;function he(fe){let be=fe[0].intersectionRatio;if(be!==v){if(!oe)return d();be?d(!1,be):i=setTimeout(()=>{d(!1,1e-7)},1e3)}be===1&&!Qa(y,e.getBoundingClientRect())&&d(),oe=!1}try{o=new IntersectionObserver(he,{...G,root:n.ownerDocument})}catch{o=new IntersectionObserver(he,G)}o.observe(e)}return d(!0),c}function Ja(e,t,o,i){i===void 0&&(i={});let{ancestorScroll:n=!0,ancestorResize:c=!0,elementResize:d=typeof ResizeObserver=="function",layoutShift:m=typeof IntersectionObserver=="function",animationFrame:v=!1}=i,y=Kr(e),C=n||c?[...y?gt(y):[],...t?gt(t):[]]:[];C.forEach(B=>{n&&B.addEventListener("scroll",o,{passive:!0}),c&&B.addEventListener("resize",o)});let b=y&&m?bl(y,o):null,S=-1,k=null;d&&(k=new ResizeObserver(B=>{let[Y]=B;Y&&Y.target===y&&k&&t&&(k.unobserve(t),cancelAnimationFrame(S),S=requestAnimationFrame(()=>{var G;(G=k)==null||G.observe(t)})),o()}),y&&!v&&k.observe(y),t&&k.observe(t));let $,I=v?Vt(e):null;v&&D();function D(){let B=Vt(e);I&&!Qa(I,B)&&o(),I=B,$=requestAnimationFrame(D)}return o(),()=>{var B;C.forEach(Y=>{n&&Y.removeEventListener("scroll",o),c&&Y.removeEventListener("resize",o)}),b?.(),(B=k)==null||B.disconnect(),k=null,v&&cancelAnimationFrame($)}}var Za=Ma;var en=Ba,tn=Fa,Gr=Ra;var on=Ta;var rn=(e,t,o)=>{let i=new Map,n={platform:_o,...o},c={...n.platform,_c:i};return Ia(e,t,{...n,platform:c})};function an(e){return yl(e)}function Xr(e){return e.assignedSlot?e.assignedSlot:e.parentNode instanceof ShadowRoot?e.parentNode.host:e.parentNode}function yl(e){for(let t=e;t;t=Xr(t))if(t instanceof Element&&getComputedStyle(t).display==="none")return null;for(let t=Xr(e);t;t=Xr(t)){if(!(t instanceof Element))continue;let o=getComputedStyle(t);if(o.display!=="contents"&&(o.position!=="static"||ro(o)||t.tagName==="BODY"))return t}return null}function nn(e){return e!==null&&typeof e=="object"&&"getBoundingClientRect"in e&&("contextElement"in e?e instanceof Element:!0)}var cr=globalThis?.HTMLElement?.prototype.hasOwnProperty("popover"),Z=class extends ce{constructor(){super(...arguments),this.localize=new Se(this),this.active=!1,this.placement="top",this.boundary="viewport",this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=!1,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl&&this.popup){let e=this.anchorEl.getBoundingClientRect(),t=this.popup.getBoundingClientRect(),o=this.placement.includes("top")||this.placement.includes("bottom"),i=0,n=0,c=0,d=0,m=0,v=0,y=0,C=0;o?e.top<t.top?(i=e.left,n=e.bottom,c=e.right,d=e.bottom,m=t.left,v=t.top,y=t.right,C=t.top):(i=t.left,n=t.bottom,c=t.right,d=t.bottom,m=e.left,v=e.top,y=e.right,C=e.top):e.left<t.left?(i=e.right,n=e.top,c=t.left,d=t.top,m=e.right,v=e.bottom,y=t.left,C=t.bottom):(i=t.right,n=t.top,c=e.left,d=e.top,m=t.right,v=t.bottom,y=e.left,C=e.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${i}px`),this.style.setProperty("--hover-bridge-top-left-y",`${n}px`),this.style.setProperty("--hover-bridge-top-right-x",`${c}px`),this.style.setProperty("--hover-bridge-top-right-y",`${d}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${m}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${v}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${y}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${C}px`)}}}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}async updated(e){super.updated(e),e.has("active")&&(this.active?this.start():this.stop()),e.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){if(await this.stop(),this.anchor&&typeof this.anchor=="string"){let e=this.getRootNode();this.anchorEl=e.getElementById(this.anchor)}else this.anchor instanceof Element||nn(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),this.anchorEl&&this.start()}start(){!this.anchorEl||!this.active||!this.isConnected||(this.popup?.showPopover?.(),this.cleanup=Ja(this.anchorEl,this.popup,()=>{this.reposition()}))}async stop(){return new Promise(e=>{this.popup?.hidePopover?.(),this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>e())):e()})}reposition(){if(!this.active||!this.anchorEl||!this.popup)return;let e=[Za({mainAxis:this.distance,crossAxis:this.skidding})];this.sync?e.push(Gr({apply:({rects:i})=>{let n=this.sync==="width"||this.sync==="both",c=this.sync==="height"||this.sync==="both";this.popup.style.width=n?`${i.reference.width}px`:"",this.popup.style.height=c?`${i.reference.height}px`:""}})):(this.popup.style.width="",this.popup.style.height="");let t;cr&&!nn(this.anchor)&&this.boundary==="scroll"&&(t=gt(this.anchorEl).filter(i=>i instanceof Element)),this.flip&&e.push(tn({boundary:this.flipBoundary||t,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:this.flipFallbackStrategy==="best-fit"?"bestFit":"initialPlacement",padding:this.flipPadding})),this.shift&&e.push(en({boundary:this.shiftBoundary||t,padding:this.shiftPadding})),this.autoSize?e.push(Gr({boundary:this.autoSizeBoundary||t,padding:this.autoSizePadding,apply:({availableWidth:i,availableHeight:n})=>{this.autoSize==="vertical"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-height",`${n}px`):this.style.removeProperty("--auto-size-available-height"),this.autoSize==="horizontal"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-width",`${i}px`):this.style.removeProperty("--auto-size-available-width")}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&e.push(on({element:this.arrowEl,padding:this.arrowPadding}));let o=cr?i=>_o.getOffsetParent(i,an):_o.getOffsetParent;rn(this.anchorEl,this.popup,{placement:this.placement,middleware:e,strategy:cr?"absolute":"fixed",platform:{..._o,getOffsetParent:o}}).then(({x:i,y:n,middlewareData:c,placement:d})=>{let m=this.localize.dir()==="rtl",v={top:"bottom",right:"left",bottom:"top",left:"right"}[d.split("-")[0]];if(this.setAttribute("data-current-placement",d),Object.assign(this.popup.style,{left:`${i}px`,top:`${n}px`}),this.arrow){let y=c.arrow.x,C=c.arrow.y,b="",S="",k="",$="";if(this.arrowPlacement==="start"){let I=typeof y=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";b=typeof C=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",S=m?I:"",$=m?"":I}else if(this.arrowPlacement==="end"){let I=typeof y=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";S=m?"":I,$=m?I:"",k=typeof C=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:""}else this.arrowPlacement==="center"?($=typeof y=="number"?"calc(50% - var(--arrow-size-diagonal))":"",b=typeof C=="number"?"calc(50% - var(--arrow-size-diagonal))":""):($=typeof y=="number"?`${y}px`:"",b=typeof C=="number"?`${C}px`:"");Object.assign(this.arrowEl.style,{top:b,right:S,bottom:k,left:$,[v]:"calc(var(--arrow-base-offset) - var(--arrow-size-diagonal))"})}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.dispatchEvent(new ka)}render(){return O`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${we({"popup-hover-bridge":!0,"popup-hover-bridge-visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        popover="manual"
        part="popup"
        class=${we({popup:!0,"popup-active":this.active,"popup-fixed":!cr,"popup-has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?O`<div part="arrow" class="arrow" role="presentation"></div>`:""}
      </div>
    `}};Z.css=_a;h([se(".popup")],Z.prototype,"popup",2);h([se(".arrow")],Z.prototype,"arrowEl",2);h([w()],Z.prototype,"anchor",2);h([w({type:Boolean,reflect:!0})],Z.prototype,"active",2);h([w({reflect:!0})],Z.prototype,"placement",2);h([w()],Z.prototype,"boundary",2);h([w({type:Number})],Z.prototype,"distance",2);h([w({type:Number})],Z.prototype,"skidding",2);h([w({type:Boolean})],Z.prototype,"arrow",2);h([w({attribute:"arrow-placement"})],Z.prototype,"arrowPlacement",2);h([w({attribute:"arrow-padding",type:Number})],Z.prototype,"arrowPadding",2);h([w({type:Boolean})],Z.prototype,"flip",2);h([w({attribute:"flip-fallback-placements",converter:{fromAttribute:e=>e.split(" ").map(t=>t.trim()).filter(t=>t!==""),toAttribute:e=>e.join(" ")}})],Z.prototype,"flipFallbackPlacements",2);h([w({attribute:"flip-fallback-strategy"})],Z.prototype,"flipFallbackStrategy",2);h([w({type:Object})],Z.prototype,"flipBoundary",2);h([w({attribute:"flip-padding",type:Number})],Z.prototype,"flipPadding",2);h([w({type:Boolean})],Z.prototype,"shift",2);h([w({type:Object})],Z.prototype,"shiftBoundary",2);h([w({attribute:"shift-padding",type:Number})],Z.prototype,"shiftPadding",2);h([w({attribute:"auto-size"})],Z.prototype,"autoSize",2);h([w()],Z.prototype,"sync",2);h([w({type:Object})],Z.prototype,"autoSizeBoundary",2);h([w({attribute:"auto-size-padding",type:Number})],Z.prototype,"autoSizePadding",2);h([w({attribute:"hover-bridge",type:Boolean})],Z.prototype,"hoverBridge",2);Z=h([ie("wa-popup")],Z);var sn=j`
  :host {
    --width: 31rem;
    --spacing: var(--wa-space-l);
    --backdrop-filter: none;
    --show-duration: 200ms;
    --hide-duration: 200ms;

    display: none;
  }

  :host([open]) {
    display: block;
  }

  .dialog {
    display: flex;
    flex-direction: column;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: var(--width);
    max-width: calc(100% - var(--wa-space-2xl));
    max-height: calc(100% - var(--wa-space-2xl));
    color: inherit;
    background-color: var(--wa-color-surface-raised);
    border-radius: var(--wa-panel-border-radius);
    border: none;
    box-shadow: var(--wa-shadow-l);
    padding: 0;
    margin: auto;

    &.show {
      animation: show-dialog var(--show-duration) ease;

      &::backdrop {
        animation: show-backdrop var(--show-duration, 200ms) ease;
      }
    }

    &.hide {
      animation: show-dialog var(--hide-duration) ease reverse;

      &::backdrop {
        animation: show-backdrop var(--hide-duration, 200ms) ease reverse;
      }
    }

    &.pulse {
      animation: pulse 250ms ease;
    }
  }

  .dialog:focus {
    outline: none;
  }

  /* Ensure there's enough vertical padding for phones that don't update vh when chrome appears (e.g. iPhone) */
  @media screen and (max-width: 420px) {
    .dialog {
      max-height: 80vh;
    }
  }

  .open {
    display: flex;
    opacity: 1;
  }

  .header {
    flex: 0 0 auto;
    display: flex;
    flex-wrap: nowrap;

    padding-inline-start: var(--spacing);
    padding-block-end: 0;

    /* Subtract the close button's padding so that the X is visually aligned with the edges of the dialog content */
    padding-inline-end: calc(var(--spacing) - var(--wa-form-control-padding-block));
    padding-block-start: calc(var(--spacing) - var(--wa-form-control-padding-block));
  }

  .title {
    align-self: center;
    flex: 1 1 auto;
    font-family: inherit;
    font-size: var(--wa-font-size-l);
    font-weight: var(--wa-font-weight-heading);
    line-height: var(--wa-line-height-condensed);
    margin: 0;
  }

  .header-actions {
    align-self: start;
    display: flex;
    flex-shrink: 0;
    flex-wrap: wrap;
    justify-content: end;
    gap: var(--wa-space-2xs);
    padding-inline-start: var(--spacing);
  }

  .header-actions wa-button,
  .header-actions ::slotted(wa-button) {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .body {
    flex: 1 1 auto;
    display: block;
    padding: var(--spacing);
    overflow: auto;
    -webkit-overflow-scrolling: touch;

    &:focus {
      outline: none;
    }

    &:focus-visible {
      outline: var(--wa-focus-ring);
      outline-offset: var(--wa-focus-ring-offset);
    }
  }

  .footer {
    flex: 0 0 auto;
    display: flex;
    flex-wrap: wrap;
    gap: var(--wa-space-xs);
    justify-content: end;
    padding: var(--spacing);
    padding-block-start: 0;
  }

  .footer ::slotted(wa-button:not(:first-of-type)) {
    margin-inline-start: var(--wa-spacing-xs);
  }

  .dialog::backdrop {
    /*
      NOTE: the ::backdrop element doesn't inherit properly in Safari yet, but it will in 17.4! At that time, we can
      remove the fallback values here.
    */
    background-color: var(--wa-color-overlay-modal, rgb(0 0 0 / 0.25));
    backdrop-filter: var(--backdrop-filter);
  }

  @keyframes pulse {
    0% {
      scale: 1;
    }
    50% {
      scale: 1.02;
    }
    100% {
      scale: 1;
    }
  }

  @keyframes show-dialog {
    from {
      opacity: 0;
      scale: 0.8;
    }
    to {
      opacity: 1;
      scale: 1;
    }
  }

  @keyframes show-backdrop {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (forced-colors: active) {
    .dialog {
      border: solid 1px white;
    }
  }
`;function ln(e){return e.split(" ").map(t=>t.trim()).filter(t=>t!=="")}var Ze=class extends ce{constructor(){super(...arguments),this.localize=new Se(this),this.hasSlotController=new ot(this,"footer","header-actions","label"),this.open=!1,this.label="",this.withoutHeader=!1,this.lightDismiss=!1,this.withFooter=!1,this.handleDocumentKeyDown=e=>{e.key==="Escape"&&this.open&&Mt(this)&&(e.preventDefault(),e.stopPropagation(),this.requestClose(this.dialog))}}firstUpdated(){this.open&&(this.addOpenListeners(),this.dialog.showModal(),Vr(this))}disconnectedCallback(){super.disconnectedCallback(),Hr(this),this.removeOpenListeners()}async requestClose(e){let t=new Qt({source:e});if(this.dispatchEvent(t),t.defaultPrevented){this.open=!0,Ge(this.dialog,"pulse");return}this.removeOpenListeners(),await Ge(this.dialog,"hide"),this.open=!1,this.dialog.close(),Hr(this);let o=this.originalTrigger;typeof o?.focus=="function"&&setTimeout(()=>o.focus()),this.dispatchEvent(new Jt)}addOpenListeners(){document.addEventListener("keydown",this.handleDocumentKeyDown),Gt(this)}removeOpenListeners(){document.removeEventListener("keydown",this.handleDocumentKeyDown),Ft(this)}handleDialogCancel(e){e.preventDefault(),!this.dialog.classList.contains("hide")&&e.target===this.dialog&&Mt(this)&&this.requestClose(this.dialog)}handleDialogClick(e){let o=e.target.closest('[data-dialog="close"]');o&&(e.stopPropagation(),this.requestClose(o))}async handleDialogPointerDown(e){e.target===this.dialog&&(this.lightDismiss?this.requestClose(this.dialog):await Ge(this.dialog,"pulse"))}handleOpenChange(){this.open&&!this.dialog.open?this.show():!this.open&&this.dialog.open&&(this.open=!0,this.requestClose(this.dialog))}async show(){let e=new Xt;if(this.dispatchEvent(e),e.defaultPrevented){this.open=!1;return}this.addOpenListeners(),this.originalTrigger=document.activeElement,this.open=!0,this.dialog.showModal(),Vr(this),requestAnimationFrame(()=>{let t=this.querySelector("[autofocus]");t&&typeof t.focus=="function"?t.focus():this.dialog.focus()}),await Ge(this.dialog,"show"),this.dispatchEvent(new Zt)}render(){let e=!this.withoutHeader,t=this.hasUpdated?this.hasSlotController.test("footer"):this.withFooter;return O`
      <dialog
        part="dialog"
        class=${we({dialog:!0,open:this.open})}
        @cancel=${this.handleDialogCancel}
        @click=${this.handleDialogClick}
        @pointerdown=${this.handleDialogPointerDown}
      >
        ${e?O`
              <header part="header" class="header">
                <h2 part="title" class="title" id="title">
                  <!-- If there's no label, use an invisible character to prevent the header from collapsing -->
                  <slot name="label"> ${this.label.length>0?this.label:"\u200B"} </slot>
                </h2>
                <div part="header-actions" class="header-actions">
                  <slot name="header-actions"></slot>
                  <wa-button
                    part="close-button"
                    exportparts="base:close-button__base"
                    class="close"
                    appearance="plain"
                    @click="${o=>this.requestClose(o.target)}"
                  >
                    <wa-icon
                      name="xmark"
                      label=${this.localize.term("close")}
                      library="system"
                      variant="solid"
                    ></wa-icon>
                  </wa-button>
                </div>
              </header>
            `:""}

        <div part="body" class="body"><slot></slot></div>

        ${t?O`
              <footer part="footer" class="footer">
                <slot name="footer"></slot>
              </footer>
            `:""}
      </dialog>
    `}};Ze.css=sn;h([se(".dialog")],Ze.prototype,"dialog",2);h([w({type:Boolean,reflect:!0})],Ze.prototype,"open",2);h([w({reflect:!0})],Ze.prototype,"label",2);h([w({attribute:"without-header",type:Boolean,reflect:!0})],Ze.prototype,"withoutHeader",2);h([w({attribute:"light-dismiss",type:Boolean})],Ze.prototype,"lightDismiss",2);h([w({attribute:"with-footer",type:Boolean})],Ze.prototype,"withFooter",2);h([W("open",{waitUntilFirstUpdate:!0})],Ze.prototype,"handleOpenChange",1);Ze=h([ie("wa-dialog")],Ze);document.addEventListener("click",e=>{let t=e.target.closest("[data-dialog]");if(t instanceof Element){let[o,i]=ln(t.getAttribute("data-dialog")||"");if(o==="open"&&i?.length){let c=t.getRootNode().getElementById(i);c?.localName==="wa-dialog"?c.open=!0:console.warn(`A dialog with an ID of "${i}" could not be found in this document.`)}}}),document.addEventListener("pointerdown",()=>{});var cn=j`
  :host {
    --color: var(--wa-color-surface-border);
    --width: var(--wa-border-width-s);
    --spacing: var(--wa-space-m);
  }

  :host(:not([orientation='vertical'])) {
    display: block;
    border-top: solid var(--width) var(--color);
    margin: var(--spacing) 0;
  }

  :host([orientation='vertical']) {
    display: inline-block;
    height: 100%;
    border-inline-start: solid var(--width) var(--color);
    margin: 0 var(--spacing);
    min-block-size: 1lh;
  }
`;var ao=class extends ce{constructor(){super(...arguments),this.orientation="horizontal"}connectedCallback(){super.connectedCallback(),this.setAttribute("role","separator")}handleVerticalChange(){this.setAttribute("aria-orientation",this.orientation)}};ao.css=cn;h([w({reflect:!0})],ao.prototype,"orientation",2);h([W("orientation")],ao.prototype,"handleVerticalChange",1);ao=h([ie("wa-divider")],ao);var dn=j`
  :host {
    display: flex;
    position: relative;
    align-items: stretch;
    border-radius: var(--wa-panel-border-radius);
    background-color: var(--wa-color-fill-quiet, var(--wa-color-brand-fill-quiet));
    border-color: var(--wa-color-border-quiet, var(--wa-color-brand-border-quiet));
    border-style: var(--wa-panel-border-style);
    border-width: var(--wa-panel-border-width);
    color: var(--wa-color-text-normal);
    padding: 1em;
  }

  /* Appearance modifiers */
  :host([appearance~='plain']) {
    background-color: transparent;
    border-color: transparent;
  }

  :host([appearance~='outlined']) {
    background-color: transparent;
    border-color: var(--wa-color-border-loud, var(--wa-color-brand-border-loud));
  }

  :host([appearance~='filled']) {
    background-color: var(--wa-color-fill-quiet, var(--wa-color-brand-fill-quiet));
    border-color: transparent;
  }

  :host([appearance~='filled-outlined']) {
    border-color: var(--wa-color-border-quiet, var(--wa-color-brand-border-quiet));
  }

  :host([appearance~='accent']) {
    color: var(--wa-color-on-loud, var(--wa-color-brand-on-loud));
    background-color: var(--wa-color-fill-loud, var(--wa-color-brand-fill-loud));
    border-color: transparent;

    [part~='icon'] {
      color: currentColor;
    }
  }

  [part~='icon'] {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    color: var(--wa-color-on-quiet);
    font-size: 1.25em;
  }

  ::slotted([slot='icon']) {
    margin-inline-end: var(--wa-form-control-padding-inline);
  }

  [part~='message'] {
    flex: 1 1 auto;
    display: block;
    overflow: hidden;
  }
`;var xt=class extends ce{constructor(){super(...arguments),this.variant="brand",this.size="m"}handleSizeChange(){He(this.localName,this.size)}render(){return O`
      <div part="icon">
        <slot name="icon"></slot>
      </div>

      <div part="message">
        <slot></slot>
      </div>
    `}};xt.css=[dn,Wt,Ue];h([w({reflect:!0})],xt.prototype,"variant",2);h([w({reflect:!0})],xt.prototype,"appearance",2);h([w({reflect:!0})],xt.prototype,"size",2);h([W("size")],xt.prototype,"handleSizeChange",1);xt=h([ie("wa-callout")],xt);function un(e,t){let o=e.metaKey||e.ctrlKey||e.shiftKey||e.altKey;e.key==="Enter"&&!o&&setTimeout(()=>{!e.defaultPrevented&&!e.isComposing&&xl(t)})}function xl(e){let t=null;if("form"in e&&(t=e.form),!t&&"getForm"in e&&(t=e.getForm()),!t)return;let o=[...t.elements];if(o.length===1){t.requestSubmit(null);return}let i=o.find(n=>n.type==="submit"&&!n.matches(":disabled"));i&&(["input","button"].includes(i.localName)?t.requestSubmit(i):i.click())}var pn=j`
  :host {
    border-width: 0;
  }

  :host(:focus) {
    outline: none;
  }

  .text-field {
    display: flex;
    align-items: stretch;
    justify-content: start;
    position: relative;
    transition: inherit;
    height: var(--wa-form-control-height);
    border-color: var(--wa-form-control-border-color);
    border-radius: var(--wa-form-control-border-radius);
    border-style: var(--wa-form-control-border-style);
    border-width: var(--wa-form-control-border-width);
    cursor: text;
    color: var(--wa-form-control-value-color);
    font-size: var(--wa-form-control-value-font-size);
    font-family: inherit;
    font-weight: var(--wa-form-control-value-font-weight);
    line-height: var(--wa-form-control-value-line-height);
    vertical-align: middle;
    width: 100%;
    transition:
      background-color var(--wa-transition-normal),
      border-color var(--wa-transition-normal),
      outline-color var(--wa-transition-fast);
    transition-timing-function: var(--wa-transition-easing);
    background-color: var(--wa-form-control-background-color);
    box-shadow: var(--box-shadow);
    padding: 0 var(--wa-form-control-padding-inline);
    outline: var(--wa-focus-ring-style) var(--wa-focus-ring-width) transparent;
    outline-offset: var(--wa-focus-ring-offset);

    &:focus-within {
      outline-color: var(--wa-color-focus);
    }

    /* Style disabled inputs */
    &:has(:disabled) {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }

  /* Appearance modifiers */
  :host([appearance='outlined']) .text-field {
    background-color: var(--wa-form-control-background-color);
    border-color: var(--wa-form-control-border-color);
  }

  :host([appearance='filled']) .text-field {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: var(--wa-color-neutral-fill-quiet);
  }

  :host([appearance='filled-outlined']) .text-field {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: var(--wa-form-control-border-color);
  }

  :host([pill]) .text-field {
    border-radius: var(--wa-border-radius-pill) !important;
  }

  .text-field {
    /* Show autofill styles over the entire text field, not just the native <input> */
    &:has(:autofill),
    &:has(:-webkit-autofill) {
      background-color: var(--wa-color-brand-fill-quiet) !important;
    }

    input,
    textarea {
      /*
      Fixes an alignment issue with placeholders.
      https://github.com/shoelace-style/webawesome/issues/342
    */
      height: 100%;

      padding: 0;
      border: none;
      outline: none;
      box-shadow: none;
      margin: 0;
      cursor: inherit;
      -webkit-appearance: none;
      font: inherit;

      /* Turn off Safari's autofill styles */
      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus,
      &:-webkit-autofill:active {
        -webkit-background-clip: text;
        background-color: transparent;
        -webkit-text-fill-color: inherit;
      }
    }
  }

  input {
    flex: 1 1 auto;
    min-width: 0;
    height: 100%;
    transition: inherit;

    /* prettier-ignore */
    background-color: rgb(118 118 118 / 0); /* ensures proper placeholder styles in webkit's date input */
    height: calc(var(--wa-form-control-height) - var(--border-width) * 2);
    padding-block: 0;
    color: inherit;

    &:autofill {
      &,
      &:hover,
      &:focus,
      &:active {
        box-shadow: none;
        caret-color: var(--wa-form-control-value-color);
      }
    }

    &::placeholder {
      color: var(--wa-form-control-placeholder-color);
      user-select: none;
      -webkit-user-select: none;
    }

    &::-webkit-search-decoration,
    &::-webkit-search-cancel-button,
    &::-webkit-search-results-button,
    &::-webkit-search-results-decoration {
      -webkit-appearance: none;
    }

    &:focus {
      outline: none;
    }
  }

  textarea {
    &:autofill {
      &,
      &:hover,
      &:focus,
      &:active {
        box-shadow: none;
        caret-color: var(--wa-form-control-value-color);
      }
    }

    &::placeholder {
      color: var(--wa-form-control-placeholder-color);
      user-select: none;
      -webkit-user-select: none;
    }
  }

  .start,
  .end {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    cursor: default;

    &::slotted(wa-icon) {
      color: var(--wa-color-neutral-on-quiet);
    }
  }

  .start::slotted(*) {
    margin-inline-end: var(--wa-form-control-padding-inline);
  }

  .end::slotted(*) {
    margin-inline-start: var(--wa-form-control-padding-inline);
  }

  /*
   * Clearable + Password Toggle
   */

  .clear,
  .password-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    color: var(--wa-color-neutral-on-quiet);
    border: none;
    background: none;
    padding: 0;
    transition: var(--wa-transition-normal) color;
    cursor: pointer;
    margin-inline-start: var(--wa-form-control-padding-inline);

    @media (hover: hover) {
      &:hover {
        color: color-mix(in oklab, currentColor, var(--wa-color-mix-hover));
      }
    }

    &:active {
      color: color-mix(in oklab, currentColor, var(--wa-color-mix-active));
    }

    &:focus {
      outline: none;
    }
  }

  /* Don't show the browser's password toggle in Edge */
  ::-ms-reveal {
    display: none;
  }

  /* Hide the built-in number spinner */
  :host([without-spin-buttons]) input[type='number'] {
    -moz-appearance: textfield;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      display: none;
    }
  }
`;var Lo=bt(class extends rt{constructor(e){if(super(e),e.type!==De.PROPERTY&&e.type!==De.ATTRIBUTE&&e.type!==De.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!ma(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===xe||t===N)return t;let o=e.element,i=e.name;if(e.type===De.PROPERTY){if(t===o[i])return xe}else if(e.type===De.BOOLEAN_ATTRIBUTE){if(!!t===o.hasAttribute(i))return xe}else if(e.type===De.ATTRIBUTE&&o.getAttribute(i)===t+"")return xe;return Xo(e),t}});var q=class extends Ce{constructor(){super(...arguments),this.assumeInteractionOn=["blur","input"],this.hasSlotController=new ot(this,"hint","label"),this.localize=new Se(this),this.title="",this.type="text",this._value=null,this.defaultValue=this.getAttribute("value")||null,this.size="m",this.appearance="outlined",this.pill=!1,this.label="",this.hint="",this.withClear=!1,this.placeholder="",this.readonly=!1,this.passwordToggle=!1,this.passwordVisible=!1,this.withoutSpinButtons=!1,this.required=!1,this.spellcheck=!0,this.withLabel=!1,this.withHint=!1}static get validators(){return[...super.validators,Fo()]}get value(){return this.valueHasChanged?this._value:this._value??this.defaultValue}set value(e){this._value!==e&&(this.valueHasChanged=!0,this._value=e)}handleSizeChange(){He(this.localName,this.size)}handleChange(e){this.value=this.input.value,this.relayNativeEvent(e,{bubbles:!0,composed:!0})}handleClearClick(e){e.preventDefault(),this.value!==""&&(this.value="",this.updateComplete.then(()=>{this.dispatchEvent(new Zo),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})),this.input.focus()}handleInput(){this.value=this.input.value}handleKeyDown(e){un(e,this)}handlePasswordToggle(){this.passwordVisible=!this.passwordVisible}updated(e){if(super.updated(e),e.has("value")||e.has("defaultValue")||e.has("type")){let t=["number","date","time","datetime-local"];this.input&&t.includes(this.type)&&this.value&&this.input.value!==this.value&&(this._value=this.input.value),this.customStates.set("blank",!this.value),this.updateValidity()}}handleStepChange(){this.input.step=String(this.step),this.updateValidity()}focus(e){this.input.focus(e)}blur(){this.input.blur()}select(){this.input.select()}setSelectionRange(e,t,o="none"){this.input.setSelectionRange(e,t,o)}setRangeText(e,t,o,i="preserve"){let n=t??this.input.selectionStart,c=o??this.input.selectionEnd;this.input.setRangeText(e,n,c,i),this.value!==this.input.value&&(this.value=this.input.value)}showPicker(){"showPicker"in HTMLInputElement.prototype&&this.input.showPicker()}stepUp(){this.input.stepUp(),this.value!==this.input.value&&(this.value=this.input.value)}stepDown(){this.input.stepDown(),this.value!==this.input.value&&(this.value=this.input.value)}formResetCallback(){this.value=null,this.input&&(this.input.value=this.value),super.formResetCallback()}render(){let e=this.hasUpdated?this.hasSlotController.test("label"):this.withLabel,t=this.hasUpdated?this.hasSlotController.test("hint"):this.withHint,o=this.label?!0:!!e,i=this.hint?!0:!!t,n=this.withClear&&!this.disabled&&!this.readonly,c=this.hasUpdated&&n&&(typeof this.value=="number"||this.value&&this.value.length>0);return O`
      <label
        part="form-control-label label"
        class=${we({label:!0,"has-label":o})}
        for="input"
        aria-hidden=${o?"false":"true"}
      >
        <slot name="label">${this.label}</slot>
      </label>

      <div part="base" class="text-field">
        <slot name="start" part="start" class="start"></slot>

        <input
          part="input"
          id="input"
          class="control"
          type=${this.type==="password"&&this.passwordVisible?"text":this.type}
          title=${this.title}
          name=${te(this.name)}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          placeholder=${te(this.placeholder)}
          minlength=${te(this.minlength)}
          maxlength=${te(this.maxlength)}
          min=${te(this.min)}
          max=${te(this.max)}
          step=${te(this.step)}
          .value=${Lo(this.value??"")}
          autocapitalize=${te(this.autocapitalize)}
          autocomplete=${te(this.autocomplete)}
          autocorrect=${this.autocorrect?"on":"off"}
          ?autofocus=${this.autofocus}
          spellcheck=${this.spellcheck}
          pattern=${te(this.pattern)}
          enterkeyhint=${te(this.enterkeyhint)}
          inputmode=${te(this.inputmode)}
          aria-describedby="hint"
          @change=${this.handleChange}
          @input=${this.handleInput}
          @keydown=${this.handleKeyDown}
        />

        ${c?O`
              <button
                part="clear-button"
                class="clear"
                type="button"
                aria-label=${this.localize.term("clearEntry")}
                @click=${this.handleClearClick}
                tabindex="-1"
              >
                <slot name="clear-icon">
                  <wa-icon name="circle-xmark" library="system" variant="regular"></wa-icon>
                </slot>
              </button>
            `:""}
        ${this.passwordToggle&&!this.disabled?O`
              <button
                part="password-toggle-button"
                class="password-toggle"
                type="button"
                aria-label=${this.localize.term(this.passwordVisible?"hidePassword":"showPassword")}
                @click=${this.handlePasswordToggle}
                tabindex="-1"
              >
                ${this.passwordVisible?O`
                      <slot name="hide-password-icon">
                        <wa-icon name="eye-slash" library="system" variant="regular"></wa-icon>
                      </slot>
                    `:O`
                      <slot name="show-password-icon">
                        <wa-icon name="eye" library="system" variant="regular"></wa-icon>
                      </slot>
                    `}
              </button>
            `:""}

        <slot name="end" part="end" class="end"></slot>
      </div>

      <slot
        id="hint"
        part="hint"
        name="hint"
        class=${we({"has-slotted":i})}
        aria-hidden=${i?"false":"true"}
        >${this.hint}</slot
      >
    `}};q.css=[Ue,to,pn];q.shadowRootOptions={...Ce.shadowRootOptions,delegatesFocus:!0};h([se("input")],q.prototype,"input",2);h([w()],q.prototype,"title",2);h([w({reflect:!0})],q.prototype,"type",2);h([ze()],q.prototype,"value",1);h([w({attribute:"value",reflect:!0})],q.prototype,"defaultValue",2);h([w({reflect:!0})],q.prototype,"size",2);h([W("size")],q.prototype,"handleSizeChange",1);h([w({reflect:!0})],q.prototype,"appearance",2);h([w({type:Boolean,reflect:!0})],q.prototype,"pill",2);h([w()],q.prototype,"label",2);h([w({attribute:"hint"})],q.prototype,"hint",2);h([w({attribute:"with-clear",type:Boolean})],q.prototype,"withClear",2);h([w()],q.prototype,"placeholder",2);h([w({type:Boolean,reflect:!0})],q.prototype,"readonly",2);h([w({attribute:"password-toggle",type:Boolean})],q.prototype,"passwordToggle",2);h([w({attribute:"password-visible",type:Boolean})],q.prototype,"passwordVisible",2);h([w({attribute:"without-spin-buttons",type:Boolean,reflect:!0})],q.prototype,"withoutSpinButtons",2);h([w({type:Boolean,reflect:!0})],q.prototype,"required",2);h([w()],q.prototype,"pattern",2);h([w({type:Number})],q.prototype,"minlength",2);h([w({type:Number})],q.prototype,"maxlength",2);h([w()],q.prototype,"min",2);h([w()],q.prototype,"max",2);h([w()],q.prototype,"step",2);h([w()],q.prototype,"autocapitalize",2);h([w({type:Boolean,converter:{fromAttribute:e=>!(!e||e==="off"),toAttribute:e=>e?"on":"off"}})],q.prototype,"autocorrect",2);h([w()],q.prototype,"autocomplete",2);h([w({type:Boolean})],q.prototype,"autofocus",2);h([w()],q.prototype,"enterkeyhint",2);h([w({type:Boolean,converter:{fromAttribute:e=>!(!e||e==="false"),toAttribute:e=>e?"true":"false"}})],q.prototype,"spellcheck",2);h([w()],q.prototype,"inputmode",2);h([w({attribute:"with-label",type:Boolean})],q.prototype,"withLabel",2);h([w({attribute:"with-hint",type:Boolean})],q.prototype,"withHint",2);h([W("step",{waitUntilFirstUpdate:!0})],q.prototype,"handleStepChange",1);q=h([ie("wa-input")],q);q.disableWarning?.("change-in-update");var hn=j`
  :host {
    --checked-icon-color: var(--wa-color-brand-on-loud);
    --checked-icon-scale: 0.8;

    display: inline-flex;
    color: var(--wa-form-control-value-color);
    font-family: inherit;
    font-weight: var(--wa-form-control-value-font-weight);
    line-height: var(--wa-form-control-value-line-height);
    user-select: none;
    -webkit-user-select: none;
  }

  [part~='control'] {
    display: inline-flex;
    flex: 0 0 auto;
    position: relative;
    align-items: center;
    justify-content: center;
    width: var(--wa-form-control-toggle-size);
    height: var(--wa-form-control-toggle-size);
    border-color: var(--wa-form-control-border-color);
    border-radius: min(
      calc(var(--wa-form-control-toggle-size) * 0.375),
      var(--wa-border-radius-s)
    ); /* min prevents entirely circular checkbox */
    border-style: var(--wa-border-style);
    border-width: var(--wa-form-control-border-width);
    background-color: var(--wa-form-control-background-color);
    transition:
      background var(--wa-transition-normal),
      border-color var(--wa-transition-fast),
      box-shadow var(--wa-transition-fast),
      color var(--wa-transition-fast);
    transition-timing-function: var(--wa-transition-easing);

    margin-inline-end: 0.5em;
  }

  [part~='base'] {
    display: flex;
    align-items: flex-start;
    position: relative;
    color: currentColor;
    vertical-align: middle;
    cursor: pointer;
  }

  [part~='label'] {
    display: inline;
  }

  /* Checked */
  [part~='control']:has(:checked, :indeterminate) {
    color: var(--checked-icon-color);
    border-color: var(--wa-form-control-activated-color);
    background-color: var(--wa-form-control-activated-color);
  }

  /* Focus */
  [part~='control']:has(> input:focus-visible:not(:disabled)) {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  /* Disabled */
  :host [part~='base']:has(input:disabled) {
    opacity: 0.5;
    cursor: not-allowed;
  }

  input {
    position: absolute;
    padding: 0;
    margin: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
    pointer-events: none;
  }

  [part~='icon'] {
    display: flex;
    scale: var(--checked-icon-scale);

    /* Without this, Safari renders the icon slightly to the left */
    &::part(svg) {
      translate: 0.0009765625em;
    }

    input:not(:checked, :indeterminate) + & {
      visibility: hidden;
    }
  }

  :host([required]) [part~='label']::after {
    content: var(--wa-form-control-required-content);
    color: var(--wa-form-control-required-content-color);
    margin-inline-start: var(--wa-form-control-required-content-offset);
  }
`;var me=class extends Ce{constructor(){super(...arguments),this.hasSlotController=new ot(this,"hint"),this.title="",this.name=null,this._value=this.getAttribute("value")??null,this.size="m",this.disabled=!1,this.indeterminate=!1,this._checked=null,this.defaultChecked=this.hasAttribute("checked"),this.required=!1,this.hint=""}static get validators(){let e=[er({validationProperty:"checked",validationElement:Object.assign(document.createElement("input"),{type:"checkbox",required:!0})})];return[...super.validators,...e]}get value(){return this._value??"on"}set value(e){this._value=e}handleSizeChange(){He(this.localName,this.size)}get checked(){return this.valueHasChanged?!!this._checked:this._checked??this.defaultChecked}set checked(e){this._checked=!!e,this.valueHasChanged=!0}handleClick(){this.hasInteracted=!0,this.checked=!this.checked,this.indeterminate=!1,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}connectedCallback(){super.connectedCallback(),this.handleDefaultCheckedChange()}handleDefaultCheckedChange(){this.handleValueOrCheckedChange()}handleValueOrCheckedChange(){this.setValue(this.checked?this.value:null,this._value),this.updateValidity()}handleStateChange(){this.hasUpdated&&(this.input.checked=this.checked,this.input.indeterminate=this.indeterminate),this.customStates.set("checked",this.checked),this.customStates.set("indeterminate",this.indeterminate),this.updateValidity()}handleDisabledChange(){this.customStates.set("disabled",this.disabled)}willUpdate(e){super.willUpdate(e),(e.has("value")||e.has("checked")||e.has("defaultChecked"))&&this.handleValueOrCheckedChange()}formResetCallback(){this._checked=null,super.formResetCallback(),this.handleValueOrCheckedChange()}click(){this.input.click()}focus(e){this.input.focus(e)}blur(){this.input.blur()}render(){let e=this.hasSlotController.test("hint"),t=this.hint?!0:!!e,o=!this.checked&&this.indeterminate,i=o?"indeterminate":"check",n=o?"indeterminate":"check";return O`
      <label part="base">
        <span part="control">
          <input
            class="input"
            type="checkbox"
            title=${this.title}
            name=${te(this.name)}
            value=${te(this._value)}
            .indeterminate=${Lo(this.indeterminate)}
            .checked=${Lo(this.checked)}
            .disabled=${this.disabled}
            .required=${this.required}
            aria-checked=${this.indeterminate?"mixed":this.checked?"true":"false"}
            aria-describedby="hint"
            @click=${this.handleClick}
          />

          <wa-icon part="${n}-icon icon" library="system" name=${i}></wa-icon>
        </span>

        <slot part="label"></slot>
      </label>

      <slot
        id="hint"
        part="hint"
        name="hint"
        aria-hidden=${t?"false":"true"}
        class="${we({"has-slotted":t})}"
      >
        ${this.hint}
      </slot>
    `}};me.css=[to,Ue,hn];me.shadowRootOptions={...Ce.shadowRootOptions,delegatesFocus:!0};h([se('input[type="checkbox"]')],me.prototype,"input",2);h([w()],me.prototype,"title",2);h([w({reflect:!0})],me.prototype,"name",2);h([w({reflect:!0})],me.prototype,"value",1);h([w({reflect:!0})],me.prototype,"size",2);h([W("size")],me.prototype,"handleSizeChange",1);h([w({type:Boolean})],me.prototype,"disabled",2);h([w({type:Boolean,reflect:!0})],me.prototype,"indeterminate",2);h([w({type:Boolean,attribute:!1})],me.prototype,"checked",1);h([w({type:Boolean,reflect:!0,attribute:"checked"})],me.prototype,"defaultChecked",2);h([w({type:Boolean,reflect:!0})],me.prototype,"required",2);h([w()],me.prototype,"hint",2);h([W(["checked","defaultChecked"])],me.prototype,"handleDefaultCheckedChange",1);h([W(["checked","indeterminate"])],me.prototype,"handleStateChange",1);h([W("disabled")],me.prototype,"handleDisabledChange",1);me=h([ie("wa-checkbox")],me);me.disableWarning?.("change-in-update");var fn=j`
  :host {
    --max-width: 30ch;

    /** These styles are added so we don't interfere in the DOM. */
    display: inline-block;
    position: absolute;

    /** Defaults for inherited CSS properties */
    color: var(--wa-tooltip-content-color);
    font-size: var(--wa-tooltip-font-size);
    line-height: var(--wa-tooltip-line-height);
    text-align: start;
    white-space: normal;
  }

  .tooltip {
    --arrow-size: var(--wa-tooltip-arrow-size);
    --arrow-color: var(--wa-tooltip-background-color);
  }

  .tooltip::part(popup) {
    z-index: 1000;
  }

  .tooltip[placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .tooltip[placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  .tooltip[placement^='left']::part(popup) {
    transform-origin: right;
  }

  .tooltip[placement^='right']::part(popup) {
    transform-origin: left;
  }

  .body {
    display: block;
    width: max-content;
    max-width: var(--max-width);
    border-radius: var(--wa-tooltip-border-radius);
    background-color: var(--wa-tooltip-background-color);
    border: var(--wa-tooltip-border-width) var(--wa-tooltip-border-style) var(--wa-tooltip-border-color);
    padding: 0.25em 0.5em;
    user-select: none;
    -webkit-user-select: none;
  }

  .tooltip {
    --popup-border-width: var(--wa-tooltip-border-width);

    &::part(arrow) {
      border-bottom: var(--wa-tooltip-border-width) var(--wa-tooltip-border-style) var(--wa-tooltip-border-color);
      border-right: var(--wa-tooltip-border-width) var(--wa-tooltip-border-style) var(--wa-tooltip-border-color);
    }
  }
`;var mn="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";var gn=(e=21)=>{let t="",o=crypto.getRandomValues(new Uint8Array(e|=0));for(;e--;)t+=mn[o[e]&63];return t};function vn(e=""){return`${e}${gn()}`}var de=class extends ce{constructor(){super(...arguments),this.placement="top",this.disabled=!1,this.distance=8,this.open=!1,this.skidding=0,this.showDelay=150,this.hideDelay=0,this.trigger="hover focus",this.withoutArrow=!1,this.for=null,this.anchor=null,this.eventController=new AbortController,this.handleBlur=()=>{this.hasTrigger("focus")&&this.hide()},this.handleClick=()=>{this.hasTrigger("click")&&(this.open?this.hide():this.show())},this.handleFocus=()=>{this.hasTrigger("focus")&&this.show()},this.handleDocumentKeyDown=e=>{e.key==="Escape"&&this.open&&Mt(this)&&(e.preventDefault(),e.stopPropagation(),this.hide())},this.handleMouseOver=()=>{this.hasTrigger("hover")&&(clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.show(),this.showDelay))},this.handleMouseOut=()=>{if(this.hasTrigger("hover")){let e=!!this.anchor?.matches(":hover"),t=this.matches(":hover");if(e||t)return;clearTimeout(this.hoverTimeout),e||t||(this.hoverTimeout=window.setTimeout(()=>{this.hide()},this.hideDelay))}}}connectedCallback(){super.connectedCallback(),this.eventController.signal.aborted&&(this.eventController=new AbortController),this.addEventListener("mouseout",this.handleMouseOut),this.open&&(this.open=!1,this.updateComplete.then(()=>{this.open=!0})),this.id||(this.id=vn("wa-tooltip-")),this.for&&this.anchor?(this.anchor=null,this.handleForChange()):this.for&&this.handleForChange()}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",this.handleDocumentKeyDown),Ft(this),this.eventController.abort(),this.anchor&&this.removeFromAriaLabelledBy(this.anchor,this.id)}firstUpdated(){this.body.hidden=!this.open,this.open&&(this.popup.active=!0,this.popup.reposition())}hasTrigger(e){return this.trigger.split(" ").includes(e)}addToAriaLabelledBy(e,t){let i=(e.getAttribute("aria-labelledby")||"").split(/\s+/).filter(Boolean);i.includes(t)||(i.push(t),e.setAttribute("aria-labelledby",i.join(" ")))}removeFromAriaLabelledBy(e,t){let n=(e.getAttribute("aria-labelledby")||"").split(/\s+/).filter(Boolean).filter(c=>c!==t);n.length>0?e.setAttribute("aria-labelledby",n.join(" ")):e.removeAttribute("aria-labelledby")}async handleOpenChange(){if(this.open){if(this.disabled)return;let e=new Xt;if(this.dispatchEvent(e),e.defaultPrevented){this.open=!1;return}document.addEventListener("keydown",this.handleDocumentKeyDown,{signal:this.eventController.signal}),Gt(this),this.body.hidden=!1,this.popup.active=!0,await Ge(this.popup.popup,"show-with-scale"),this.popup.reposition(),this.dispatchEvent(new Zt)}else{let e=new Qt;if(this.dispatchEvent(e),e.defaultPrevented){this.open=!1;return}document.removeEventListener("keydown",this.handleDocumentKeyDown),Ft(this),await Ge(this.popup.popup,"hide-with-scale"),this.popup.active=!1,this.body.hidden=!0,this.dispatchEvent(new Jt)}}handleForChange(){let e=this.getRootNode();if(!e)return;let t=this.for?e.getElementById(this.for):null,o=this.anchor;if(t===o)return;let{signal:i}=this.eventController;t&&(this.addToAriaLabelledBy(t,this.id),t.addEventListener("blur",this.handleBlur,{capture:!0,signal:i}),t.addEventListener("focus",this.handleFocus,{capture:!0,signal:i}),t.addEventListener("click",this.handleClick,{signal:i}),t.addEventListener("mouseover",this.handleMouseOver,{signal:i}),t.addEventListener("mouseout",this.handleMouseOut,{signal:i})),o&&(this.removeFromAriaLabelledBy(o,this.id),o.removeEventListener("blur",this.handleBlur,{capture:!0}),o.removeEventListener("focus",this.handleFocus,{capture:!0}),o.removeEventListener("click",this.handleClick),o.removeEventListener("mouseover",this.handleMouseOver),o.removeEventListener("mouseout",this.handleMouseOut)),this.anchor=t}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}handleDisabledChange(){this.disabled&&this.open&&this.hide()}async show(){if(!this.open)return this.open=!0,eo(this,"wa-after-show")}async hide(){if(this.open)return this.open=!1,eo(this,"wa-after-hide")}render(){return O`
      <wa-popup
        part="base"
        exportparts="
          popup:base__popup,
          arrow:base__arrow
        "
        class=${we({tooltip:!0,"tooltip-open":this.open})}
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        flip
        shift
        ?arrow=${!this.withoutArrow}
        hover-bridge
        .anchor=${this.anchor}
      >
        <div part="body" class="body">
          <slot></slot>
        </div>
      </wa-popup>
    `}};de.css=fn;de.dependencies={"wa-popup":Z};h([se("slot:not([name])")],de.prototype,"defaultSlot",2);h([se(".body")],de.prototype,"body",2);h([se("wa-popup")],de.prototype,"popup",2);h([w()],de.prototype,"placement",2);h([w({type:Boolean,reflect:!0})],de.prototype,"disabled",2);h([w({type:Number})],de.prototype,"distance",2);h([w({type:Boolean,reflect:!0})],de.prototype,"open",2);h([w({type:Number})],de.prototype,"skidding",2);h([w({attribute:"show-delay",type:Number})],de.prototype,"showDelay",2);h([w({attribute:"hide-delay",type:Number})],de.prototype,"hideDelay",2);h([w()],de.prototype,"trigger",2);h([w({attribute:"without-arrow",type:Boolean,reflect:!0})],de.prototype,"withoutArrow",2);h([w()],de.prototype,"for",2);h([ze()],de.prototype,"anchor",2);h([W("open",{waitUntilFirstUpdate:!0})],de.prototype,"handleOpenChange",1);h([W("for")],de.prototype,"handleForChange",1);h([W(["distance","placement","skidding"])],de.prototype,"handleOptionsChange",1);h([W("disabled")],de.prototype,"handleDisabledChange",1);de=h([ie("wa-tooltip")],de);var $n=gs(wn());var bn=(e,t,o)=>{let i=new Map;for(let n=t;n<=o;n++)i.set(e[n],n);return i},Ct=bt(class extends rt{constructor(e){if(super(e),e.type!==De.CHILD)throw Error("repeat() can only be used in text expressions")}dt(e,t,o){let i;o===void 0?o=t:t!==void 0&&(i=t);let n=[],c=[],d=0;for(let m of e)n[d]=i?i(m,d):d,c[d]=o(m,d),d++;return{values:c,keys:n}}render(e,t,o){return this.dt(e,t,o).values}update(e,[t,o,i]){let n=ga(e),{values:c,keys:d}=this.dt(t,o,i);if(!Array.isArray(n))return this.ut=d,c;let m=this.ut??=[],v=[],y,C,b=0,S=n.length-1,k=0,$=c.length-1;for(;b<=S&&k<=$;)if(n[b]===null)b++;else if(n[S]===null)S--;else if(m[b]===d[k])v[k]=yt(n[b],c[k]),b++,k++;else if(m[S]===d[$])v[$]=yt(n[S],c[$]),S--,$--;else if(m[b]===d[$])v[$]=yt(n[b],c[$]),Kt(e,v[$+1],n[b]),b++,$--;else if(m[S]===d[k])v[k]=yt(n[S],c[k]),Kt(e,n[b],n[S]),S--,k++;else if(y===void 0&&(y=bn(d,k,$),C=bn(m,b,S)),y.has(m[b]))if(y.has(m[S])){let I=C.get(d[k]),D=I!==void 0?n[I]:null;if(D===null){let B=Kt(e,n[b]);yt(B,c[k]),v[k]=B}else v[k]=yt(D,c[k]),Kt(e,n[b],D),n[I]=null;k++}else Qo(n[S]),S--;else Qo(n[b]),b++;for(;k<=$;){let I=Kt(e,v[$+1]);yt(I,c[k]),v[k++]=I}for(;b<=S;){let I=n[b++];I!==null&&Qo(I)}return this.ut=d,Xo(e,v),xe}});var Cl=[{id:"account",label:"Conta",sortable:!0},{id:"pattern",label:"Padr\xE3o",sortable:!0},{id:"replacement",label:"Substitui\xE7\xE3o",sortable:!0},{id:"category",label:"Categoria",sortable:!0},{id:"memo",label:"Memo",sortable:!0},{id:"actions",label:"A\xE7\xF5es",sortable:!1}],Zr=class extends Fe{static properties={rules:{type:Array},accounts:{type:Array},sortCol:{type:String},sortDir:{type:String},page:{type:Number},pageSize:{type:Number}};createRenderRoot(){return this}constructor(){super(),this.rules=[],this.accounts=[],this.sortCol="pattern",this.sortDir="asc",this.page=1,this.pageSize=20}emit(t,o={}){this.dispatchEvent(new CustomEvent(t,{detail:o,bubbles:!0,composed:!0}))}accountName(t){let o=this.accounts.find(i=>i.id===t);return o?o.id===0?"Todas":o.name.charAt(0).toUpperCase()+o.name.slice(1):""}get sorted(){let t=[...this.rules];return t.sort((o,i)=>{let n=String(this._valueFor(o,this.sortCol)).toLowerCase(),c=String(this._valueFor(i,this.sortCol)).toLowerCase();return n<c?this.sortDir==="asc"?-1:1:n>c?this.sortDir==="asc"?1:-1:0}),t}_valueFor(t,o){switch(o){case"account":return this.accountName(t.accountId);case"pattern":return t.pattern||"";case"replacement":return t.replacement||"";case"category":return t._categoryName||"";case"memo":return t.memoTemplate||"";default:return""}}get paginated(){let t=this.sorted,o=(this.page-1)*this.pageSize;return t.slice(o,o+this.pageSize)}get totalPages(){return Math.max(1,Math.ceil(this.rules.length/this.pageSize))}onSort(t){t.sortable&&(this.sortCol===t.id?this.emit("sort-change",{col:t.id,dir:this.sortDir==="asc"?"desc":"asc"}):this.emit("sort-change",{col:t.id,dir:"asc"}))}onPageClick(t){t<1||t>this.totalPages||t===this.page||this.emit("page-change",{page:t})}sortIcon(t){return this.sortCol!==t?"\u2195":this.sortDir==="asc"?"\u2191":"\u2193"}renderPagination(){let t=this.totalPages;if(t<=1)return N;let o=this.page,i=5,n=Math.max(1,o-Math.floor(i/2)),c=Math.min(t,n+i-1);c-n+1<i&&(n=Math.max(1,c-i+1));let d=[];n>1&&(d.push(1),n>2&&d.push("\u2026"));for(let m=n;m<=c;m++)d.push(m);return c<t&&(c<t-1&&d.push("\u2026"),d.push(t)),O`
            <nav class="mr-pagination" aria-label="Paginação">
                <button class="mr-page-btn" ?disabled=${o===1} @click=${()=>this.onPageClick(o-1)}>‹</button>
                ${d.map(m=>m==="\u2026"?O`<span class="mr-page-ellipsis">…</span>`:O`<button class="mr-page-btn ${m===o?"is-active":""}" @click=${()=>this.onPageClick(m)}>${m}</button>`)}
                <button class="mr-page-btn" ?disabled=${o===t} @click=${()=>this.onPageClick(o+1)}>›</button>
            </nav>
        `}render(){if(this.rules.length===0)return O`<div class="mr-empty">Nenhuma regra para mostrar.</div>`;let t=this.paginated;return O`
            <div class="mr-table-wrap">
                <table class="mr-table">
                    <thead>
                        <tr>
                            ${Cl.map(o=>O`
                                <th class="mr-th mr-th-${o.id} ${o.sortable?"is-sortable":""} ${this.sortCol===o.id?"is-active":""}"
                                    @click=${()=>this.onSort(o)}>
                                    <span>${o.label}</span>
                                    ${o.sortable?O`<span class="mr-sort">${this.sortIcon(o.id)}</span>`:N}
                                </th>
                            `)}
                        </tr>
                    </thead>
                    <tbody>
                        ${Ct(t,o=>o.id,o=>O`
                            <tr class="mr-row ${o.enabled===!1?"is-disabled":""}">
                                <td class="mr-cell mr-cell-account">${this.accountName(o.accountId)||O`<span class="mr-muted">—</span>`}</td>
                                <td class="mr-cell mr-cell-pattern">
                                    <code class="mr-code">${o.pattern}</code>
                                    ${o.isRegex?O`<span class="mr-regex-badge">REGEX</span>`:N}
                                </td>
                                <td class="mr-cell mr-cell-replacement">${o.replacement||O`<span class="mr-muted">—</span>`}</td>
                                <td class="mr-cell mr-cell-category">${o._categoryName||O`<span class="mr-muted">—</span>`}</td>
                                <td class="mr-cell mr-cell-memo">${o.memoTemplate||O`<span class="mr-muted">—</span>`}</td>
                                <td class="mr-cell mr-cell-actions">
                                    <button class="mr-action" title="Editar" @click=${()=>this.emit("rule-edit",{rule:o})}>
                                        <svg viewBox="0 0 16 16" width="13" height="13"><path d="M11.5 1.5l3 3-9 9H2.5v-3l9-9z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
                                    </button>
                                    <button class="mr-action" title=${o.enabled===!1?"Ativar":"Desativar"}
                                            @click=${()=>this.emit("rule-toggle",{id:o.id})}>
                                        ${o.enabled===!1?O`<svg viewBox="0 0 16 16" width="13" height="13"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>`:O`<svg viewBox="0 0 16 16" width="13" height="13"><circle cx="8" cy="8" r="6" fill="currentColor"/></svg>`}
                                    </button>
                                    <button class="mr-action mr-action-danger" title="Remover" @click=${()=>this.emit("rule-remove",{id:o.id})}>
                                        <svg viewBox="0 0 16 16" width="13" height="13"><path d="M3 4h10M6 4v-1.5h4V4M5 4l.5 9h5L11 4M7 7v4M9 7v4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                    </button>
                                </td>
                            </tr>
                        `)}
                    </tbody>
                </table>
            </div>
            ${this.renderPagination()}
        `}};customElements.define("manage-rules-table",Zr);var ei=class extends Fe{static properties={items:{type:Array},emptyText:{type:String}};createRenderRoot(){return this}constructor(){super(),this.items=[],this.emptyText="Nada cadastrado."}emit(t,o={}){this.dispatchEvent(new CustomEvent(t,{detail:o,bubbles:!0,composed:!0}))}render(){return this.items.length?O`
            <div class="chip-grid">
                ${Ct(this.items,t=>t.key,t=>O`
                    <div class="chip ${t.locked?"is-locked":""}" title=${t.tooltip||""}>
                        <span class="chip-label">${t.label}</span>
                        ${t.locked?O`<span class="chip-lock" title="Pré-definido">●</span>`:O`<button class="chip-remove"
                                           title="Remover"
                                           @click=${()=>this.emit("chip-remove",{key:t.key})}>×</button>`}
                    </div>
                `)}
            </div>
        `:O`<div class="chip-empty">${this.emptyText}</div>`}};customElements.define("chip-list",ei);var kl="__hidden__",dr="__local_ungrouped__";function yn(e){let t=String(e||"").trim();if(!t)return{group:"",leaf:"",original:t};let o=t.indexOf(":");return o===-1?{group:"",leaf:t,original:t}:{group:t.slice(0,o).trim(),leaf:t.slice(o+1).trim()||t,original:t}}var ti=class extends Fe{static properties={cache:{type:Object},localCategories:{type:Array},rulesByCategoryId:{type:Object},connected:{type:Boolean},budgetId:{type:String},syncing:{type:Boolean,reflect:!0},collapsed:{type:Object,state:!0},editing:{type:Object,state:!0}};createRenderRoot(){return this}constructor(){super(),this.cache=null,this.localCategories=[],this.rulesByCategoryId={},this.connected=!1,this.budgetId="",this.syncing=!1,this.collapsed={},this.editing=null}beginEditCategory(t){this.editing={kind:"cat",key:t.original,value:t.name},this.updateComplete.then(()=>this.focusEditInput())}beginEditGroup(t){t&&(this.editing={kind:"group",key:t,value:t},this.updateComplete.then(()=>this.focusEditInput()))}beginAddInGroup(t){this.editing={kind:"add",key:t,value:""},this.updateComplete.then(()=>{this.focusEditInput(),this._outsideClickHandler=o=>{let i=this.querySelector(".ct-popover"),n=this.querySelector(`.ct-group-add-btn[data-group="${CSS.escape(t)}"]`);i&&!i.contains(o.target)&&n!==o.target&&!n?.contains(o.target)&&this.commitEdit(!1)},setTimeout(()=>document.addEventListener("mousedown",this._outsideClickHandler),0)})}focusEditInput(){let t=this.querySelector(".ct-edit-input, .ct-popover-input");t&&(t.focus(),t.select())}onEditInput(t){this.editing&&(this.editing={...this.editing,value:t.target.value})}onEditKey(t){t.key==="Enter"?(t.preventDefault(),this.commitEdit(!0)):t.key==="Escape"&&(t.preventDefault(),this.commitEdit(!1))}commitEdit(t){let o=this.editing;if(this.editing=null,this._outsideClickHandler&&(document.removeEventListener("mousedown",this._outsideClickHandler),this._outsideClickHandler=null),!t||!o)return;let i=String(o.value||"").trim();if(i){if(o.kind==="cat"){let n=yn(o.key),c=n.group?`${n.group}: ${i}`:i;if(c.toLowerCase()===o.key.toLowerCase())return;this.emit("category-rename",{oldName:o.key,newName:c})}else if(o.kind==="group"){if(i.toLowerCase()===o.key.toLowerCase())return;this.emit("group-rename",{oldGroup:o.key,newGroup:i})}else if(o.kind==="add"){let n=`${o.key}: ${i}`;this.emit("category-add",{fullName:n})}}}disconnectedCallback(){super.disconnectedCallback(),this._outsideClickHandler&&(document.removeEventListener("mousedown",this._outsideClickHandler),this._outsideClickHandler=null)}emit(t,o={}){this.dispatchEvent(new CustomEvent(t,{detail:o,bubbles:!0,composed:!0}))}onSync(){this.syncing||this.emit("category-sync")}onToggleGroup(t){this.collapsed={...this.collapsed,[t]:!this.collapsed[t]}}formatRelativeTime(t){if(!t)return"nunca";let o=Date.now()-t;if(o<6e4)return"agora h\xE1 pouco";let i=Math.floor(o/6e4);if(i<60)return`${i} min atr\xE1s`;let n=Math.floor(i/60);if(n<24)return`${n} h atr\xE1s`;let c=Math.floor(n/24);return`${c} dia${c===1?"":"s"} atr\xE1s`}renderStatusBar(){if(!this.connected&&!this.budgetId)return O`
                <div class="ct-status ct-status-offline">
                    <span>Conecte-se ao YNAB e escolha um orçamento na aba <a href="#tab-ynab">YNAB</a> pra sincronizar as categorias.</span>
                </div>
            `;if(!this.connected&&this.budgetId)return O`
                <div class="ct-status ct-status-offline">
                    <span>Sessão YNAB expirou. Reconecte na aba <a href="#tab-ynab">YNAB</a>.</span>
                </div>
            `;if(!this.cache)return O`
                <div class="ct-status ct-status-onboard">
                    <span>YNAB conectado mas nunca sincronizou.</span>
                    <wa-button variant="brand" size="small" @click=${this.onSync} ?loading=${this.syncing}>
                        Sincronizar pela primeira vez
                    </wa-button>
                </div>
            `;let t=Object.keys(this.cache.byId||{}).length;return O`
            <div class="ct-status ct-status-synced">
                <div class="ct-status-text">
                    <strong>Sincronizado com YNAB</strong> · ${t} categoria${t===1?"":"s"}
                    <span class="ct-status-meta">Última sync ${this.formatRelativeTime(this.cache.syncedAt)}</span>
                </div>
                <wa-button appearance="outlined" size="small" @click=${this.onSync} ?loading=${this.syncing}>
                    Sincronizar agora
                </wa-button>
            </div>
        `}onRemoveLocal(t,o){confirm(`Remover a categoria "${o}"?`)&&this.emit("chip-remove",{key:t})}renderCategoryRow(t,o={}){let i=o.rulesKeyByOriginal?t.original||t.name:t.id,n=this.rulesByCategoryId[i]||this.rulesByCategoryId[t.name]||0,c=!!o.orphan,d=!!o.removable,m=t.original||t.name,v=d&&this.editing?.kind==="cat"&&this.editing.key===m;return O`
            <div class="ct-category ${c?"is-orphan":""}" title=${d?'Duplo-clique para renomear \xB7 "\xD7" para remover':"Para renomear, edite no YNAB e sincronize."}>
                ${v?O`<input class="ct-edit-input ct-edit-input-leaf"
                                  .value=${this.editing.value}
                                  @input=${this.onEditInput}
                                  @keydown=${this.onEditKey}
                                  @blur=${()=>this.commitEdit(!0)}>`:O`<span class="ct-category-name"
                                 @dblclick=${d?C=>{C.stopPropagation(),this.beginEditCategory(t)}:null}>${t.name}</span>`}
                ${o.badge?O`<span class="ct-category-badge">${o.badge}</span>`:N}
                ${n>0?O`<span class="ct-category-count">${n} regra${n===1?"":"s"}</span>`:N}
                ${d&&!v?O`<button type="button" class="ct-category-remove" title="Remover"
                                   @click=${()=>this.onRemoveLocal(m,m)}>×</button>`:N}
            </div>
        `}renderGroup(t,o,i,n={}){let c=!!this.collapsed[t],d=c?"\u25B8":"\u25BE",m=i.length,v=n.tone==="is-local",y=!!n.removable,C=v?o:null,b=y&&this.editing?.kind==="group"&&this.editing.key===C,S=y&&this.editing?.kind==="add"&&this.editing.key===C;return O`
            <div class="ct-group ${n.tone||""}">
                <div class="ct-group-head-row"
                     role="button"
                     tabindex="0"
                     @click=${()=>this.onToggleGroup(t)}
                     @keydown=${k=>{(k.key==="Enter"||k.key===" ")&&(k.preventDefault(),this.onToggleGroup(t))}}>
                    <span class="ct-group-arrow">${d}</span>
                    <span class="ct-group-label">
                        ${b?O`<input class="ct-edit-input"
                                          .value=${this.editing.value}
                                          @click=${k=>k.stopPropagation()}
                                          @input=${this.onEditInput}
                                          @keydown=${this.onEditKey}
                                          @blur=${()=>this.commitEdit(!0)}>`:O`<span class="ct-group-label-text"
                                         @dblclick=${y?k=>{k.stopPropagation(),this.beginEditGroup(C)}:null}
                                         title=${y?"Duplo-clique para renomear o grupo":""}>${o}</span>`}
                        ${v?O`<span class="ct-group-label-tag">local</span>`:N}
                        ${y&&!b?O`<span class="ct-group-add-wrap">
                                    <button type="button" class="ct-group-add-btn"
                                            data-group=${C}
                                            title="Adicionar categoria neste grupo"
                                            @click=${k=>{k.stopPropagation(),this.beginAddInGroup(C)}}>
                                        <svg viewBox="0 0 12 12" width="10" height="10" aria-hidden="true">
                                            <path d="M6 1.5v9M1.5 6h9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                        </svg>
                                    </button>
                                    ${S?this.renderAddPopover(o):N}
                                </span>`:N}
                    </span>
                    <span class="ct-group-count">${m}</span>
                </div>
                ${c?N:O`
                    <div class="ct-group-body">
                        ${Ct(i,k=>k.id,k=>this.renderCategoryRow(k,n))}
                    </div>
                `}
            </div>
        `}renderAddPopover(t){return O`
            <div class="ct-popover" role="dialog" @click=${o=>o.stopPropagation()}>
                <div class="ct-popover-arrow"></div>
                <input class="ct-popover-input"
                       type="text"
                       placeholder="Nova categoria"
                       .value=${this.editing.value}
                       @input=${this.onEditInput}
                       @keydown=${this.onEditKey}>
                <div class="ct-popover-actions">
                    <button type="button"
                            class="ct-popover-btn ct-popover-btn-cancel"
                            @click=${()=>this.commitEdit(!1)}>Cancelar</button>
                    <button type="button"
                            class="ct-popover-btn ct-popover-btn-ok"
                            @click=${()=>this.commitEdit(!0)}>OK</button>
                </div>
            </div>
        `}render(){let t=this.cache?.categoryGroups||[],o=this.cache?.byId||{},i=[],n=[];for(let b of t){let S=b.categories.filter($=>!$.hidden&&!b.hidden),k=b.categories.filter($=>$.hidden||b.hidden);S.length>0&&i.push({id:b.id,name:b.name,categories:S}),n.push(...k)}let c=new Set;for(let b in o)c.add(String(o[b].name).toLowerCase());let d=(this.localCategories||[]).filter(b=>o[b.id]?!1:!c.has(String(b.name).toLowerCase())),m=new Map;for(let b of d){let S=yn(b.name),k=S.group||dr;m.has(k)||m.set(k,[]),m.get(k).push({id:b.id,name:S.leaf,original:S.original})}let v=Array.from(m.entries()).sort((b,S)=>b[0]===dr?1:S[0]===dr?-1:b[0].localeCompare(S[0])),y=v.length>0,C=i.length>0||n.length>0;return O`
            <div class="ct-host">
                ${this.renderStatusBar()}
                <div class="ct-groups">
                    ${Ct(i,b=>b.id,b=>this.renderGroup(b.id,b.name,b.categories))}
                    ${n.length>0?this.renderGroup(kl,"Ocultas no YNAB",n,{tone:"is-muted"}):N}
                    ${y?Ct(v,([b])=>`local-${b}`,([b,S])=>{let k=b===dr?"Sem grupo":b;return this.renderGroup(`local-${b}`,k,S,{tone:"is-local",removable:!0,rulesKeyByOriginal:!0})}):N}
                    ${!C&&!y?O`<div class="ct-empty">Nada por aqui ainda. Adicione uma categoria pelo formulário acima ou sincronize com o YNAB.</div>`:N}
                </div>
            </div>
        `}};customElements.define("category-tree",ti);var vt=typeof browser<"u"?browser.runtime:chrome.runtime,xn=typeof browser<"u"?browser.storage:chrome.storage,A={rules:[],accounts:[],categories:[],editingRuleId:null,sortCol:"pattern",sortDir:"asc",page:1,pageSize:20,searchTerm:"",activeTab:"rules",ynabConfig:null,ynabBudgets:[],ynabAccounts:[],ynabCategoriesCache:null,categoriesSyncing:!1},g={},st=null,Ne=null,oi=null;document.addEventListener("DOMContentLoaded",_l);async function _l(){Sl(),await StorageManager.init(),El(),await Ll(),await mr(),await kt(),await lt(),Al(),Kl(),Cn(),window.addEventListener("hashchange",Cn)}async function Ll(){try{let e=await vt.sendMessage({type:"YNAB_GET_CONFIG"});e?.ok&&(A.ynabConfig=e.config)}catch{}}function Sl(){g.railItems=Array.from(document.querySelectorAll(".rail-item[data-section]")),g.tabs={rules:document.getElementById("tab-rules"),categories:document.getElementById("tab-categories"),accounts:document.getElementById("tab-accounts"),ynab:document.getElementById("tab-ynab")},g.counts={rules:document.querySelector('[data-count="rules"]'),categories:document.querySelector('[data-count="categories"]'),accounts:document.querySelector('[data-count="accounts"]')},g.btnExport=document.getElementById("btn-export"),g.btnImport=document.getElementById("btn-import"),g.importFile=document.getElementById("import-file"),g.rulesTable=document.getElementById("rules-table"),g.rulesSearch=document.getElementById("rules-search"),g.rulesFooter=document.getElementById("rules-footer-info"),g.ruleDialog=document.getElementById("rule-dialog"),g.openRuleDialogBtn=document.getElementById("open-rule-dialog-btn"),g.addRuleForm=document.getElementById("add-rule-form"),g.ruleAccount=document.getElementById("rule-account"),g.ruleCategory=document.getElementById("rule-category"),g.rulePattern=document.getElementById("rule-pattern"),g.ruleReplacement=document.getElementById("rule-replacement"),g.ruleMemo=document.getElementById("rule-memo"),g.ruleRegex=document.getElementById("rule-regex"),g.memoField=document.getElementById("memo-field"),g.ruleFormHint=document.getElementById("rule-form-hint"),g.submitBtn=document.getElementById("submit-btn"),g.cancelBtn=document.getElementById("cancel-btn"),g.categoriesTree=document.getElementById("categories-tree"),g.categoriesToolbarFallback=document.getElementById("categories-toolbar-fallback"),g.addCategoryForm=document.getElementById("add-category-form"),g.categoryName=document.getElementById("category-name"),g.categoriesFooter=document.getElementById("categories-footer-info"),g.accountsList=document.getElementById("accounts-list"),g.addAccountForm=document.getElementById("add-account-form"),g.accountName=document.getElementById("account-name"),g.accountsFooter=document.getElementById("accounts-footer-info"),g.ynabStatusIcon=document.getElementById("ynab-status-icon"),g.ynabSetupCard=document.getElementById("ynab-setup-card"),g.ynabConnectCard=document.getElementById("ynab-connect-card"),g.ynabBudgetCard=document.getElementById("ynab-budget-card"),g.ynabMappingCard=document.getElementById("ynab-mapping-card"),g.ynabStatus=document.getElementById("ynab-status"),g.ynabConnectBtn=document.getElementById("ynab-connect-btn"),g.ynabDisconnectBtn=document.getElementById("ynab-disconnect-btn"),g.ynabRedirectInput=document.getElementById("ynab-redirect-uri"),g.ynabCopyRedirect=document.getElementById("ynab-copy-redirect"),g.ynabBudgetSelect=document.getElementById("ynab-budget-select"),g.ynabMappingRows=document.getElementById("ynab-mapping-rows"),g.ynabSaveMappingBtn=document.getElementById("ynab-save-mapping-btn"),g.ynabFooter=document.getElementById("ynab-footer-info"),g.toast=document.getElementById("toast"),g.toastMsg=document.getElementById("toast-msg")}function El(){try{let e=chrome.runtime.getManifest(),t=document.querySelector(".version");t&&e.version&&(t.textContent=`v${e.version}`)}catch{}}function Al(){g.railItems.forEach(e=>{e.addEventListener("click",t=>{t.preventDefault();let o=e.dataset.section;location.hash=`#tab-${o}`})}),g.btnExport.addEventListener("click",async()=>{try{await StorageManager.exportData(),U("Exporta\xE7\xE3o iniciada.","success")}catch(e){U(`Falha ao exportar: ${e.message||e}`,"danger")}}),g.btnImport.addEventListener("click",()=>g.importFile.click()),g.importFile.addEventListener("change",async e=>{let t=e.target.files&&e.target.files[0];if(t){if(!confirm("Importar substituir\xE1 regras, categorias e contas atuais. Deseja continuar?")){e.target.value="";return}try{await StorageManager.importData(t),U("Importa\xE7\xE3o conclu\xEDda.","success"),await mr(),await kt(),await lt(),ii(),ai()}catch(o){U(`Falha ao importar: ${o.message||o}`,"danger")}finally{e.target.value=""}}}),g.openRuleDialogBtn.addEventListener("click",()=>_n()),g.submitBtn.addEventListener("click",kn),g.cancelBtn.addEventListener("click",()=>Ln()),g.addRuleForm.addEventListener("submit",e=>{e.preventDefault(),kn()}),g.ruleRegex.addEventListener("change",e=>{g.memoField.hidden=!e.target.checked}),g.rulesSearch.addEventListener("input",e=>{A.searchTerm=e.target.value.toLowerCase(),A.page=1,ur()}),g.rulesTable.addEventListener("sort-change",e=>{A.sortCol=e.detail.col,A.sortDir=e.detail.dir,ur()}),g.rulesTable.addEventListener("page-change",e=>{A.page=e.detail.page,ur()}),g.rulesTable.addEventListener("rule-edit",e=>Tl(e.detail.rule)),g.rulesTable.addEventListener("rule-toggle",e=>Ml(e.detail.id)),g.rulesTable.addEventListener("rule-remove",e=>Fl(e.detail.id)),g.addCategoryForm.addEventListener("submit",e=>{e.preventDefault(),Nl()}),g.categoriesTree.addEventListener("chip-remove",e=>ql(e.detail.key)),g.categoriesTree.addEventListener("category-sync",()=>Dl()),g.categoriesTree.addEventListener("category-rename",e=>Vl(e.detail.oldName,e.detail.newName)),g.categoriesTree.addEventListener("group-rename",e=>Hl(e.detail.oldGroup,e.detail.newGroup)),g.categoriesTree.addEventListener("category-add",e=>Ul(e.detail.fullName)),xn?.onChanged?.addListener&&xn.onChanged.addListener((e,t)=>{t==="local"&&(e.ynab_categories&&StorageManager.getYnabCategoriesCache().then(o=>{A.ynabCategoriesCache=o,no()}),e.ynab_config&&vt.sendMessage({type:"YNAB_GET_CONFIG"}).then(o=>{o?.ok&&(A.ynabConfig=o.config,ni(),no())}),e.payee_rules&&lt())}),g.addAccountForm.addEventListener("submit",e=>{e.preventDefault(),Wl()}),g.accountsList.addEventListener("chip-remove",e=>Yl(parseInt(e.detail.key,10))),Gl()}var $l={"#tab-rules":"rules","#tab-categories":"categories","#tab-accounts":"accounts","#tab-ynab":"ynab"};function Cn(){let e=$l[(location.hash||"").toLowerCase()]||"rules";Ol(e)}function Ol(e){A.activeTab=e,Object.entries(g.tabs).forEach(([t,o])=>o.classList.toggle("is-active",t===e)),g.railItems.forEach(t=>t.classList.toggle("is-active",t.dataset.section===e)),e==="ynab"&&Xl()}function hr(){g.counts.rules&&(g.counts.rules.textContent=String(A.rules.length)),g.counts.categories&&(g.counts.categories.textContent=String(A.categories.length)),g.counts.accounts&&(g.counts.accounts.textContent=String(A.accounts.length))}async function lt(){let[e,t,o]=await Promise.all([StorageManager.getPayeeRules(),StorageManager.getAccounts(),StorageManager.getCategories()]);A.accounts=t,A.categories=o;let i=new Map(o.map(c=>[c.id,c.name])),n=A.ynabCategoriesCache?.byId||{};A.rules=e.map(c=>({...c,_categoryName:zl(c,n,i)})),hr(),ur()}function zl(e,t,o){return e?e.categoryId&&t[e.categoryId]?t[e.categoryId].name:e._orphanCategory&&e.categoryId&&!t[e.categoryId]&&Object.keys(t).length>0?`${e.category||"(removida no YNAB)"}`:e.categoryId&&o.has(e.categoryId)?o.get(e.categoryId):e.category||"":""}function Il(){let e=A.searchTerm.trim().toLowerCase();return e?A.rules.filter(t=>{let o=A.accounts.find(c=>c.id===t.accountId);return[o?o.id===0?"Todas":o.name:"",t.pattern,t.replacement,t._categoryName,t.memoTemplate].map(c=>String(c||"").toLowerCase()).join(" ").includes(e)}):A.rules}function ur(){let e=Il();g.rulesTable.rules=e,g.rulesTable.accounts=A.accounts,g.rulesTable.sortCol=A.sortCol,g.rulesTable.sortDir=A.sortDir,g.rulesTable.page=A.page,g.rulesTable.pageSize=A.pageSize,g.rulesTable.requestUpdate();let t=e.length,o=A.rules.length;g.rulesFooter.textContent=t===o?`${t} regra${t===1?"":"s"}`:`${t} de ${o} regras (filtradas)`}function _n(e=null){e?(A.editingRuleId=e.id,g.ruleDialog.setAttribute("label","Editar regra"),g.ruleFormHint.textContent=e.pattern?`Editando: ${e.pattern}`:"",g.submitBtn.textContent="Salvar altera\xE7\xF5es",st&&st.setValue(String(e.accountId),!0),g.rulePattern.value=e.pattern||"",g.ruleReplacement.value=e.replacement||"",Ne&&(e._categoryName?(Ne.options[e._categoryName]||Ne.addOption({value:e._categoryName,text:e._categoryName}),Ne.setValue(e._categoryName,!0)):Ne.clear(!0)),g.ruleRegex.checked=!!e.isRegex,g.ruleMemo.value=e.memoTemplate||"",g.memoField.hidden=!e.isRegex):(Sn(),g.ruleDialog.setAttribute("label","Nova regra"),g.submitBtn.textContent="Adicionar regra"),g.ruleDialog.open=!0}function Ln(){g.ruleDialog.open=!1,Sn()}function Sn(){A.editingRuleId=null,st&&st.clear(!0),Ne&&Ne.clear(!0),g.rulePattern.value="",g.ruleReplacement.value="",g.ruleMemo.value="",g.ruleRegex.checked=!1,g.memoField.hidden=!0,g.ruleFormHint.textContent=""}async function kn(){let e=st?st.getValue():g.ruleAccount.value,t=e===""?NaN:parseInt(e,10);if(Number.isNaN(t)){U("Conta \xE9 obrigat\xF3ria.","danger");return}let o=g.rulePattern.value.trim();if(!o){U("Padr\xE3o \xE9 obrigat\xF3rio.","danger");return}let i=g.ruleRegex.checked;if(i)try{new RegExp(o)}catch{U("Regex inv\xE1lida.","danger");return}let n=Ne?(Ne.getValue()||"").trim():g.ruleCategory.value.trim(),c=A.categories.find(v=>v.name.toLowerCase()===n.toLowerCase()),d=c?String(c.id):"",m={accountId:t,pattern:o,replacement:g.ruleReplacement.value.trim(),categoryId:d,category:n,isRegex:i,memoTemplate:i?g.ruleMemo.value.trim():""};if(A.editingRuleId){let v=await StorageManager.getPayeeRules(),y=v.findIndex(C=>C.id===A.editingRuleId);y!==-1&&(v[y]={...v[y],...m},await StorageManager.setPayeeRules(v)),U("Regra atualizada.","success")}else await StorageManager.addPayeeRule(m),U("Regra criada.","success");Ln(),A.page=1,await lt()}function Tl(e){_n(e)}async function Fl(e){if(!confirm("Remover esta regra?"))return;await StorageManager.removePayeeRule(e);let t=await StorageManager.getPayeeRules(),o=Math.max(1,Math.ceil(t.length/A.pageSize));A.page>o&&(A.page=o),await lt()}async function Ml(e){let o=(await StorageManager.getPayeeRules()).find(i=>i.id===e);o&&(await StorageManager.updatePayeeRule(e,{enabled:o.enabled===!1}),await lt())}async function kt(){A.categories=await StorageManager.getCategories(),A.ynabCategoriesCache=await StorageManager.getYnabCategoriesCache(),no(),hr(),ai()}function fr(){return!!A.ynabConfig?.connected}function Bl(){return fr()&&!!A.ynabConfig?.budgetId}function no(){g.categoriesTree&&(g.categoriesTree.hidden=!1,g.categoriesTree.connected=Bl(),g.categoriesTree.budgetId=A.ynabConfig?.budgetId||"",g.categoriesTree.cache=A.ynabCategoriesCache,g.categoriesTree.localCategories=A.categories,g.categoriesTree.rulesByCategoryId=Rl(),g.categoriesTree.syncing=A.categoriesSyncing,g.categoriesTree.requestUpdate());let e=!!A.ynabCategoriesCache;g.categoriesToolbarFallback&&(g.categoriesToolbarFallback.hidden=e);let t=Object.keys(A.ynabCategoriesCache?.byId||{}).length;if(t>0){let o=Pl();g.categoriesFooter.textContent=`${t} no YNAB${o?` \xB7 ${o} locais sem correspond\xEAncia`:""}`}else fr()?g.categoriesFooter.textContent="YNAB conectado \xB7 sincronize pra carregar as categorias.":g.categoriesFooter.textContent=`${A.categories.length} categoria${A.categories.length===1?"":"s"} local${A.categories.length===1?"":"is"} \xB7 sem YNAB`}function Rl(){let e={};for(let t of A.rules||[]){let o=t.categoryId||t.category||"";o&&(e[o]=(e[o]||0)+1)}return e}function Pl(){let e=A.ynabCategoriesCache;if(!e)return 0;let t=e.byId||{},o=new Set(Object.values(t).map(i=>String(i.name).toLowerCase()));return(A.categories||[]).filter(i=>t[i.id]?!1:!o.has(String(i.name).toLowerCase())).length}async function Dl(){if(!A.categoriesSyncing){if(!fr()){U("Conecte-se ao YNAB antes de sincronizar.","warn");return}A.categoriesSyncing=!0,no();try{let e=await vt.sendMessage({type:"YNAB_LIST_CATEGORIES"});if(!e?.ok){U(e?.error||"Falha ao sincronizar categorias.","danger");return}await kt(),await lt();let{totalCategories:t,hiddenCount:o,migration:i}=e,n=[`${t} categoria${t===1?"":"s"}`];o&&n.push(`${o} oculta${o===1?"":"s"}`),i?.migrated&&n.push(`${i.migrated} regra${i.migrated===1?"":"s"} migrada${i.migrated===1?"":"s"}`),i?.orphan&&n.push(`${i.orphan} \xF3rf\xE3${i.orphan===1?"":"s"}`),U(`Sincronizado \xB7 ${n.join(" \xB7 ")}`,"success")}catch(e){U(`Falha ao sincronizar: ${e.message||e}`,"danger")}finally{A.categoriesSyncing=!1,no()}}}async function Nl(){let e=g.categoryName.value.trim();if(e){if(A.categories.some(t=>t.name.toLowerCase()===e.toLowerCase())){U("Categoria j\xE1 existe.","warn");return}await StorageManager.setCategories(A.categories.concat([{name:e}])),g.categoryName.value="",await kt(),U(`Categoria "${e}" adicionada.`,"success")}}async function ql(e){confirm(`Remover categoria "${e}"?`)&&(await StorageManager.setCategories(A.categories.filter(t=>t.name!==e)),await lt(),await kt())}async function Vl(e,t){try{let o=await StorageManager.renameLocalCategory(e,t);await lt(),await kt();let i=o.changed>0?` \xB7 ${o.changed} regra${o.changed===1?"":"s"} atualizada${o.changed===1?"":"s"}`:"";U(`Categoria renomeada${i}.`,"success")}catch(o){U(o.message||"Falha ao renomear.","danger")}}async function Hl(e,t){try{let o=await StorageManager.renameLocalCategoryGroup(e,t);await lt(),await kt(),U(`Grupo renomeado \xB7 ${o.categoryChanged} categoria${o.categoryChanged===1?"":"s"} \xB7 ${o.rulesChanged} regra${o.rulesChanged===1?"":"s"}.`,"success")}catch(o){U(o.message||"Falha ao renomear grupo.","danger")}}async function Ul(e){let t=String(e||"").trim();if(t){if(A.categories.some(o=>o.name.toLowerCase()===t.toLowerCase())){U(`Categoria "${t}" j\xE1 existe.`,"warn");return}await StorageManager.setCategories(A.categories.concat([{name:t}])),await kt(),U(`Categoria "${t}" adicionada.`,"success")}}async function mr(){A.accounts=await StorageManager.getAccounts(),jl(),hr(),ii()}function jl(){g.accountsList.items=A.accounts.map(e=>({key:String(e.id),label:e.id===0?"Todas as contas (coringa)":e.name,locked:e.id>=0&&e.id<=3,tooltip:e.id>=0&&e.id<=3?"Conta pr\xE9-definida \u2014 n\xE3o pode ser removida":""})),g.accountsList.emptyText="Nenhuma conta cadastrada.",g.accountsList.requestUpdate(),g.accountsFooter.textContent=`${A.accounts.length} conta${A.accounts.length===1?"":"s"}`}async function Wl(){let e=g.accountName.value.trim();if(e){if(A.accounts.some(t=>t.name.toLowerCase()===e.toLowerCase())){U("Conta j\xE1 existe.","warn");return}await StorageManager.addAccount({name:e}),g.accountName.value="",await mr(),U(`Conta "${e}" adicionada.`,"success")}}async function Yl(e){let t=A.accounts.find(o=>o.id===e);t&&confirm(`Remover conta "${t.name}"?`)&&(await StorageManager.removeAccount(e),await mr())}function Kl(){let{TomSelect:e}=window.__manageDeps||{};e&&(ii(),ai())}function ii(){let{TomSelect:e}=window.__manageDeps||{};!e||!g.ruleAccount||(st&&(st.destroy(),st=null),g.ruleAccount.innerHTML='<option value="">Selecione\u2026</option>',A.accounts.forEach(t=>{let o=document.createElement("option");o.value=String(t.id),o.textContent=t.id===0?"Todas as contas":t.name,g.ruleAccount.appendChild(o)}),st=new e(g.ruleAccount,{create:!1,maxItems:1,sortField:{field:"text",direction:"asc"}}))}function ai(){let{TomSelect:e}=window.__manageDeps||{};if(!e||!g.ruleCategory)return;Ne&&(Ne.destroy(),Ne=null);let t=fr()&&A.ynabCategoriesCache;if(g.ruleCategory.innerHTML='<option value="">Opcional</option>',t){let o=A.ynabCategoriesCache.categoryGroups||[];for(let i of o){let n=document.createElement("optgroup");n.label=i.name;for(let c of i.categories){if(c.hidden)continue;let d=document.createElement("option");d.value=c.name,d.textContent=c.name,d.dataset.uuid=c.id,n.appendChild(d)}g.ruleCategory.appendChild(n)}}else A.categories.forEach(o=>{let i=document.createElement("option");i.value=o.name,i.textContent=o.name,g.ruleCategory.appendChild(i)});Ne=new e(g.ruleCategory,{create:!t,createOnBlur:!t,persist:!1,maxItems:1,optgroupField:"optgroup",sortField:{field:"text",direction:"asc"},onItemAdd:async o=>{if(t)return;let i=String(o||"").trim();i&&(A.categories.some(n=>n.name.toLowerCase()===i.toLowerCase())||(await StorageManager.setCategories(A.categories.concat([{name:i}])),A.categories=await StorageManager.getCategories(),no(),hr(),U(`Categoria "${i}" adicionada.`,"success")))}})}function Gl(){g.ynabCopyRedirect.addEventListener("click",async()=>{try{await navigator.clipboard?.writeText(g.ynabRedirectInput.value),U("Redirect URI copiada.","success")}catch{U("Selecione e copie manualmente (Ctrl+C).","warn")}}),g.ynabConnectBtn.addEventListener("click",async()=>{if(!A.ynabConfig?.clientId){U("Configure ynab-config.js antes de conectar.","warn");return}U("Abrindo popup de autentica\xE7\xE3o YNAB\u2026");let e=await vt.sendMessage({type:"YNAB_CONNECT"});if(!e?.ok){U(e?.error||"Falha ao conectar.","danger");return}A.ynabConfig=e.config,U("Conectado.","success"),await ri(),await En()}),g.ynabDisconnectBtn.addEventListener("click",async()=>{let e=await vt.sendMessage({type:"YNAB_DISCONNECT"});if(!e?.ok){U(e?.error||"Falha ao desconectar.","danger");return}A.ynabConfig=e.config,A.ynabBudgets=[],A.ynabAccounts=[],U("Desconectado.","success"),ri(),g.ynabBudgetCard.hidden=!0,g.ynabMappingCard.hidden=!0}),g.ynabBudgetSelect.addEventListener("change",async e=>{let t=e.target.value;t&&await An(t)}),g.ynabSaveMappingBtn.addEventListener("click",async()=>{let e=g.ynabBudgetSelect.value,t={};document.querySelectorAll("[data-bank-group]").forEach(i=>{let n=i.dataset.bankGroup,c=[];i.querySelectorAll('input[type="checkbox"]:checked').forEach(d=>{c.push({id:d.value,name:d.dataset.accountName||""})}),c.length>0&&(t[n]=c)});let o=await vt.sendMessage({type:"YNAB_SAVE_MAPPING",budgetId:e,accountMap:t});if(!o?.ok){U(o?.error||"Falha ao salvar mapeamento.","danger");return}A.ynabConfig=o.config,ni(),U("Mapeamento salvo. A sidebar j\xE1 reflete a mudan\xE7a.","success")})}async function Xl(){await ri(),A.ynabConfig?.connected&&await En()}async function ri(){let e=await vt.sendMessage({type:"YNAB_GET_CONFIG"});if(!e?.ok){g.ynabStatus.textContent="Erro ao ler configura\xE7\xE3o YNAB.";return}A.ynabConfig=e.config;let t=A.ynabConfig;g.ynabRedirectInput.value=t.redirectUri||"(redirect URI indispon\xEDvel \u2014 recarregue a extens\xE3o)";let o=!!t.clientId;if(g.ynabSetupCard.hidden=o,g.ynabConnectCard.hidden=!o,ni(),!!o)if(t.connected){let i=t.tokenExpiresAt?Math.max(0,t.tokenExpiresAt-Date.now()):0,n=Math.floor(i/6e4),c=t.userEmail||"usu\xE1rio YNAB";g.ynabStatus.innerHTML=`<strong>Conectado</strong> como ${c} \xB7 token expira em ~${n} min`,g.ynabConnectBtn.hidden=!0,g.ynabDisconnectBtn.hidden=!1,pr("ynab-connect-card","done")}else g.ynabStatus.textContent='N\xE3o conectado. Clique em "Conectar ao YNAB" para autenticar.',g.ynabConnectBtn.hidden=!1,g.ynabDisconnectBtn.hidden=!0,pr("ynab-connect-card","active")}function ni(){let e=A.ynabConfig,t=!!e?.connected,o=t&&!!e?.budgetId&&e?.accountMap&&Object.keys(e.accountMap).length>0;g.ynabStatusIcon&&(g.ynabStatusIcon.classList.toggle("is-connected",t),g.ynabStatusIcon.classList.toggle("is-warn",t&&!o),g.ynabStatusIcon.title=t?o?"YNAB conectado":"YNAB conectado \xB7 mapeamento pendente":"YNAB desconectado");let i=g.railItems.find(n=>n.dataset.section==="ynab");i&&(i.classList.toggle("is-ready",o),i.classList.toggle("is-warn",t&&!o))}async function En(){let e=await vt.sendMessage({type:"YNAB_LIST_BUDGETS"});if(!e?.ok){U(e?.error||"Falha ao listar or\xE7amentos.","danger");return}A.ynabBudgets=e.budgets,g.ynabBudgetSelect.innerHTML='<option value="">Selecione um or\xE7amento</option>',e.budgets.forEach(t=>{let o=document.createElement("option");o.value=t.id,o.textContent=t.name,g.ynabBudgetSelect.appendChild(o)}),g.ynabBudgetCard.hidden=!1,pr("ynab-budget-card",A.ynabConfig?.budgetId?"done":"active"),A.ynabConfig?.budgetId&&(g.ynabBudgetSelect.value=A.ynabConfig.budgetId,await An(A.ynabConfig.budgetId))}async function An(e){let t=await vt.sendMessage({type:"YNAB_LIST_ACCOUNTS",budgetId:e});if(!t?.ok){U(t?.error||"Falha ao listar contas.","danger");return}A.ynabAccounts=t.accounts;let o=Object.values(BankUtils.ACCOUNTS).filter(n=>n.accountId!=="all");g.ynabMappingRows.innerHTML="";let i=A.ynabConfig?.accountMap||{};o.forEach(n=>{let c=new Set((i[n.accountId]||[]).map(C=>C.id||C)),d=document.createElement("div");d.className="ynab-mapping-group",d.dataset.bankGroup=n.accountId;let m=document.createElement("div");m.className="ynab-mapping-head",m.textContent=n.displayName,d.appendChild(m);let v=document.createElement("div");v.className="ynab-mapping-hint",v.textContent="Marque todas as contas YNAB que recebem transa\xE7\xF5es deste tipo.",d.appendChild(v);let y=document.createElement("div");y.className="ynab-mapping-options",A.ynabAccounts.forEach(C=>{let b=document.createElement("label");b.className="cbx";let S=document.createElement("input");S.type="checkbox",S.value=C.id,S.dataset.accountName=C.name,c.has(C.id)&&(S.checked=!0),b.appendChild(S);let k=document.createElement("span");k.textContent=`${C.name}`;let $=document.createElement("span");$.style.color="var(--muted)",$.style.marginLeft="4px",$.textContent=`(${C.type})`,k.appendChild($),b.appendChild(k),y.appendChild(b)}),d.appendChild(y),g.ynabMappingRows.appendChild(d)}),g.ynabMappingCard.hidden=!1,pr("ynab-mapping-card",Object.keys(i).length>0?"done":"active")}function pr(e,t){let o=document.getElementById(e);o&&(o.classList.remove("is-active","is-done"),t==="active"?o.classList.add("is-active"):t==="done"&&o.classList.add("is-done"))}function U(e,t="success"){oi&&clearTimeout(oi),g.toastMsg.textContent=e,g.toast.classList.remove("is-danger","is-warn"),t==="danger"?g.toast.classList.add("is-danger"):t==="warn"&&g.toast.classList.add("is-warn"),g.toast.hidden=!1,oi=setTimeout(()=>{g.toast.hidden=!0},3600)}window.__manageDeps={TomSelect:$n.default};
