var cs=Object.create;var bi=Object.defineProperty;var ds=Object.getOwnPropertyDescriptor;var us=Object.getOwnPropertyNames;var ps=Object.getPrototypeOf,hs=Object.prototype.hasOwnProperty;var fs=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var ms=(t,e,o,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of us(e))!hs.call(t,n)&&n!==o&&bi(t,n,{get:()=>e[n],enumerable:!(i=ds(e,n))||i.enumerable});return t};var gs=(t,e,o)=>(o=t!=null?cs(ps(t)):{},ms(e||!t||!t.__esModule?bi(o,"default",{value:t,enumerable:!0}):o,t));var wn=fs((Jr,Qr)=>{(function(t,e){typeof Jr=="object"&&typeof Qr<"u"?Qr.exports=e():typeof define=="function"&&define.amd?define(e):(t=typeof globalThis<"u"?globalThis:t||self,t.TomSelect=e())})(Jr,(function(){"use strict";function t(l,r){l.split(/\s+/).forEach(a=>{r(a)})}class e{constructor(){this._events={}}on(r,a){t(r,s=>{let u=this._events[s]||[];u.push(a),this._events[s]=u})}off(r,a){var s=arguments.length;if(s===0){this._events={};return}t(r,u=>{if(s===1){delete this._events[u];return}let f=this._events[u];f!==void 0&&(f.splice(f.indexOf(a),1),this._events[u]=f)})}trigger(r,...a){var s=this;t(r,u=>{let f=s._events[u];f!==void 0&&f.forEach(p=>{p.apply(s,a)})})}}function o(l){return l.plugins={},class extends l{constructor(...r){super(...r),this.plugins={names:[],settings:{},requested:{},loaded:{}}}static define(r,a){l.plugins[r]={name:r,fn:a}}initializePlugins(r){var a,s;let u=this,f=[];if(Array.isArray(r))r.forEach(p=>{typeof p=="string"?f.push(p):(u.plugins.settings[p.name]=p.options,f.push(p.name))});else if(r)for(a in r)r.hasOwnProperty(a)&&(u.plugins.settings[a]=r[a],f.push(a));for(;s=f.shift();)u.require(s)}loadPlugin(r){var a=this,s=a.plugins,u=l.plugins[r];if(!l.plugins.hasOwnProperty(r))throw new Error('Unable to find "'+r+'" plugin');s.requested[r]=!0,s.loaded[r]=u.fn.apply(a,[a.plugins.settings[r]||{}]),s.names.push(r)}require(r){var a=this,s=a.plugins;if(!a.plugins.loaded.hasOwnProperty(r)){if(s.requested[r])throw new Error('Plugin has circular dependency ("'+r+'")');a.loadPlugin(r)}return s.loaded[r]}}}let i=l=>(l=l.filter(Boolean),l.length<2?l[0]||"":v(l)==1?"["+l.join("")+"]":"(?:"+l.join("|")+")"),n=l=>{if(!d(l))return l.join("");let r="",a=0,s=()=>{a>1&&(r+="{"+a+"}")};return l.forEach((u,f)=>{if(u===l[f-1]){a++;return}s(),r+=u,a=1}),s(),r},c=l=>{let r=Array.from(l);return i(r)},d=l=>new Set(l).size!==l.length,m=l=>(l+"").replace(/([\$\(\)\*\+\.\?\[\]\^\{\|\}\\])/gu,"\\$1"),v=l=>l.reduce((r,a)=>Math.max(r,y(a)),0),y=l=>Array.from(l).length,C=l=>{if(l.length===1)return[[l]];let r=[],a=l.substring(1);return C(a).forEach(function(u){let f=u.slice(0);f[0]=l.charAt(0)+f[0],r.push(f),f=u.slice(0),f.unshift(l.charAt(0)),r.push(f)}),r},b=[[0,65535]],S="[\u0300-\u036F\xB7\u02BE\u02BC]",k,$,I=3,D={},M={"/":"\u2044\u2215",0:"\u07C0",a:"\u2C65\u0250\u0251",aa:"\uA733",ae:"\xE6\u01FD\u01E3",ao:"\uA735",au:"\uA737",av:"\uA739\uA73B",ay:"\uA73D",b:"\u0180\u0253\u0183",c:"\uA73F\u0188\u023C\u2184",d:"\u0111\u0257\u0256\u1D05\u018C\uABB7\u0501\u0266",e:"\u025B\u01DD\u1D07\u0247",f:"\uA77C\u0192",g:"\u01E5\u0260\uA7A1\u1D79\uA77F\u0262",h:"\u0127\u2C68\u2C76\u0265",i:"\u0268\u0131",j:"\u0249\u0237",k:"\u0199\u2C6A\uA741\uA743\uA745\uA7A3",l:"\u0142\u019A\u026B\u2C61\uA749\uA747\uA781\u026D",m:"\u0271\u026F\u03FB",n:"\uA7A5\u019E\u0272\uA791\u1D0E\u043B\u0509",o:"\xF8\u01FF\u0254\u0275\uA74B\uA74D\u1D11",oe:"\u0153",oi:"\u01A3",oo:"\uA74F",ou:"\u0223",p:"\u01A5\u1D7D\uA751\uA753\uA755\u03C1",q:"\uA757\uA759\u024B",r:"\u024D\u027D\uA75B\uA7A7\uA783",s:"\xDF\u023F\uA7A9\uA785\u0282",t:"\u0167\u01AD\u0288\u2C66\uA787",th:"\xFE",tz:"\uA729",u:"\u0289",v:"\u028B\uA75F\u028C",vy:"\uA761",w:"\u2C73",y:"\u01B4\u024F\u1EFF",z:"\u01B6\u0225\u0240\u2C6C\uA763",hv:"\u0195"};for(let l in M){let r=M[l]||"";for(let a=0;a<r.length;a++){let s=r.substring(a,a+1);D[s]=l}}let Y=new RegExp(Object.keys(D).join("|")+"|"+S,"gu"),G=l=>{k===void 0&&(k=qt(b))},ot=(l,r="NFKD")=>l.normalize(r),ht=l=>Array.from(l).reduce((r,a)=>r+ft(a),""),ft=l=>(l=ot(l).toLowerCase().replace(Y,r=>D[r]||""),ot(l,"NFC"));function*bt(l){for(let[r,a]of l)for(let s=r;s<=a;s++){let u=String.fromCharCode(s),f=ht(u);f!=u.toLowerCase()&&(f.length>I||f.length!=0&&(yield{folded:f,composed:u,code_point:s}))}}let Yt=l=>{let r={},a=(s,u)=>{let f=r[s]||new Set,p=new RegExp("^"+c(f)+"$","iu");u.match(p)||(f.add(m(u)),r[s]=f)};for(let s of bt(l))a(s.folded,s.folded),a(s.folded,s.composed);return r},qt=l=>{let r=Yt(l),a={},s=[];for(let f in r){let p=r[f];p&&(a[f]=c(p)),f.length>1&&s.push(m(f))}s.sort((f,p)=>p.length-f.length);let u=i(s);return $=new RegExp("^"+u,"u"),a},Ft=(l,r=1)=>{let a=0;return l=l.map(s=>(k[s]&&(a+=s.length),k[s]||s)),a>=r?n(l):""},te=(l,r=1)=>(r=Math.max(r,l.length-1),i(C(l).map(a=>Ft(a,r)))),Mt=(l,r=!0)=>{let a=l.length>1?1:0;return i(l.map(s=>{let u=[],f=r?s.length():s.length()-1;for(let p=0;p<f;p++)u.push(te(s.substrs[p]||"",a));return n(u)}))},ee=(l,r)=>{for(let a of r){if(a.start!=l.start||a.end!=l.end||a.substrs.join("")!==l.substrs.join(""))continue;let s=l.parts,u=p=>{for(let x of s){if(x.start===p.start&&x.substr===p.substr)return!1;if(!(p.length==1||x.length==1)&&(p.start<x.start&&p.end>x.start||x.start<p.start&&x.end>p.start))return!0}return!1};if(!(a.parts.filter(u).length>0))return!0}return!1};class gt{parts;substrs;start;end;constructor(){this.parts=[],this.substrs=[],this.start=0,this.end=0}add(r){r&&(this.parts.push(r),this.substrs.push(r.substr),this.start=Math.min(r.start,this.start),this.end=Math.max(r.end,this.end))}last(){return this.parts[this.parts.length-1]}length(){return this.parts.length}clone(r,a){let s=new gt,u=JSON.parse(JSON.stringify(this.parts)),f=u.pop();for(let L of u)s.add(L);let p=a.substr.substring(0,r-f.start),x=p.length;return s.add({start:f.start,end:f.start+x,length:x,substr:p}),s}}let ce=l=>{G(),l=ht(l);let r="",a=[new gt];for(let s=0;s<l.length;s++){let f=l.substring(s).match($),p=l.substring(s,s+1),x=f?f[0]:null,L=[],_=new Set;for(let z of a){let F=z.last();if(!F||F.length==1||F.end<=s)if(x){let R=x.length;z.add({start:s,end:s+R,length:R,substr:x}),_.add("1")}else z.add({start:s,end:s+1,length:1,substr:p}),_.add("2");else if(x){let R=z.clone(s,F),nt=x.length;R.add({start:s,end:s+nt,length:nt,substr:x}),L.push(R)}else _.add("3")}if(L.length>0){L=L.sort((z,F)=>z.length()-F.length());for(let z of L)ee(z,a)||a.push(z);continue}if(s>0&&_.size==1&&!_.has("3")){r+=Mt(a,!1);let z=new gt,F=a[0];F&&z.add(F.last()),a=[z]}}return r+=Mt(a,!0),r},Kt=(l,r)=>{if(l)return l[r]},Rt=(l,r)=>{if(l){for(var a,s=r.split(".");(a=s.shift())&&(l=l[a]););return l}},At=(l,r,a)=>{var s,u;return!l||(l=l+"",r.regex==null)||(u=l.search(r.regex),u===-1)?0:(s=r.string.length/l.length,u===0&&(s+=.5),s*a)},Vt=(l,r)=>{var a=l[r];if(typeof a=="function")return a;a&&!Array.isArray(a)&&(l[r]=[a])},Ue=(l,r)=>{if(Array.isArray(l))l.forEach(r);else for(var a in l)l.hasOwnProperty(a)&&r(l[a],a)},On=(l,r)=>typeof l=="number"&&typeof r=="number"?l>r?1:l<r?-1:0:(l=ht(l+"").toLowerCase(),r=ht(r+"").toLowerCase(),l>r?1:r>l?-1:0);class zn{items;settings;constructor(r,a){this.items=r,this.settings=a||{diacritics:!0}}tokenize(r,a,s){if(!r||!r.length)return[];let u=[],f=r.split(/\s+/);var p;return s&&(p=new RegExp("^("+Object.keys(s).map(m).join("|")+"):(.*)$")),f.forEach(x=>{let L,_=null,z=null;p&&(L=x.match(p))&&(_=L[1],x=L[2]),x.length>0&&(this.settings.diacritics?z=ce(x)||null:z=m(x),z&&a&&(z="\\b"+z)),u.push({string:x,regex:z?new RegExp(z,"iu"):null,field:_})}),u}getScoreFunction(r,a){var s=this.prepareSearch(r,a);return this._getScoreFunction(s)}_getScoreFunction(r){let a=r.tokens,s=a.length;if(!s)return function(){return 0};let u=r.options.fields,f=r.weights,p=u.length,x=r.getAttrFn;if(!p)return function(){return 1};let L=(function(){return p===1?function(_,z){let F=u[0].field;return At(x(z,F),_,f[F]||1)}:function(_,z){var F=0;if(_.field){let R=x(z,_.field);!_.regex&&R?F+=1/p:F+=At(R,_,1)}else Ue(f,(R,nt)=>{F+=At(x(z,nt),_,R)});return F/p}})();return s===1?function(_){return L(a[0],_)}:r.options.conjunction==="and"?function(_){var z,F=0;for(let R of a){if(z=L(R,_),z<=0)return 0;F+=z}return F/s}:function(_){var z=0;return Ue(a,F=>{z+=L(F,_)}),z/s}}getSortFunction(r,a){var s=this.prepareSearch(r,a);return this._getSortFunction(s)}_getSortFunction(r){var a,s=[];let u=this,f=r.options,p=!r.query&&f.sort_empty?f.sort_empty:f.sort;if(typeof p=="function")return p.bind(this);let x=function(_,z){return _==="$score"?z.score:r.getAttrFn(u.items[z.id],_)};if(p)for(let _ of p)(r.query||_.field!=="$score")&&s.push(_);if(r.query){a=!0;for(let _ of s)if(_.field==="$score"){a=!1;break}a&&s.unshift({field:"$score",direction:"desc"})}else s=s.filter(_=>_.field!=="$score");return s.length?function(_,z){var F,R;for(let nt of s)if(R=nt.field,F=(nt.direction==="desc"?-1:1)*On(x(R,_),x(R,z)),F)return F;return 0}:null}prepareSearch(r,a){let s={};var u=Object.assign({},a);if(Vt(u,"sort"),Vt(u,"sort_empty"),u.fields){Vt(u,"fields");let f=[];u.fields.forEach(p=>{typeof p=="string"&&(p={field:p,weight:1}),f.push(p),s[p.field]="weight"in p?p.weight:1}),u.fields=f}return{options:u,query:r.toLowerCase().trim(),tokens:this.tokenize(r,u.respect_word_boundaries,s),total:0,items:[],weights:s,getAttrFn:u.nesting?Rt:Kt}}search(r,a){var s=this,u,f;f=this.prepareSearch(r,a),a=f.options,r=f.query;let p=a.score||s._getScoreFunction(f);r.length?Ue(s.items,(L,_)=>{u=p(L),(a.filter===!1||u>0)&&f.items.push({score:u,id:_})}):Ue(s.items,(L,_)=>{f.items.push({score:1,id:_})});let x=s._getSortFunction(f);return x&&f.items.sort(x),f.total=f.items.length,typeof a.limit=="number"&&(f.items=f.items.slice(0,a.limit)),f}}let Pt=l=>typeof l>"u"||l===null?null:So(l),So=l=>typeof l=="boolean"?l?"1":"0":l+"",Ao=l=>(l+"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"),In=(l,r)=>r>0?window.setTimeout(l,r):(l.call(null),null),Fn=(l,r)=>{var a;return function(s,u){var f=this;a&&(f.loading=Math.max(f.loading-1,0),clearTimeout(a)),a=setTimeout(function(){a=null,f.loadedSearches[s]=!0,l.call(f,s,u)},r)}},si=(l,r,a)=>{var s,u=l.trigger,f={};l.trigger=function(){var p=arguments[0];if(r.indexOf(p)!==-1)f[p]=arguments;else return u.apply(l,arguments)},a.apply(l,[]),l.trigger=u;for(s of r)s in f&&u.apply(l,f[s])},Tn=l=>({start:l.selectionStart||0,length:(l.selectionEnd||0)-(l.selectionStart||0)}),J=(l,r=!1)=>{l&&(l.preventDefault(),r&&l.stopPropagation())},Q=(l,r,a,s)=>{l.addEventListener(r,a,s)},_e=(l,r)=>{if(!r||!r[l])return!1;var a=(r.altKey?1:0)+(r.ctrlKey?1:0)+(r.shiftKey?1:0)+(r.metaKey?1:0);return a===1},gr=(l,r)=>{let a=l.getAttribute("id");return a||(l.setAttribute("id",r),r)},li=l=>l.replace(/[\\"']/g,"\\$&"),Le=(l,r)=>{r&&l.append(r)},kt=(l,r)=>{if(Array.isArray(l))l.forEach(r);else for(var a in l)l.hasOwnProperty(a)&&r(l[a],a)},yt=l=>{if(l.jquery)return l[0];if(l instanceof HTMLElement)return l;if(ci(l)){var r=document.createElement("template");return r.innerHTML=l.trim(),r.content.firstChild}return document.querySelector(l)},ci=l=>typeof l=="string"&&l.indexOf("<")>-1,Bn=l=>l.replace(/['"\\]/g,"\\$&"),vr=(l,r)=>{var a=document.createEvent("HTMLEvents");a.initEvent(r,!0,!1),l.dispatchEvent(a)},Eo=(l,r)=>{Object.assign(l.style,r)},Et=(l,...r)=>{var a=di(r);l=ui(l),l.map(s=>{a.map(u=>{s.classList.add(u)})})},de=(l,...r)=>{var a=di(r);l=ui(l),l.map(s=>{a.map(u=>{s.classList.remove(u)})})},di=l=>{var r=[];return kt(l,a=>{typeof a=="string"&&(a=a.trim().split(/[\t\n\f\r\s]/)),Array.isArray(a)&&(r=r.concat(a))}),r.filter(Boolean)},ui=l=>(Array.isArray(l)||(l=[l]),l),$o=(l,r,a)=>{if(!(a&&!a.contains(l)))for(;l&&l.matches;){if(l.matches(r))return l;l=l.parentNode}},pi=(l,r=0)=>r>0?l[l.length-1]:l[0],Mn=l=>Object.keys(l).length===0,Oo=(l,r)=>{if(!l)return-1;r=r||l.nodeName;for(var a=0;l=l.previousElementSibling;)l.matches(r)&&a++;return a},at=(l,r)=>{kt(r,(a,s)=>{a==null?l.removeAttribute(s):l.setAttribute(s,""+a)})},wr=(l,r)=>{l.parentNode&&l.parentNode.replaceChild(r,l)},Rn=(l,r)=>{if(r===null)return;if(typeof r=="string"){if(!r.length)return;r=new RegExp(r,"i")}let a=f=>{var p=f.data.match(r);if(p&&f.data.length>0){var x=document.createElement("span");x.className="highlight";var L=f.splitText(p.index);L.splitText(p[0].length);var _=L.cloneNode(!0);return x.appendChild(_),wr(L,x),1}return 0},s=f=>{f.nodeType===1&&f.childNodes&&!/(script|style)/i.test(f.tagName)&&(f.className!=="highlight"||f.tagName!=="SPAN")&&Array.from(f.childNodes).forEach(p=>{u(p)})},u=f=>f.nodeType===3?a(f):(s(f),0);u(l)},Pn=l=>{var r=l.querySelectorAll("span.highlight");Array.prototype.forEach.call(r,function(a){var s=a.parentNode;s.replaceChild(a.firstChild,a),s.normalize()})},Dn=65,Nn=13,hi=27,br=37,qn=38,fi=39,Vn=40,mi=8,Un=46,yr=9,zo=(typeof navigator>"u"?!1:/Mac/.test(navigator.userAgent))?"metaKey":"ctrlKey";var gi={options:[],optgroups:[],plugins:[],delimiter:",",splitOn:null,persist:!0,diacritics:!0,create:null,createOnBlur:!1,createFilter:null,clearAfterSelect:!1,highlight:!0,openOnFocus:!0,shouldOpen:null,maxOptions:50,maxItems:null,hideSelected:null,duplicates:!1,addPrecedence:!1,selectOnTab:!1,preload:null,allowEmptyOption:!1,refreshThrottle:300,loadThrottle:300,loadingClass:"loading",dataAttr:null,optgroupField:"optgroup",valueField:"value",labelField:"text",disabledField:"disabled",optgroupLabelField:"label",optgroupValueField:"value",lockOptgroupOrder:!1,sortField:"$order",searchField:["text"],searchConjunction:"and",mode:null,wrapperClass:"ts-wrapper",controlClass:"ts-control",dropdownClass:"ts-dropdown",dropdownContentClass:"ts-dropdown-content",itemClass:"item",optionClass:"option",dropdownParent:null,controlInput:'<input type="text" autocomplete="off" size="1" />',copyClassesToDropdown:!1,placeholder:null,hidePlaceholder:null,shouldLoad:function(l){return l.length>0},render:{}};function vi(l,r){var a=Object.assign({},gi,r),s=a.dataAttr,u=a.labelField,f=a.valueField,p=a.disabledField,x=a.optgroupField,L=a.optgroupLabelField,_=a.optgroupValueField,z=l.tagName.toLowerCase(),F=l.getAttribute("placeholder")||l.getAttribute("data-placeholder");if(!F&&!a.allowEmptyOption){let T=l.querySelector('option[value=""]');T&&(F=T.textContent)}var R={placeholder:F,options:[],optgroups:[],items:[],maxItems:null},nt=()=>{var T,X=R.options,tt={},ut=1;let B=0;var rt=pt=>{var K=Object.assign({},pt.dataset),P=s&&K[s];return typeof P=="string"&&P.length&&(K=Object.assign(K,JSON.parse(P))),K},we=(pt,K)=>{var P=Pt(pt.value);if(P!=null&&!(!P&&!a.allowEmptyOption)){if(tt.hasOwnProperty(P)){if(K){var vt=tt[P][x];vt?Array.isArray(vt)?vt.push(K):tt[P][x]=[vt,K]:tt[P][x]=K}}else{var lt=rt(pt);lt[u]=lt[u]||pt.textContent,lt[f]=lt[f]||P,lt[p]=lt[p]||pt.disabled,lt[x]=lt[x]||K,lt.$option=pt,lt.$order=lt.$order||++B,tt[P]=lt,X.push(lt)}pt.selected&&R.items.push(P)}},Io=pt=>{var K,P;P=rt(pt),P[L]=P[L]||pt.getAttribute("label")||"",P[_]=P[_]||ut++,P[p]=P[p]||pt.disabled,P.$order=P.$order||++B,R.optgroups.push(P),K=P[_],kt(pt.children,vt=>{we(vt,K)})};R.maxItems=l.hasAttribute("multiple")?null:1,kt(l.children,pt=>{T=pt.tagName.toLowerCase(),T==="optgroup"?Io(pt):T==="option"&&we(pt)})},A=()=>{let T=l.getAttribute(s);if(T)R.options=JSON.parse(T),kt(R.options,B=>{R.items.push(B[f])});else{var X,tt,ut=(X=l==null||(tt=l.value)==null?void 0:tt.trim())!=null?X:"";if(!a.allowEmptyOption&&!ut.length)return;let B=ut.split(a.delimiter);kt(B,rt=>{let we={};we[u]=rt,we[f]=rt,R.options.push(we)}),R.items=B}};return z==="select"?nt():A(),Object.assign({},gi,R,r)}var wi=0;class $t extends o(e){constructor(r,a){super(),this.order=0,this.isOpen=!1,this.isDisabled=!1,this.isReadOnly=!1,this.isInvalid=!1,this.isValid=!0,this.isLocked=!1,this.isFocused=!1,this.isInputHidden=!1,this.isSetup=!1,this.isDropdownContentStale=!0,this.ignoreFocus=!1,this.ignoreHover=!1,this.hasOptions=!1,this.lastValue="",this.caretPos=0,this.loading=0,this.loadedSearches={},this.activeOption=null,this.activeItems=[],this.optgroups={},this.options={},this.userOptions={},this.items=[],this.refreshTimeout=null,wi++;var s,u=yt(r);if(u.tomselect)throw new Error("Tom Select already initialized on this element");u.tomselect=this;var f=window.getComputedStyle&&window.getComputedStyle(u,null);s=f.getPropertyValue("direction");let p=vi(u,a);this.settings=p,this.input=u,this.tabIndex=u.tabIndex||0,this.is_select_tag=u.tagName.toLowerCase()==="select",this.rtl=/rtl/i.test(s),this.inputId=gr(u,"tomselect-"+wi),this.isRequired=u.required,this.sifter=new zn(this.options,{diacritics:p.diacritics}),p.mode=p.mode||(p.maxItems===1?"single":"multi"),typeof p.hideSelected!="boolean"&&(p.hideSelected=p.mode==="multi"),typeof p.hidePlaceholder!="boolean"&&(p.hidePlaceholder=p.mode!=="multi");var x=p.createFilter;typeof x!="function"&&(typeof x=="string"&&(x=new RegExp(x)),x instanceof RegExp?p.createFilter=X=>x.test(X):p.createFilter=X=>this.settings.duplicates||!this.options[X]),this.initializePlugins(p.plugins),this.setupCallbacks(),this.setupTemplates();let L=yt("<div>"),_=yt("<div>"),z=this._render("dropdown"),F=yt('<div role="listbox" tabindex="-1">'),R=this.input.getAttribute("class")||"",nt=p.mode;var A;if(Et(L,p.wrapperClass,R,nt),Et(_,p.controlClass),Le(L,_),Et(z,p.dropdownClass,nt),p.copyClassesToDropdown&&Et(z,R),Et(F,p.dropdownContentClass),Le(z,F),yt(p.dropdownParent||L).appendChild(z),ci(p.controlInput)){A=yt(p.controlInput);var T=["autocorrect","autocapitalize","autocomplete","spellcheck","aria-label"];kt(T,X=>{u.getAttribute(X)&&at(A,{[X]:u.getAttribute(X)})}),A.tabIndex=-1,_.appendChild(A),this.focus_node=A}else p.controlInput?(A=yt(p.controlInput),this.focus_node=A):(A=yt("<input/>"),this.focus_node=_);this.wrapper=L,this.dropdown=z,this.dropdown_content=F,this.control=_,this.control_input=A,this.setup()}setup(){let r=this,a=r.settings,s=r.control_input,u=r.dropdown,f=r.dropdown_content,p=r.wrapper,x=r.control,L=r.input,_=r.focus_node,z={passive:!0},F=r.inputId+"-ts-dropdown";at(f,{id:F}),at(_,{role:"combobox","aria-haspopup":"listbox","aria-expanded":"false","aria-controls":F});let R=gr(_,r.inputId+"-ts-control"),nt="label[for='"+Bn(r.inputId)+"']",A=document.querySelector(nt),T=r.focus.bind(r);if(A){Q(A,"click",T),at(A,{for:R});let B=gr(A,r.inputId+"-ts-label");at(_,{"aria-labelledby":B}),at(f,{"aria-labelledby":B})}if(p.style.width=L.style.width,p.style.minWidth=L.style.minWidth,p.style.maxWidth=L.style.maxWidth,r.plugins.names.length){let B="plugin-"+r.plugins.names.join(" plugin-");Et([p,u],B)}(a.maxItems===null||a.maxItems>1)&&r.is_select_tag&&at(L,{multiple:"multiple"}),a.placeholder&&at(s,{placeholder:a.placeholder}),!a.splitOn&&a.delimiter&&(a.splitOn=new RegExp("\\s*"+m(a.delimiter)+"+\\s*")),a.load&&a.loadThrottle&&(a.load=Fn(a.load,a.loadThrottle)),Q(u,"mousemove",()=>{r.ignoreHover=!1}),Q(u,"mouseenter",B=>{var rt=$o(B.target,"[data-selectable]",u);rt&&r.onOptionHover(B,rt)},{capture:!0}),Q(u,"click",B=>{let rt=$o(B.target,"[data-selectable]");rt&&(r.onOptionSelect(B,rt),J(B,!0))}),Q(x,"click",B=>{var rt=$o(B.target,"[data-ts-item]",x);if(rt&&r.onItemSelect(B,rt)){J(B,!0);return}s.value==""&&(r.onClick(),J(B,!0))}),Q(_,"keydown",B=>r.onKeyDown(B)),Q(s,"keypress",B=>r.onKeyPress(B)),Q(s,"input",B=>r.onInput(B)),Q(_,"blur",B=>r.onBlur(B)),Q(_,"focus",B=>r.onFocus(B)),Q(s,"paste",B=>r.onPaste(B));let X=B=>{let rt=B.composedPath()[0];if(!p.contains(rt)&&!u.contains(rt)){r.isFocused&&r.blur(),r.inputState();return}rt==s&&r.isOpen?B.stopPropagation():J(B,!0)},tt=()=>{r.isOpen&&r.positionDropdown()},ut=()=>{r.isValid&&(r.isValid=!1,r.isInvalid=!0,r.refreshState())};Q(L,"invalid",ut),Q(document,"mousedown",X),Q(window,"scroll",tt,z),Q(window,"resize",tt,z),this._destroy=()=>{L.removeEventListener("invalid",ut),document.removeEventListener("mousedown",X),window.removeEventListener("scroll",tt),window.removeEventListener("resize",tt),A&&A.removeEventListener("click",T)},this.revertSettings={innerHTML:L.innerHTML,tabIndex:L.tabIndex},L.tabIndex=-1,L.insertAdjacentElement("afterend",r.wrapper),r.sync(!1),a.items=[],delete a.optgroups,delete a.options,r.refreshItems(),r.close(!1),r.inputState(),r.isSetup=!0,r.on("change",this.onChange),Et(L,"tomselected","ts-hidden-accessible"),r.trigger("initialize"),a.preload===!0&&r.preload()}setupOptions(r=[],a=[]){this.addOptions(r),kt(a,s=>{this.registerOptionGroup(s)})}setupTemplates(){var r=this,a=r.settings.labelField,s=r.settings.optgroupLabelField,u={optgroup:f=>{let p=document.createElement("div");return p.className="optgroup",p.appendChild(f.options),p},optgroup_header:(f,p)=>'<div class="optgroup-header">'+p(f[s])+"</div>",option:(f,p)=>"<div>"+p(f[a])+"</div>",item:(f,p)=>"<div>"+p(f[a])+"</div>",option_create:(f,p)=>'<div class="create">Add <strong>'+p(f.input)+"</strong>&hellip;</div>",no_results:()=>'<div class="no-results">No results found</div>',loading:()=>'<div class="spinner"></div>',not_loading:()=>{},dropdown:()=>"<div></div>"};r.settings.render=Object.assign({},u,r.settings.render)}setupCallbacks(){var r,a,s={initialize:"onInitialize",change:"onChange",item_add:"onItemAdd",item_remove:"onItemRemove",item_select:"onItemSelect",clear:"onClear",option_add:"onOptionAdd",option_remove:"onOptionRemove",option_clear:"onOptionClear",optgroup_add:"onOptionGroupAdd",optgroup_remove:"onOptionGroupRemove",optgroup_clear:"onOptionGroupClear",dropdown_open:"onDropdownOpen",dropdown_close:"onDropdownClose",type:"onType",load:"onLoad",focus:"onFocus",blur:"onBlur"};for(r in s)a=this.settings[s[r]],a&&this.on(r,a)}sync(r=!0){let a=this,s=r?vi(a.input,{delimiter:a.settings.delimiter,allowEmptyOption:a.settings.allowEmptyOption}):a.settings;a.setupOptions(s.options,s.optgroups),a.setValue(s.items||[],!0),a.input.disabled?a.disable():a.input.readOnly?a.setReadOnly(!0):a.enable(),a.lastQuery=null}onClick(){var r=this;if(r.activeItems.length>0){r.clearActiveItems(),r.focus();return}r.isFocused&&r.isOpen?r.blur():r.focus()}onMouseDown(){}onChange(){vr(this.input,"input"),vr(this.input,"change")}onPaste(r){var a=this;if(a.isInputHidden||a.isLocked){J(r);return}a.settings.splitOn&&setTimeout(()=>{var s=a.inputValue();if(s.match(a.settings.splitOn)){var u=s.trim().split(a.settings.splitOn);kt(u,f=>{Pt(f)&&(this.options[f]?a.addItem(f):a.createItem(f))})}},0)}onKeyPress(r){var a=this;if(a.isLocked){J(r);return}var s=String.fromCharCode(r.keyCode||r.which);if(a.settings.create&&a.settings.mode==="multi"&&s===a.settings.delimiter){a.createItem(),J(r);return}}onKeyDown(r){var a=this;if(a.ignoreHover=!0,a.isLocked){r.keyCode!==yr&&J(r);return}switch(r.keyCode){case Dn:if(_e(zo,r)&&a.control_input.value==""){J(r),a.selectAll();return}break;case hi:a.isOpen&&(J(r,!0),a.close()),a.clearActiveItems();return;case Vn:if(!a.isOpen&&a.hasOptions)a.open();else if(a.activeOption){let s=a.getAdjacent(a.activeOption,1);s&&a.setActiveOption(s)}J(r);return;case qn:if(a.activeOption){let s=a.getAdjacent(a.activeOption,-1);s&&a.setActiveOption(s)}J(r);return;case Nn:a.canSelect(a.activeOption)?(a.onOptionSelect(r,a.activeOption),J(r)):(a.settings.create&&a.createItem()||document.activeElement==a.control_input&&a.isOpen)&&J(r);return;case br:a.advanceSelection(-1,r);return;case fi:a.advanceSelection(1,r);return;case yr:a.settings.selectOnTab&&(a.canSelect(a.activeOption)?(a.onOptionSelect(r,a.activeOption),J(r)):a.settings.create&&a.createItem()&&J(r));return;case mi:case Un:a.deleteSelection(r);return}a.isInputHidden&&!_e(zo,r)&&J(r)}onInput(r){if(this.isLocked)return;let a=this.inputValue();if(this.lastValue!==a){if(this.lastValue=a,a==""){this._onInput();return}this.refreshTimeout&&window.clearTimeout(this.refreshTimeout),this.refreshTimeout=In(()=>{this.refreshTimeout=null,this._onInput()},this.settings.refreshThrottle)}}_onInput(){let r=this.lastValue;this.settings.shouldLoad.call(this,r)&&this.load(r),this.refreshOptions(),this.trigger("type",r)}onOptionHover(r,a){this.ignoreHover||this.setActiveOption(a,!1)}onFocus(r){var a=this,s=a.isFocused;if(a.isDisabled||a.isReadOnly){a.blur(),J(r);return}a.ignoreFocus||(a.isFocused=!0,a.settings.preload==="focus"&&a.preload(),s||a.trigger("focus"),a.activeItems.length||(a.inputState(),a.refreshOptions(!!a.settings.openOnFocus)),a.refreshState())}onBlur(r){if(document.hasFocus()!==!1){var a=this;if(a.isFocused){a.isFocused=!1,a.ignoreFocus=!1;var s=()=>{a.close(),a.setActiveItem(),a.setCaret(a.items.length),a.trigger("blur")};a.settings.create&&a.settings.createOnBlur?a.createItem(null,s):s()}}}onOptionSelect(r,a){var s,u=this;a.parentElement&&a.parentElement.matches("[data-disabled]")||(a.classList.contains("create")?u.createItem(null,()=>{u.settings.closeAfterSelect?u.close():u.settings.clearAfterSelect&&u.setTextboxValue()}):(s=a.dataset.value,typeof s<"u"&&(u.isDropdownContentStale=u.settings.hideSelected,u.addItem(s),u.settings.closeAfterSelect?u.close():u.settings.clearAfterSelect&&u.setTextboxValue(),!u.settings.hideSelected&&r.type&&/click/.test(r.type)&&u.setActiveOption(a))))}canSelect(r){return!!(this.isOpen&&r&&this.dropdown_content.contains(r))}onItemSelect(r,a){var s=this;return!s.isLocked&&s.settings.mode==="multi"?(J(r),s.setActiveItem(a,r),!0):!1}canLoad(r){return!(!this.settings.load||this.loadedSearches.hasOwnProperty(r))}load(r){let a=this;if(!a.canLoad(r))return;Et(a.wrapper,a.settings.loadingClass),a.loading++;let s=a.loadCallback.bind(a);a.settings.load.call(a,r,s)}loadCallback(r,a){let s=this;s.loading=Math.max(s.loading-1,0),s.isDropdownContentStale=!0,s.clearActiveOption(),s.setupOptions(r,a),s.refreshOptions(s.isFocused&&!s.isInputHidden),s.loading||de(s.wrapper,s.settings.loadingClass),s.trigger("load",r,a)}preload(){var r=this.wrapper.classList;r.contains("preloaded")||(r.add("preloaded"),this.load(""))}setTextboxValue(r=""){var a=this.control_input,s=a.value!==r;s&&(a.value=r,vr(a,"update"),this.lastValue=r)}getValue(){return this.is_select_tag&&this.input.hasAttribute("multiple")?this.items:this.items.join(this.settings.delimiter)}setValue(r,a){var s=a?[]:["change"];si(this,s,()=>{this.clear(a),this.addItems(r,a)})}setMaxItems(r){r===0&&(r=null),this.settings.maxItems=r,this.refreshState()}setActiveItem(r,a){var s=this,u,f,p,x,L,_;if(s.settings.mode!=="single"){if(!r){s.clearActiveItems(),s.isFocused&&s.inputState();return}if(u=a&&a.type.toLowerCase(),u==="click"&&_e("shiftKey",a)&&s.activeItems.length){for(_=s.getLastActive(),p=Array.prototype.indexOf.call(s.control.children,_),x=Array.prototype.indexOf.call(s.control.children,r),p>x&&(L=p,p=x,x=L),f=p;f<=x;f++)r=s.control.children[f],s.activeItems.indexOf(r)===-1&&s.setActiveItemClass(r);J(a)}else u==="click"&&_e(zo,a)||u==="keydown"&&_e("shiftKey",a)?r.classList.contains("active")?s.removeActiveItem(r):s.setActiveItemClass(r):(s.clearActiveItems(),s.setActiveItemClass(r));s.inputState(),s.isFocused||s.focus()}}setActiveItemClass(r){let a=this,s=a.control.querySelector(".last-active");s&&de(s,"last-active"),Et(r,"active last-active"),a.trigger("item_select",r),a.activeItems.indexOf(r)==-1&&a.activeItems.push(r)}removeActiveItem(r){var a=this.activeItems.indexOf(r);this.activeItems.splice(a,1),de(r,"active")}clearActiveItems(){de(this.activeItems,"active"),this.activeItems=[]}setActiveOption(r,a=!0){r!==this.activeOption&&(this.clearActiveOption(),r&&(this.activeOption=r,at(this.focus_node,{"aria-activedescendant":r.getAttribute("id")}),at(r,{"aria-selected":"true"}),Et(r,"active"),a&&this.scrollToOption(r)))}scrollToOption(r,a){if(!r)return;let s=this.dropdown_content,u=s.clientHeight,f=s.scrollTop||0,p=r.offsetHeight,x=r.getBoundingClientRect().top-s.getBoundingClientRect().top+f;x+p>u+f?this.scroll(x-u+p,a):x<f&&this.scroll(x,a)}scroll(r,a){let s=this.dropdown_content;a&&(s.style.scrollBehavior=a),s.scrollTop=r,s.style.scrollBehavior=""}clearActiveOption(){this.activeOption&&(de(this.activeOption,"active"),at(this.activeOption,{"aria-selected":null})),this.activeOption=null,at(this.focus_node,{"aria-activedescendant":null})}selectAll(){let r=this;if(r.settings.mode==="single")return;let a=r.controlChildren();a.length&&(r.inputState(),r.close(),r.activeItems=a,kt(a,s=>{r.setActiveItemClass(s)}))}inputState(){var r=this;r.control.contains(r.control_input)&&(at(r.control_input,{placeholder:r.settings.placeholder}),r.activeItems.length>0||!r.isFocused&&r.settings.hidePlaceholder&&r.items.length>0?(r.setTextboxValue(),r.isInputHidden=!0):(r.settings.hidePlaceholder&&r.items.length>0&&at(r.control_input,{placeholder:""}),r.isInputHidden=!1),r.wrapper.classList.toggle("input-hidden",r.isInputHidden))}inputValue(){return this.control_input.value.trim()}focus(){var r=this;if(r.isDisabled||r.isReadOnly)return;r.ignoreFocus=!0;let a=this.control_input.offsetWidth?this.control_input:this.focus_node;a.focus(),setTimeout(()=>{r.ignoreFocus=!1,a.getRootNode().activeElement===a&&this.onFocus()},0)}blur(){this.focus_node.blur(),this.onBlur()}getScoreFunction(r){return this.sifter.getScoreFunction(r,this.getSearchOptions())}getSearchOptions(){var r=this.settings,a=r.sortField;return typeof r.sortField=="string"&&(a=[{field:r.sortField}]),{fields:r.searchField,conjunction:r.searchConjunction,sort:a,nesting:r.nesting}}search(r){var a,s,u=this,f=this.getSearchOptions();if(u.settings.score&&(s=u.settings.score.call(u,r),typeof s!="function"))throw new Error('Tom Select "score" setting must be a function that returns a function');return u.isDropdownContentStale||r!==u.lastQuery?(u.lastQuery=r,/(.)\1{15,}/.test(r)&&(r=""),a=u.sifter.search(r,Object.assign(f,{score:s})),u.currentResults=a):a=Object.assign({},u.currentResults),u.settings.hideSelected&&(a.items=a.items.filter(p=>{let x=Pt(p.id);return!(x!==null&&u.items.indexOf(x)!==-1)})),a}refreshOptions(r=!0){var a,s,u,f,p,x,L,_,z,F;let R={},nt=[];var A=this,T=A.inputValue();let X=T===A.lastQuery||T==""&&A.lastQuery==null;var tt=A.search(T),ut=null,B=A.settings.shouldOpen||!1,rt=A.dropdown_content;X&&(ut=A.activeOption,ut&&(z=ut.closest("[data-group]"))),f=tt.items.length,typeof A.settings.maxOptions=="number"&&(f=Math.min(f,A.settings.maxOptions)),f>0&&(B=!0);let we=(K,P)=>{let vt=R[K];if(vt!==void 0){let Ot=nt[vt];if(Ot!==void 0)return[vt,Ot.fragment]}let lt=document.createDocumentFragment();return vt=nt.length,nt.push({fragment:lt,order:P,optgroup:K}),[vt,lt]};for(a=0;a<f;a++){let K=tt.items[a];if(!K)continue;let P=K.id,vt=A.options[P];if(vt===void 0)continue;let lt=So(P),Ot=A.getOption(lt,!0);for(A.settings.hideSelected||Ot.classList.toggle("selected",A.items.includes(lt)),p=vt[A.settings.optgroupField]||"",x=Array.isArray(p)?p:[p],s=0,u=x&&x.length;s<u;s++){p=x[s];let Fo=vt.$order,He=A.optgroups[p];if(He===void 0&&typeof A.settings.optionGroupRegister=="function"){var Io;(Io=A.settings.optionGroupRegister.apply(A,[p]))&&A.registerOptionGroup(Io)}He=A.optgroups[p],He===void 0?p="":Fo=He.$order;let[ss,ls]=we(p,Fo);s>0&&(Ot=Ot.cloneNode(!0),at(Ot,{id:vt.$id+"-clone-"+s,"aria-selected":null}),Ot.classList.add("ts-cloned"),de(Ot,"active"),A.activeOption&&A.activeOption.dataset.value==P&&z&&z.dataset.group===p.toString()&&(ut=Ot)),ls.appendChild(Ot),p!=""&&(R[p]=ss)}}A.settings.lockOptgroupOrder&&nt.sort((K,P)=>K.order-P.order),L=document.createDocumentFragment(),kt(nt,K=>{let P=K.fragment,vt=K.optgroup;if(!P||!P.children.length)return;let lt=A.optgroups[vt];if(lt!==void 0){let Ot=document.createDocumentFragment(),Fo=A.render("optgroup_header",lt);Le(Ot,Fo),Le(Ot,P);let He=A.render("optgroup",{group:lt,options:Ot});Le(L,He)}else Le(L,P)}),rt.innerHTML="",Le(rt,L),A.isDropdownContentStale=!1,A.settings.highlight&&(Pn(rt),tt.query.length&&tt.tokens.length&&kt(tt.tokens,K=>{Rn(rt,K.regex)}));var pt=K=>{let P=A.render(K,{input:T});return P&&(B=!0,rt.insertBefore(P,rt.firstChild)),P};if(A.loading?pt("loading"):A.settings.shouldLoad.call(A,T)?tt.items.length===0&&pt("no_results"):pt("not_loading"),_=A.canCreate(T),_&&(F=pt("option_create")),A.hasOptions=tt.items.length>0||_,B){if(tt.items.length>0){if(!ut&&A.settings.mode==="single"&&A.items[0]!=null&&(ut=A.getOption(A.items[0])),!rt.contains(ut)){let K=0;F&&!A.settings.addPrecedence&&(K=1),ut=A.selectable()[K]}}else F&&(ut=F);r&&!A.isOpen&&(A.open(),A.scrollToOption(ut,"auto")),A.setActiveOption(ut)}else A.clearActiveOption(),r&&A.isOpen&&A.close(!1)}selectable(){return this.dropdown_content.querySelectorAll("[data-selectable]")}addOption(r,a=!1){let s=this;if(Array.isArray(r))return s.addOptions(r,a),!1;let u=Pt(r[s.settings.valueField]);return u===null||s.options.hasOwnProperty(u)?(s.updateOption(r[s.settings.valueField],r),!1):(r.$order=r.$order||++s.order,r.$id=s.inputId+"-opt-"+r.$order,s.options[u]=r,s.isDropdownContentStale=!0,a&&(s.userOptions[u]=a,s.trigger("option_add",u,r)),u)}addOptions(r,a=!1){kt(r,s=>{this.addOption(s,a)})}registerOption(r){return this.addOption(r)}registerOptionGroup(r){var a=Pt(r[this.settings.optgroupValueField]);return a===null?!1:(r.$order=r.$order||++this.order,this.optgroups[a]=r,a)}addOptionGroup(r,a){var s;a[this.settings.optgroupValueField]=r,(s=this.registerOptionGroup(a))&&this.trigger("optgroup_add",s,a)}removeOptionGroup(r){this.optgroups.hasOwnProperty(r)&&(delete this.optgroups[r],this.clearCache(),this.trigger("optgroup_remove",r))}clearOptionGroups(){this.optgroups={},this.clearCache(),this.trigger("optgroup_clear")}updateOption(r,a){let s=this;var u,f;let p=Pt(r),x=Pt(a[s.settings.valueField]);if(p===null)return;let L=s.options[p];if(L==null)return;if(typeof x!="string")throw new Error("Value must be set in option data");let _=s.getOption(p),z=s.getItem(p);if(a.$order=a.$order||L.$order,delete s.options[p],s.uncacheValue(x),s.options[x]=a,_){if(s.dropdown_content.contains(_)){let F=s._render("option",a);wr(_,F),s.activeOption===_&&s.setActiveOption(F)}_.remove()}z&&(f=s.items.indexOf(p),f!==-1&&s.items.splice(f,1,x),u=s._render("item",a),z.classList.contains("active")&&Et(u,"active"),wr(z,u)),s.isDropdownContentStale=!0}removeOption(r,a){let s=this;r=So(r),s.uncacheValue(r),delete s.userOptions[r],delete s.options[r],s.isDropdownContentStale=!0,s.trigger("option_remove",r),s.removeItem(r,a)}clearOptions(r){let a=(r||this.clearFilter).bind(this);this.loadedSearches={},this.userOptions={},this.clearCache();let s={};kt(this.options,(u,f)=>{a(u,f)&&(s[f]=u)}),this.options=this.sifter.items=s,this.isDropdownContentStale=!0,this.trigger("option_clear")}clearFilter(r,a){return this.items.indexOf(a)>=0}getOption(r,a=!1){let s=Pt(r);if(s===null)return null;let u=this.options[s];if(u!=null){if(u.$div)return u.$div;if(a)return this._render("option",u)}return null}getAdjacent(r,a,s="option"){var u=this,f;if(!r)return null;s=="item"?f=u.controlChildren():f=u.dropdown_content.querySelectorAll("[data-selectable]");for(let p=0;p<f.length;p++)if(f[p]==r)return a>0?f[p+1]:f[p-1];return null}getItem(r){if(typeof r=="object")return r;var a=Pt(r);return a!==null?this.control.querySelector(`[data-value="${li(a)}"]`):null}addItems(r,a){var s=this,u=Array.isArray(r)?r:[r];u=u.filter(p=>s.items.indexOf(p)===-1);let f=u[u.length-1];u.forEach(p=>{s.isPending=p!==f,s.addItem(p,a)})}addItem(r,a){var s=a?[]:["change","dropdown_close"];si(this,s,()=>{var u,f;let p=this,x=p.settings.mode,L=Pt(r);if(!(L&&p.items.indexOf(L)!==-1&&(x==="single"&&p.close(),x==="single"||!p.settings.duplicates))&&!(L===null||!p.options.hasOwnProperty(L))&&(x==="single"&&p.clear(a),!(x==="multi"&&p.isFull()))){if(u=p._render("item",p.options[L]),p.control.contains(u)&&(u=u.cloneNode(!0)),f=p.isFull(),p.items.splice(p.caretPos,0,L),p.insertAtCaret(u),p.isSetup){if(!p.isPending&&p.settings.hideSelected){let _=p.getOption(L),z=p.getAdjacent(_,1);z&&p.setActiveOption(z)}p.settings.clearAfterSelect&&p.setTextboxValue(),!p.isPending&&!p.settings.closeAfterSelect&&p.refreshOptions(p.isFocused&&x!=="single"),p.settings.closeAfterSelect!=!1&&p.isFull()?p.close():p.isPending||p.positionDropdown(),p.trigger("item_add",L,u),p.isPending||p.updateOriginalInput({silent:a})}(!p.isPending||!f&&p.isFull())&&(p.inputState(),p.refreshState())}})}removeItem(r=null,a){let s=this;if(r=s.getItem(r),!r)return;var u,f;let p=r.dataset.value;u=Oo(r),r.remove(),r.classList.contains("active")&&(f=s.activeItems.indexOf(r),s.activeItems.splice(f,1),de(r,"active")),s.items.splice(u,1),s.isDropdownContentStale=!0,!s.settings.persist&&s.userOptions.hasOwnProperty(p)&&s.removeOption(p,a),u<s.caretPos&&s.setCaret(s.caretPos-1),s.updateOriginalInput({silent:a}),s.refreshState(),s.positionDropdown(),s.trigger("item_remove",p,r)}createItem(r=null,a=()=>{}){arguments.length===3&&(a=arguments[2]),typeof a!="function"&&(a=()=>{});var s=this,u=s.caretPos,f;if(r=r||s.inputValue(),!s.canCreate(r))return Pt(r)&&this.options[r]&&s.addItem(r),a(),!1;s.lock();var p=!1,x=L=>{if(s.unlock(),!L||typeof L!="object")return a();var _=Pt(L[s.settings.valueField]);if(typeof _!="string")return a();s.setTextboxValue(),s.addOption(L,!0),s.setCaret(u),s.addItem(_),a(L),p=!0};return typeof s.settings.create=="function"?f=s.settings.create.call(this,r,x):f={[s.settings.labelField]:r,[s.settings.valueField]:r},p||x(f),!0}refreshItems(){var r=this;r.isDropdownContentStale=!0,r.isSetup&&r.addItems(r.items),r.updateOriginalInput(),r.refreshState()}refreshState(){let r=this;r.refreshValidityState();let a=r.isFull(),s=r.isLocked;r.wrapper.classList.toggle("rtl",r.rtl);let u=r.wrapper.classList;u.toggle("focus",r.isFocused),u.toggle("disabled",r.isDisabled),u.toggle("readonly",r.isReadOnly),u.toggle("required",r.isRequired),u.toggle("invalid",!r.isValid),u.toggle("locked",s),u.toggle("full",a),u.toggle("input-active",r.isFocused&&!r.isInputHidden),u.toggle("dropdown-active",r.isOpen),u.toggle("has-options",Mn(r.options)),u.toggle("has-items",r.items.length>0)}refreshValidityState(){var r=this;r.input.validity&&(r.isValid=r.input.validity.valid,r.isInvalid=!r.isValid)}isFull(){return this.settings.maxItems!==null&&this.items.length>=this.settings.maxItems}updateOriginalInput(r={}){let a=this;var s,u;let f=a.input.querySelector('option[value=""]');if(a.is_select_tag){let L=function(_,z,F){return _||(_=yt('<option value="'+Ao(z)+'">'+Ao(F)+"</option>")),_!=f&&a.input.append(_),p.push(_),(_!=f||x>0)&&(_.selected=!0),_},p=[],x=a.input.querySelectorAll("option:checked").length;a.input.querySelectorAll("option:checked").forEach(_=>{_.selected=!1}),a.items.length==0&&a.settings.mode=="single"?L(f,"",""):a.items.forEach(_=>{if(s=a.options[_],u=s[a.settings.labelField]||"",p.includes(s.$option)){let z=a.input.querySelector(`option[value="${li(_)}"]:not(:checked)`);L(z,_,u)}else s.$option=L(s.$option,_,u)})}else a.input.value=a.getValue();a.isSetup&&(r.silent||a.trigger("change",a.getValue()))}open(){var r=this;r.isLocked||r.isOpen||r.settings.mode==="multi"&&r.isFull()||(r.isOpen=!0,at(r.focus_node,{"aria-expanded":"true"}),r.refreshState(),Eo(r.dropdown,{visibility:"hidden",display:"block"}),r.positionDropdown(),Eo(r.dropdown,{visibility:"visible",display:"block"}),r.focus(),r.trigger("dropdown_open",r.dropdown))}close(r=!0){var a=this,s=a.isOpen;r&&(a.setTextboxValue(),a.settings.mode==="single"&&a.items.length&&a.inputState()),a.isOpen=!1,at(a.focus_node,{"aria-expanded":"false"}),Eo(a.dropdown,{display:"none"}),a.settings.hideSelected&&a.clearActiveOption(),a.refreshState(),s&&a.trigger("dropdown_close",a.dropdown)}positionDropdown(){if(this.settings.dropdownParent==="body"){var r=this.control,a=r.getBoundingClientRect(),s=r.offsetHeight+a.top+window.scrollY,u=a.left+window.scrollX;Eo(this.dropdown,{width:a.width+"px",top:s+"px",left:u+"px"})}}clear(r){var a=this;if(a.items.length){var s=a.controlChildren();kt(s,u=>{a.removeItem(u,!0)}),a.inputState(),r||a.updateOriginalInput(),a.trigger("clear")}}insertAtCaret(r){let a=this,s=a.caretPos,u=a.control;u.insertBefore(r,u.children[s]||null),a.setCaret(s+1)}deleteSelection(r){var a,s,u,f,p=this;a=r&&r.keyCode===mi?-1:1,s=Tn(p.control_input);let x=[];if(p.activeItems.length)f=pi(p.activeItems,a),u=Oo(f),a>0&&u++,kt(p.activeItems,L=>x.push(L));else if((p.isFocused||p.settings.mode==="single")&&p.items.length){let L=p.controlChildren(),_;a<0&&s.start===0&&s.length===0?_=L[p.caretPos-1]:a>0&&s.start===p.inputValue().length&&(_=L[p.caretPos]),_!==void 0&&x.push(_)}if(!p.shouldDelete(x,r))return!1;for(J(r,!0),typeof u<"u"&&p.setCaret(u);x.length;)p.removeItem(x.pop());return p.inputState(),p.positionDropdown(),p.refreshOptions(!1),!0}shouldDelete(r,a){let s=r.map(u=>u.dataset.value);return!(!s.length||typeof this.settings.onDelete=="function"&&this.settings.onDelete.call(this,s,a)===!1)}advanceSelection(r,a){var s,u,f=this;f.rtl&&(r*=-1),!f.inputValue().length&&(_e(zo,a)||_e("shiftKey",a)?(s=f.getLastActive(r),s?s.classList.contains("active")?u=f.getAdjacent(s,r,"item"):u=s:r>0?u=f.control_input.nextElementSibling:u=f.control_input.previousElementSibling,u&&(u.classList.contains("active")&&f.removeActiveItem(s),f.setActiveItemClass(u))):f.moveCaret(r))}moveCaret(r){}getLastActive(r){let a=this.control.querySelector(".last-active");if(a)return a;var s=this.control.querySelectorAll(".active");if(s)return pi(s,r)}setCaret(r){this.caretPos=this.items.length}controlChildren(){return Array.from(this.control.querySelectorAll("[data-ts-item]"))}lock(){this.setLocked(!0)}unlock(){this.setLocked(!1)}setLocked(r=this.isReadOnly||this.isDisabled){this.isLocked=r,this.refreshState()}disable(){this.setDisabled(!0),this.close()}enable(){this.setDisabled(!1)}setDisabled(r){this.focus_node.tabIndex=r?-1:this.tabIndex,this.isDisabled=r,this.input.disabled=r,this.control_input.disabled=r,this.setLocked()}setReadOnly(r){this.isReadOnly=r,this.input.readOnly=r,this.control_input.readOnly=r,this.setLocked()}destroy(){var r=this,a=r.revertSettings;r.trigger("destroy"),r.off(),r.wrapper.remove(),r.dropdown.remove(),r.input.innerHTML=a.innerHTML,r.input.tabIndex=a.tabIndex,de(r.input,"tomselected","ts-hidden-accessible"),r._destroy(),delete r.input.tomselect}render(r,a){var s,u;let f=this;if(typeof this.settings.render[r]!="function"||(u=f.settings.render[r].call(this,a,Ao),!u))return null;if(u=yt(u),r==="option"||r==="option_create"?a[f.settings.disabledField]?at(u,{"aria-disabled":"true"}):at(u,{"data-selectable":""}):r==="optgroup"&&(s=a.group[f.settings.optgroupValueField],at(u,{"data-group":s}),a.group[f.settings.disabledField]&&at(u,{"data-disabled":""})),r==="option"||r==="item"){let p=So(a[f.settings.valueField]);at(u,{"data-value":p}),r==="item"?(Et(u,f.settings.itemClass),at(u,{"data-ts-item":""})):(Et(u,f.settings.optionClass),at(u,{role:"option",id:a.$id}),a.$div=u,f.options[p]=a)}return u}_render(r,a){let s=this.render(r,a);if(s==null)throw"HTMLElement expected";return s}clearCache(){kt(this.options,r=>{r.$div&&(r.$div.remove(),delete r.$div)})}uncacheValue(r){let a=this.getOption(r);a&&a.remove()}canCreate(r){return this.settings.create&&r.length>0&&this.settings.createFilter.call(this,r)}hook(r,a,s){var u=this,f=u[a];u[a]=function(){var p,x;return r==="after"&&(p=f.apply(u,arguments)),x=s.apply(u,arguments),r==="instead"?x:(r==="before"&&(p=f.apply(u,arguments)),p)}}}function Hn(){Q(this.input,"change",()=>{this.sync()})}function jn(l){var r=this,a=r.onOptionSelect;r.settings.hideSelected=!1;let s=Object.assign({className:"tomselect-checkbox",checkedClassNames:void 0,uncheckedClassNames:void 0},l);var u=function(x,L){L?(x.checked=!0,s.uncheckedClassNames&&x.classList.remove(...s.uncheckedClassNames),s.checkedClassNames&&x.classList.add(...s.checkedClassNames)):(x.checked=!1,s.checkedClassNames&&x.classList.remove(...s.checkedClassNames),s.uncheckedClassNames&&x.classList.add(...s.uncheckedClassNames))},f=function(x){setTimeout(()=>{var L=x.querySelector("input."+s.className);L instanceof HTMLInputElement&&u(L,x.classList.contains("selected"))},1)};r.hook("after","setupTemplates",()=>{var p=r.settings.render.option;r.settings.render.option=(x,L)=>{var _=yt(p.call(r,x,L)),z=document.createElement("input");s.className&&z.classList.add(s.className),z.addEventListener("click",function(R){J(R)}),z.type="checkbox";let F=Pt(x[r.settings.valueField]);return u(z,!!(F&&r.items.indexOf(F)>-1)),_.prepend(z),_}}),r.on("item_remove",p=>{var x=r.getOption(p);x&&(x.classList.remove("selected"),f(x))}),r.on("item_add",p=>{var x=r.getOption(p);x&&f(x)}),r.hook("instead","onOptionSelect",(p,x)=>{if(x.classList.contains("selected")){x.classList.remove("selected"),r.removeItem(x.dataset.value),r.refreshOptions(),J(p,!0);return}a.call(r,p,x),f(x)})}function Wn(l){let r=this,a=Object.assign({className:"clear-button",title:"Clear All",role:"button",tabindex:0,html:s=>`<div class="${s.className}" title="${s.title}" role="${s.role}" tabindex="${s.tabindex}">&times;</div>`},l);r.on("initialize",()=>{var s=yt(a.html(a));s.addEventListener("click",u=>{r.isLocked||(r.clear(),r.settings.mode==="single"&&r.settings.allowEmptyOption&&r.addItem(""),r.refreshOptions(!1),u.preventDefault(),u.stopPropagation())}),r.control.appendChild(s)})}let Yn=(l,r)=>{var a;(a=l.parentNode)==null||a.insertBefore(r,l.nextSibling)},Kn=(l,r)=>{var a;(a=l.parentNode)==null||a.insertBefore(r,l)},Gn=(l,r)=>{do{var a;if(r=(a=r)==null?void 0:a.previousElementSibling,l==r)return!0}while(r&&r.previousElementSibling);return!1};function Xn(){var l=this;if(l.settings.mode!=="multi")return;var r=l.lock,a=l.unlock;let s=!0,u;l.hook("after","setupTemplates",()=>{var f=l.settings.render.item;l.settings.render.item=(p,x)=>{let L=yt(f.call(l,p,x));at(L,{draggable:"true"});let _=T=>{s||J(T),T.stopPropagation()},z=T=>{u=L,setTimeout(()=>{L.classList.add("ts-dragging")},0)},F=T=>{T.preventDefault(),L.classList.add("ts-drag-over"),nt(L,u)},R=()=>{L.classList.remove("ts-drag-over")},nt=(T,X)=>{X!==void 0&&(Gn(X,L)?Yn(T,X):Kn(T,X))},A=()=>{var T;document.querySelectorAll(".ts-drag-over").forEach(tt=>tt.classList.remove("ts-drag-over")),(T=u)==null||T.classList.remove("ts-dragging"),u=void 0;var X=[];l.control.querySelectorAll("[data-value]").forEach(tt=>{if(tt.dataset.value){let ut=tt.dataset.value;ut&&X.push(ut)}}),l.setValue(X)};return Q(L,"mousedown",_),Q(L,"dragstart",z),Q(L,"dragenter",F),Q(L,"dragover",F),Q(L,"dragleave",R),Q(L,"dragend",A),L}}),l.hook("instead","lock",()=>(s=!1,r.call(l))),l.hook("instead","unlock",()=>(s=!0,a.call(l)))}function Jn(l){let r=this,a=Object.assign({title:"Untitled",headerClass:"dropdown-header",titleRowClass:"dropdown-header-title",labelClass:"dropdown-header-label",closeClass:"dropdown-header-close",html:s=>'<div class="'+s.headerClass+'"><div class="'+s.titleRowClass+'"><span class="'+s.labelClass+'">'+s.title+'</span><a class="'+s.closeClass+'">&times;</a></div></div>'},l);r.on("initialize",()=>{var s=yt(a.html(a)),u=s.querySelector("."+a.closeClass);u&&u.addEventListener("click",f=>{J(f,!0),r.close()}),r.dropdown.insertBefore(s,r.dropdown.firstChild)})}function Qn(){var l=this;l.hook("instead","setCaret",r=>{l.settings.mode==="single"||!l.control.contains(l.control_input)?r=l.items.length:(r=Math.max(0,Math.min(l.items.length,r)),r!=l.caretPos&&!l.isPending&&l.controlChildren().forEach((a,s)=>{s<r?l.control_input.insertAdjacentElement("beforebegin",a):l.control.appendChild(a)})),l.caretPos=r}),l.hook("instead","moveCaret",r=>{if(!l.isFocused)return;let a=l.getLastActive(r);if(a){let s=Oo(a);l.setCaret(r>0?s+1:s),l.setActiveItem(),de(a,"last-active")}else l.setCaret(l.caretPos+r)})}function Zn(){let l=this;l.settings.shouldOpen=!0,l.hook("before","setup",()=>{var r;l.focus_node=l.control,Et(l.control_input,"dropdown-input");let a=yt('<div class="dropdown-input-wrap">');a.append(l.control_input),l.dropdown.insertBefore(a,l.dropdown.firstChild);let s=yt('<input class="items-placeholder" tabindex="-1" />');s.placeholder=l.settings.placeholder||"",l.control.append(s);let u=(r=l.input)==null?void 0:r.getAttribute("aria-label");u&&s.setAttribute("aria-label",u)}),l.on("initialize",()=>{l.control_input.addEventListener("keydown",a=>{switch(a.keyCode){case hi:l.isOpen&&(J(a,!0),l.close()),l.clearActiveItems();return;case yr:l.focus_node.tabIndex=-1;break}return l.onKeyDown.call(l,a)}),l.on("blur",()=>{l.focus_node.tabIndex=l.isDisabled?-1:l.tabIndex}),l.on("dropdown_open",()=>{l.control_input.focus()});let r=l.onBlur;l.hook("instead","onBlur",a=>{if(!(a&&a.relatedTarget==l.control_input))return r.call(l)}),Q(l.control_input,"blur",()=>l.onBlur()),l.hook("before","close",()=>{l.isOpen&&l.focus_node.focus({preventScroll:!0})})})}function ts(){var l=this;l.on("initialize",()=>{var r=document.createElement("span"),a=l.control_input;r.style.cssText="position:absolute; top:-99999px; left:-99999px; width:auto; padding:0; white-space:pre; ",l.wrapper.appendChild(r);var s=["letterSpacing","fontSize","fontFamily","fontWeight","textTransform"];for(let f of s)r.style[f]=a.style[f];var u=()=>{r.textContent=a.value,a.style.width=r.clientWidth+"px"};u(),l.on("update item_add item_remove",u),Q(a,"input",u),Q(a,"keyup",u),Q(a,"blur",u),Q(a,"update",u)})}function es(){var l=this,r=l.deleteSelection;this.hook("instead","deleteSelection",a=>l.activeItems.length?r.call(l,a):!1)}function os(){this.hook("instead","setActiveItem",()=>{}),this.hook("instead","selectAll",()=>{})}function rs(){var l=this,r=l.onKeyDown;l.hook("instead","onKeyDown",a=>{var s,u,f,p;if(!l.isOpen||!(a.keyCode===br||a.keyCode===fi))return r.call(l,a);l.ignoreHover=!0,p=$o(l.activeOption,"[data-group]"),s=Oo(l.activeOption,"[data-selectable]"),p&&(a.keyCode===br?p=p.previousSibling:p=p.nextSibling,p&&(f=p.querySelectorAll("[data-selectable]"),u=f[Math.min(f.length-1,s)],u&&l.setActiveOption(u)))})}function is(l){let r=Object.assign({label:"&times;",title:"Remove",className:"remove",append:!0},l);var a=this;if(r.append){var s='<a href="javascript:void(0)" class="'+r.className+'" tabindex="-1" title="'+Ao(r.title)+'">'+r.label+"</a>";a.hook("after","setupTemplates",()=>{var u=a.settings.render.item;a.settings.render.item=(f,p)=>{var x=yt(u.call(a,f,p)),L=yt(s);return x.appendChild(L),Q(L,"mousedown",_=>{J(_,!0)}),Q(L,"click",_=>{a.isLocked||(J(_,!0),!a.isLocked&&a.shouldDelete([x],_)&&(a.removeItem(x),a.refreshOptions(!1),a.inputState()))}),x}})}}function as(l){let r=this,a=Object.assign({text:s=>s[r.settings.labelField]},l);r.on("item_remove",function(s){if(r.isFocused&&r.control_input.value.trim()===""){var u=r.options[s];u&&r.setTextboxValue(a.text.call(r,u))}})}function ns(){let l=this,r=l.canLoad,a=l.clearActiveOption,s=l.loadCallback;var u={},f,p=!1,x,L=[],_=!1,z;if(l.settings.shouldLoadMore||(l.settings.shouldLoadMore=()=>{if(f.clientHeight/(f.scrollHeight-f.scrollTop)>.9)return!0;if(l.activeOption){var T=l.selectable(),X=Array.from(T).indexOf(l.activeOption);if(X>=T.length-2)return!0}return!1}),!l.settings.firstUrl)throw"virtual_scroll plugin requires a firstUrl() method";l.settings.sortField=[{field:"$order"},{field:"$score"}];let F=A=>typeof l.settings.maxOptions=="number"&&f.children.length>=l.settings.maxOptions?!1:!!(A in u&&u[A]),R=(A,T)=>l.items.indexOf(T)>=0||L.indexOf(T)>=0;l.setNextUrl=(A,T)=>{u[A]=T},l.getUrl=A=>{if(A in u){let T=u[A];return u[A]=!1,T}return l.clearPagination(),l.settings.firstUrl.call(l,A)},l.clearPagination=()=>{u={}},l.hook("instead","clearActiveOption",()=>{if(!p)return a.call(l)}),l.hook("instead","canLoad",A=>A in u?F(A):r.call(l,A)),l.hook("instead","loadCallback",(A,T)=>{if(!p)l.clearOptions(R);else if(x){let X=A[0];X!==void 0&&(x.dataset.value=X[l.settings.valueField])}s.call(l,A,T),!p&&!_&&(_=!0,l.lastValue===""&&(L=Object.keys(l.options),z=u[""])),p=!1}),l.hook("before","refreshOptions",()=>{l.activeOption&&l.activeOption.getAttribute("role")!=="option"&&l.setActiveOption(l.activeOption.previousElementSibling)}),l.hook("after","refreshOptions",()=>{let A=l.lastValue;var T;F(A)?(T=l.render("loading_more",{query:A}),T&&(T.setAttribute("data-selectable",""),x=T)):A in u&&!f.querySelector(".no-results")&&(T=l.render("no_more_results",{query:A})),T&&(Et(T,l.settings.optionClass),f.append(T))});let nt=()=>{_&&(l.clearOptions(R),z&&(u[""]=z))};l.on("type",A=>{A===""&&(nt(),l.refreshOptions(!1))}),l.on("dropdown_close",nt),l.on("initialize",()=>{L=Object.keys(l.options),f=l.dropdown_content,l.settings.render=Object.assign({},{loading_more:()=>'<div class="loading-more-results">Loading more results ... </div>',no_more_results:()=>'<div class="no-more-results">No more results</div>'},l.settings.render),f.addEventListener("scroll",()=>{l.settings.shouldLoadMore.call(l)&&F(l.lastValue)&&(p||(p=!0,l.load.call(l,l.lastValue)))})})}return $t.define("change_listener",Hn),$t.define("checkbox_options",jn),$t.define("clear_button",Wn),$t.define("drag_drop",Xn),$t.define("dropdown_header",Jn),$t.define("caret_position",Qn),$t.define("dropdown_input",Zn),$t.define("input_autogrow",ts),$t.define("no_backspace_delete",es),$t.define("no_active_items",os),$t.define("optgroup_columns",rs),$t.define("remove_button",is),$t.define("restore_on_backspace",as),$t.define("virtual_scroll",ns),$t}))});var To=()=>({checkValidity(t){let e=t.input,o={message:"",isValid:!0,invalidKeys:[]};if(!e)return o;let i=!0;if("checkValidity"in e&&(i=e.checkValidity()),i)return o;if(o.isValid=!1,"validationMessage"in e&&(o.message=e.validationMessage),!("validity"in e))return o.invalidKeys.push("customError"),o;for(let n in e.validity){if(n==="valid")continue;let c=n;e.validity[c]&&o.invalidKeys.push(c)}return o}});var Bo=class extends Event{constructor(){super("wa-invalid",{bubbles:!0,cancelable:!1,composed:!0})}};var vs=Object.defineProperty,ws=Object.getOwnPropertyDescriptor,yi=t=>{throw TypeError(t)},h=(t,e,o,i)=>{for(var n=i>1?void 0:i?ws(e,o):e,c=t.length-1,d;c>=0;c--)(d=t[c])&&(n=(i?d(e,o,n):d(n))||n);return i&&n&&vs(e,o,n),n},xi=(t,e,o)=>e.has(t)||yi("Cannot "+o),Ci=(t,e,o)=>(xi(t,e,"read from private field"),o?o.call(t):e.get(t)),ki=(t,e,o)=>e.has(t)?yi("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,o),_i=(t,e,o,i)=>(xi(t,e,"write to private field"),i?i.call(t,o):e.set(t,o),o);var Mo=globalThis,Ro=Mo.ShadowRoot&&(Mo.ShadyCSS===void 0||Mo.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,xr=Symbol(),Li=new WeakMap,so=class{constructor(e,o,i){if(this._$cssResult$=!0,i!==xr)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=o}get styleSheet(){let e=this.o,o=this.t;if(Ro&&e===void 0){let i=o!==void 0&&o.length===1;i&&(e=Li.get(o)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&Li.set(o,e))}return e}toString(){return this.cssText}},Si=t=>new so(typeof t=="string"?t:t+"",void 0,xr),j=(t,...e)=>{let o=t.length===1?t[0]:e.reduce((i,n,c)=>i+(d=>{if(d._$cssResult$===!0)return d.cssText;if(typeof d=="number")return d;throw Error("Value passed to 'css' function must be a 'css' function result: "+d+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+t[c+1],t[0]);return new so(o,t,xr)},Ai=(t,e)=>{if(Ro)t.adoptedStyleSheets=e.map(o=>o instanceof CSSStyleSheet?o:o.styleSheet);else for(let o of e){let i=document.createElement("style"),n=Mo.litNonce;n!==void 0&&i.setAttribute("nonce",n),i.textContent=o.cssText,t.appendChild(i)}},Cr=Ro?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let o="";for(let i of e.cssRules)o+=i.cssText;return Si(o)})(t):t;var{is:bs,defineProperty:ys,getOwnPropertyDescriptor:xs,getOwnPropertyNames:Cs,getOwnPropertySymbols:ks,getPrototypeOf:_s}=Object,Po=globalThis,Ei=Po.trustedTypes,Ls=Ei?Ei.emptyScript:"",Ss=Po.reactiveElementPolyfillSupport,lo=(t,e)=>t,co={toAttribute(t,e){switch(e){case Boolean:t=t?Ls:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let o=t;switch(e){case Boolean:o=t!==null;break;case Number:o=t===null?null:Number(t);break;case Object:case Array:try{o=JSON.parse(t)}catch{o=null}}return o}},Do=(t,e)=>!bs(t,e),$i={attribute:!0,type:String,converter:co,reflect:!1,useDefault:!1,hasChanged:Do};Symbol.metadata??=Symbol("metadata"),Po.litPropertyMetadata??=new WeakMap;var ue=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,o=$i){if(o.state&&(o.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((o=Object.create(o)).wrapped=!0),this.elementProperties.set(e,o),!o.noAccessor){let i=Symbol(),n=this.getPropertyDescriptor(e,i,o);n!==void 0&&ys(this.prototype,e,n)}}static getPropertyDescriptor(e,o,i){let{get:n,set:c}=xs(this.prototype,e)??{get(){return this[o]},set(d){this[o]=d}};return{get:n,set(d){let m=n?.call(this);c?.call(this,d),this.requestUpdate(e,m,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??$i}static _$Ei(){if(this.hasOwnProperty(lo("elementProperties")))return;let e=_s(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(lo("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(lo("properties"))){let o=this.properties,i=[...Cs(o),...ks(o)];for(let n of i)this.createProperty(n,o[n])}let e=this[Symbol.metadata];if(e!==null){let o=litPropertyMetadata.get(e);if(o!==void 0)for(let[i,n]of o)this.elementProperties.set(i,n)}this._$Eh=new Map;for(let[o,i]of this.elementProperties){let n=this._$Eu(o,i);n!==void 0&&this._$Eh.set(n,o)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let o=[];if(Array.isArray(e)){let i=new Set(e.flat(1/0).reverse());for(let n of i)o.unshift(Cr(n))}else e!==void 0&&o.push(Cr(e));return o}static _$Eu(e,o){let i=o.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,o=this.constructor.elementProperties;for(let i of o.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ai(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,o,i){this._$AK(e,i)}_$ET(e,o){let i=this.constructor.elementProperties.get(e),n=this.constructor._$Eu(e,i);if(n!==void 0&&i.reflect===!0){let c=(i.converter?.toAttribute!==void 0?i.converter:co).toAttribute(o,i.type);this._$Em=e,c==null?this.removeAttribute(n):this.setAttribute(n,c),this._$Em=null}}_$AK(e,o){let i=this.constructor,n=i._$Eh.get(e);if(n!==void 0&&this._$Em!==n){let c=i.getPropertyOptions(n),d=typeof c.converter=="function"?{fromAttribute:c.converter}:c.converter?.fromAttribute!==void 0?c.converter:co;this._$Em=n;let m=d.fromAttribute(o,c.type);this[n]=m??this._$Ej?.get(n)??m,this._$Em=null}}requestUpdate(e,o,i,n=!1,c){if(e!==void 0){let d=this.constructor;if(n===!1&&(c=this[e]),i??=d.getPropertyOptions(e),!((i.hasChanged??Do)(c,o)||i.useDefault&&i.reflect&&c===this._$Ej?.get(e)&&!this.hasAttribute(d._$Eu(e,i))))return;this.C(e,o,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,o,{useDefault:i,reflect:n,wrapped:c},d){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,d??o??this[e]),c!==!0||d!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(o=void 0),this._$AL.set(e,o)),n===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(o){Promise.reject(o)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[n,c]of this._$Ep)this[n]=c;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[n,c]of i){let{wrapped:d}=c,m=this[n];d!==!0||this._$AL.has(n)||m===void 0||this.C(n,void 0,c,m)}}let e=!1,o=this._$AL;try{e=this.shouldUpdate(o),e?(this.willUpdate(o),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(o)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(o)}willUpdate(e){}_$AE(e){this._$EO?.forEach(o=>o.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(o=>this._$ET(o,this[o])),this._$EM()}updated(e){}firstUpdated(e){}};ue.elementStyles=[],ue.shadowRootOptions={mode:"open"},ue[lo("elementProperties")]=new Map,ue[lo("finalized")]=new Map,Ss?.({ReactiveElement:ue}),(Po.reactiveElementVersions??=[]).push("2.1.2");var _r=globalThis,Oi=t=>t,No=_r.trustedTypes,zi=No?No.createPolicy("lit-html",{createHTML:t=>t}):void 0,Lr="$lit$",pe=`lit$${Math.random().toFixed(9).slice(2)}$`,Sr="?"+pe,As=`<${Sr}>`,Ee=document,po=()=>Ee.createComment(""),ho=t=>t===null||typeof t!="object"&&typeof t!="function",Ar=Array.isArray,Ri=t=>Ar(t)||typeof t?.[Symbol.iterator]=="function",kr=`[ 	
\f\r]`,uo=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ii=/-->/g,Fi=/>/g,Se=RegExp(`>|${kr}(?:([^\\s"'>=/]+)(${kr}*=${kr}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ti=/'/g,Bi=/"/g,Pi=/^(?:script|style|textarea|title)$/i,Er=t=>(e,...o)=>({_$litType$:t,strings:e,values:o}),O=Er(1),Di=Er(2),Ni=Er(3),xt=Symbol.for("lit-noChange"),N=Symbol.for("lit-nothing"),Mi=new WeakMap,Ae=Ee.createTreeWalker(Ee,129);function qi(t,e){if(!Ar(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return zi!==void 0?zi.createHTML(e):e}var Vi=(t,e)=>{let o=t.length-1,i=[],n,c=e===2?"<svg>":e===3?"<math>":"",d=uo;for(let m=0;m<o;m++){let v=t[m],y,C,b=-1,S=0;for(;S<v.length&&(d.lastIndex=S,C=d.exec(v),C!==null);)S=d.lastIndex,d===uo?C[1]==="!--"?d=Ii:C[1]!==void 0?d=Fi:C[2]!==void 0?(Pi.test(C[2])&&(n=RegExp("</"+C[2],"g")),d=Se):C[3]!==void 0&&(d=Se):d===Se?C[0]===">"?(d=n??uo,b=-1):C[1]===void 0?b=-2:(b=d.lastIndex-C[2].length,y=C[1],d=C[3]===void 0?Se:C[3]==='"'?Bi:Ti):d===Bi||d===Ti?d=Se:d===Ii||d===Fi?d=uo:(d=Se,n=void 0);let k=d===Se&&t[m+1].startsWith("/>")?" ":"";c+=d===uo?v+As:b>=0?(i.push(y),v.slice(0,b)+Lr+v.slice(b)+pe+k):v+pe+(b===-2?m:k)}return[qi(t,c+(t[o]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]},fo=class t{constructor({strings:e,_$litType$:o},i){let n;this.parts=[];let c=0,d=0,m=e.length-1,v=this.parts,[y,C]=Vi(e,o);if(this.el=t.createElement(y,i),Ae.currentNode=this.el.content,o===2||o===3){let b=this.el.content.firstChild;b.replaceWith(...b.childNodes)}for(;(n=Ae.nextNode())!==null&&v.length<m;){if(n.nodeType===1){if(n.hasAttributes())for(let b of n.getAttributeNames())if(b.endsWith(Lr)){let S=C[d++],k=n.getAttribute(b).split(pe),$=/([.?@])?(.*)/.exec(S);v.push({type:1,index:c,name:$[2],strings:k,ctor:$[1]==="."?Vo:$[1]==="?"?Uo:$[1]==="@"?Ho:Oe}),n.removeAttribute(b)}else b.startsWith(pe)&&(v.push({type:6,index:c}),n.removeAttribute(b));if(Pi.test(n.tagName)){let b=n.textContent.split(pe),S=b.length-1;if(S>0){n.textContent=No?No.emptyScript:"";for(let k=0;k<S;k++)n.append(b[k],po()),Ae.nextNode(),v.push({type:2,index:++c});n.append(b[S],po())}}}else if(n.nodeType===8)if(n.data===Sr)v.push({type:2,index:c});else{let b=-1;for(;(b=n.data.indexOf(pe,b+1))!==-1;)v.push({type:7,index:c}),b+=pe.length-1}c++}}static createElement(e,o){let i=Ee.createElement("template");return i.innerHTML=e,i}};function $e(t,e,o=t,i){if(e===xt)return e;let n=i!==void 0?o._$Co?.[i]:o._$Cl,c=ho(e)?void 0:e._$litDirective$;return n?.constructor!==c&&(n?._$AO?.(!1),c===void 0?n=void 0:(n=new c(t),n._$AT(t,o,i)),i!==void 0?(o._$Co??=[])[i]=n:o._$Cl=n),n!==void 0&&(e=$e(t,n._$AS(t,e.values),n,i)),e}var qo=class{constructor(e,o){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=o}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:o},parts:i}=this._$AD,n=(e?.creationScope??Ee).importNode(o,!0);Ae.currentNode=n;let c=Ae.nextNode(),d=0,m=0,v=i[0];for(;v!==void 0;){if(d===v.index){let y;v.type===2?y=new je(c,c.nextSibling,this,e):v.type===1?y=new v.ctor(c,v.name,v.strings,this,e):v.type===6&&(y=new jo(c,this,e)),this._$AV.push(y),v=i[++m]}d!==v?.index&&(c=Ae.nextNode(),d++)}return Ae.currentNode=Ee,n}p(e){let o=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,o),o+=i.strings.length-2):i._$AI(e[o])),o++}},je=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,o,i,n){this.type=2,this._$AH=N,this._$AN=void 0,this._$AA=e,this._$AB=o,this._$AM=i,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,o=this._$AM;return o!==void 0&&e?.nodeType===11&&(e=o.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,o=this){e=$e(this,e,o),ho(e)?e===N||e==null||e===""?(this._$AH!==N&&this._$AR(),this._$AH=N):e!==this._$AH&&e!==xt&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Ri(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==N&&ho(this._$AH)?this._$AA.nextSibling.data=e:this.T(Ee.createTextNode(e)),this._$AH=e}$(e){let{values:o,_$litType$:i}=e,n=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=fo.createElement(qi(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===n)this._$AH.p(o);else{let c=new qo(n,this),d=c.u(this.options);c.p(o),this.T(d),this._$AH=c}}_$AC(e){let o=Mi.get(e.strings);return o===void 0&&Mi.set(e.strings,o=new fo(e)),o}k(e){Ar(this._$AH)||(this._$AH=[],this._$AR());let o=this._$AH,i,n=0;for(let c of e)n===o.length?o.push(i=new t(this.O(po()),this.O(po()),this,this.options)):i=o[n],i._$AI(c),n++;n<o.length&&(this._$AR(i&&i._$AB.nextSibling,n),o.length=n)}_$AR(e=this._$AA.nextSibling,o){for(this._$AP?.(!1,!0,o);e!==this._$AB;){let i=Oi(e).nextSibling;Oi(e).remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},Oe=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,o,i,n,c){this.type=1,this._$AH=N,this._$AN=void 0,this.element=e,this.name=o,this._$AM=n,this.options=c,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=N}_$AI(e,o=this,i,n){let c=this.strings,d=!1;if(c===void 0)e=$e(this,e,o,0),d=!ho(e)||e!==this._$AH&&e!==xt,d&&(this._$AH=e);else{let m=e,v,y;for(e=c[0],v=0;v<c.length-1;v++)y=$e(this,m[i+v],o,v),y===xt&&(y=this._$AH[v]),d||=!ho(y)||y!==this._$AH[v],y===N?e=N:e!==N&&(e+=(y??"")+c[v+1]),this._$AH[v]=y}d&&!n&&this.j(e)}j(e){e===N?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Vo=class extends Oe{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===N?void 0:e}},Uo=class extends Oe{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==N)}},Ho=class extends Oe{constructor(e,o,i,n,c){super(e,o,i,n,c),this.type=5}_$AI(e,o=this){if((e=$e(this,e,o,0)??N)===xt)return;let i=this._$AH,n=e===N&&i!==N||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,c=e!==N&&(i===N||n);n&&this.element.removeEventListener(this.name,this,i),c&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},jo=class{constructor(e,o,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=o,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){$e(this,e)}},Ui={M:Lr,P:pe,A:Sr,C:1,L:Vi,R:qo,D:Ri,V:$e,I:je,H:Oe,N:Uo,U:Ho,B:Vo,F:jo},Es=_r.litHtmlPolyfillSupport;Es?.(fo,je),(_r.litHtmlVersions??=[]).push("3.3.3");var Hi=(t,e,o)=>{let i=o?.renderBefore??e,n=i._$litPart$;if(n===void 0){let c=o?.renderBefore??null;i._$litPart$=n=new je(e.insertBefore(po(),c),c,void 0,o??{})}return n._$AI(t),n};var $r=globalThis,Tt=class extends ue{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let o=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Hi(o,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return xt}};Tt._$litElement$=!0,Tt.finalized=!0,$r.litElementHydrateSupport?.({LitElement:Tt});var $s=$r.litElementPolyfillSupport;$s?.({LitElement:Tt});($r.litElementVersions??=[]).push("4.2.2");var it=t=>(e,o)=>{o!==void 0?o.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};var Os={attribute:!0,type:String,converter:co,reflect:!1,hasChanged:Do},zs=(t=Os,e,o)=>{let{kind:i,metadata:n}=o,c=globalThis.litPropertyMetadata.get(n);if(c===void 0&&globalThis.litPropertyMetadata.set(n,c=new Map),i==="setter"&&((t=Object.create(t)).wrapped=!0),c.set(o.name,t),i==="accessor"){let{name:d}=o;return{set(m){let v=e.get.call(this);e.set.call(this,m),this.requestUpdate(d,v,t,!0,m)},init(m){return m!==void 0&&this.C(d,void 0,t,m),m}}}if(i==="setter"){let{name:d}=o;return function(m){let v=this[d];e.call(this,m),this.requestUpdate(d,v,t,!0,m)}}throw Error("Unsupported decorator location: "+i)};function w(t){return(e,o)=>typeof o=="object"?zs(t,e,o):((i,n,c)=>{let d=n.hasOwnProperty(c);return n.constructor.createProperty(c,i),d?Object.getOwnPropertyDescriptor(n,c):void 0})(t,e,o)}function zt(t){return w({...t,state:!0,attribute:!1})}var ze=(t,e,o)=>(o.configurable=!0,o.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(t,e,o),o);function st(t,e){return(o,i,n)=>{let c=d=>d.renderRoot?.querySelector(t)??null;if(e){let{get:d,set:m}=typeof i=="object"?o:n??(()=>{let v=Symbol();return{get(){return this[v]},set(y){this[v]=y}}})();return ze(o,i,{get(){let v=d.call(this);return v===void 0&&(v=c(this),(v!==null||this.hasUpdated)&&m.call(this,v)),v}})}return ze(o,i,{get(){return c(this)}})}}var Is=j`
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
`,Wo,ct=class extends Tt{constructor(){super(),ki(this,Wo,!1),this.initialReflectedProperties=new Map,this.didSSR=!!this.shadowRoot,this.customStates={set:(e,o)=>{if(this.internals?.states)try{o?this.internals.states.add(e):this.internals.states.delete(e)}catch(i){if(String(i).includes("must start with '--'"))console.error("Your browser implements an outdated version of CustomStateSet. Consider using a polyfill");else throw i}},has:e=>{if(!this.internals?.states)return!1;try{return this.internals.states.has(e)}catch{return!1}}};try{this.internals=this.attachInternals()}catch{console.error("Element internals are not supported in your browser. Consider using a polyfill")}this.customStates.set("wa-defined",!0);let t=this.constructor;for(let[e,o]of t.elementProperties)o.default==="inherit"&&o.initial!==void 0&&typeof e=="string"&&this.customStates.set(`initial-${e}-${o.initial}`,!0)}static get styles(){let t=Array.isArray(this.css)?this.css:this.css?[this.css]:[];return[Is,...t]}connectedCallback(){super.connectedCallback(),this.shadowRoot?.prepend(document.createComment(` Web Awesome: https://webawesome.com/docs/components/${this.localName.replace("wa-","")} `))}attributeChangedCallback(t,e,o){Ci(this,Wo)||(this.constructor.elementProperties.forEach((i,n)=>{i.reflect&&this[n]!=null&&this.initialReflectedProperties.set(n,this[n])}),_i(this,Wo,!0)),super.attributeChangedCallback(t,e,o)}willUpdate(t){super.willUpdate(t),this.initialReflectedProperties.forEach((e,o)=>{t.has(o)&&this[o]==null&&(this[o]=e)})}firstUpdated(t){super.firstUpdated(t),this.didSSR&&this.shadowRoot?.querySelectorAll("slot").forEach(e=>{e.dispatchEvent(new Event("slotchange",{bubbles:!0,composed:!1,cancelable:!1}))})}update(t){try{super.update(t)}catch(e){if(this.didSSR&&!this.hasUpdated){let o=new Event("lit-hydration-error",{bubbles:!0,composed:!0,cancelable:!1});o.error=e,this.dispatchEvent(o)}throw e}}relayNativeEvent(t,e){t.stopImmediatePropagation(),this.dispatchEvent(new t.constructor(t.type,{...t,...e}))}};Wo=new WeakMap;h([w()],ct.prototype,"dir",2);h([w()],ct.prototype,"lang",2);h([w({type:Boolean,reflect:!0,attribute:"did-ssr"})],ct.prototype,"didSSR",2);var Fs=()=>({observedAttributes:["custom-error"],checkValidity(t){let e={message:"",isValid:!0,invalidKeys:[]};return t.customError&&(e.message=t.customError,e.isValid=!1,e.invalidKeys=["customError"]),e}}),Ct=class extends ct{constructor(){super(),this.name=null,this.disabled=!1,this.required=!1,this.assumeInteractionOn=["input"],this.validators=[],this.valueHasChanged=!1,this.hasInteracted=!1,this.customError=null,this.emittedEvents=[],this.emitInvalid=t=>{t.target===this&&(this.hasInteracted=!0,this.dispatchEvent(new Bo))},this.handleInteraction=t=>{let e=this.emittedEvents;e.includes(t.type)||e.push(t.type),e.length===this.assumeInteractionOn?.length&&(this.hasInteracted=!0)},this.addEventListener("invalid",this.emitInvalid)}static get validators(){return[Fs()]}static get observedAttributes(){let t=new Set(super.observedAttributes||[]);for(let e of this.validators)if(e.observedAttributes)for(let o of e.observedAttributes)t.add(o);return[...t]}connectedCallback(){super.connectedCallback(),this.updateValidity(),this.assumeInteractionOn.forEach(t=>{this.addEventListener(t,this.handleInteraction)})}firstUpdated(...t){super.firstUpdated(...t),this.updateValidity()}willUpdate(t){if(!!1&&t.has("customError")&&(this.customError||(this.customError=null),this.setCustomValidity(this.customError||"")),t.has("value")||t.has("disabled")||t.has("defaultValue")){let e=this.value;if(Array.isArray(e)){if(this.name){let o=new FormData;for(let i of e)o.append(this.name,i);this.setValue(o,o)}}else this.setValue(e,e)}t.has("disabled")&&(this.customStates.set("disabled",this.disabled),(this.hasAttribute("disabled")||!!1&&!this.matches(":disabled"))&&this.toggleAttribute("disabled",this.disabled)),super.willUpdate(t),this.updateValidity()}get labels(){return this.internals.labels}getForm(){return this.internals.form}set form(t){t?this.setAttribute("form",t):this.removeAttribute("form")}get form(){return this.internals.form}get validity(){return this.internals.validity}get willValidate(){return this.internals.willValidate}get validationMessage(){return this.internals.validationMessage}checkValidity(){return this.updateValidity(),this.internals.checkValidity()}reportValidity(){return this.updateValidity(),this.hasInteracted=!0,this.internals.reportValidity()}get validationTarget(){return this.input||void 0}setValidity(...t){let e=t[0],o=t[1],i=t[2];i||(i=this.validationTarget),this.internals.setValidity(e,o,i||void 0),this.requestUpdate("validity"),this.setCustomStates()}setCustomStates(){let t=!!this.required,e=this.internals.validity.valid,o=this.hasInteracted;this.customStates.set("required",t),this.customStates.set("optional",!t),this.customStates.set("invalid",!e),this.customStates.set("valid",e),this.customStates.set("user-invalid",!e&&o),this.customStates.set("user-valid",e&&o)}setCustomValidity(t){if(!t){this.customError=null,this.setValidity({});return}this.customError=t,this.setValidity({customError:!0},t,this.validationTarget)}formResetCallback(){this.resetValidity(),this.hasInteracted=!1,this.valueHasChanged=!1,this.emittedEvents=[],this.updateValidity()}formDisabledCallback(t){this.disabled=t,this.updateValidity()}formStateRestoreCallback(t,e){this.value=t,e==="restore"&&this.resetValidity(),this.updateValidity()}setValue(...t){let[e,o]=t;this.internals.setFormValue(e,o)}get allValidators(){let t=this.constructor.validators||[],e=this.validators||[];return[...t,...e]}resetValidity(){this.setCustomValidity(""),this.setValidity({})}updateValidity(){if(this.disabled||this.hasAttribute("disabled")||!this.willValidate){this.resetValidity();return}let t=this.allValidators;if(!t?.length)return;let e={customError:!!this.customError},o=this.validationTarget||this.input||void 0,i="";for(let n of t){let{isValid:c,message:d,invalidKeys:m}=n.checkValidity(this);c||(i||(i=d),m?.length>=0&&m.forEach(v=>e[v]=!0))}i||(i=this.validationMessage),this.setValidity(e,i,o)}};Ct.formAssociated=!0;h([w({reflect:!0})],Ct.prototype,"name",2);h([w({type:Boolean})],Ct.prototype,"disabled",2);h([w({state:!0,attribute:!1})],Ct.prototype,"valueHasChanged",2);h([w({state:!0,attribute:!1})],Ct.prototype,"hasInteracted",2);h([w({attribute:"custom-error",reflect:!0})],Ct.prototype,"customError",2);h([w({attribute:!1,state:!0,type:Object})],Ct.prototype,"validity",1);var ji={small:"s",medium:"m",large:"l"},Wi=new Set;function Ut(t,e){e in ji&&!Wi.has(`${t}:${e}`)&&(Wi.add(`${t}:${e}`),console.warn(`[${t}] size="${e}" is deprecated. Use size="${ji[e]}" instead. The long-form value will be removed in the next major version.`))}var oe=class{constructor(t,...e){this.slotNames=[],this.handleSlotChange=o=>{let i=o.target;(this.slotNames.includes("[default]")&&!i.name||i.name&&this.slotNames.includes(i.name))&&this.host.requestUpdate()},(this.host=t).addController(this),this.slotNames=e}hasDefaultSlot(){return this.host.childNodes?[...this.host.childNodes].some(t=>{if(t.nodeType===Node.TEXT_NODE&&t.textContent.trim()!=="")return!0;if(t.nodeType===Node.ELEMENT_NODE){let e=t;if(e.tagName.toLowerCase()==="wa-visually-hidden")return!1;if(!e.hasAttribute("slot"))return!0}return!1}):!1}hasNamedSlot(t){return this.host.querySelector?.(`:scope > [slot="${t}"]`)!==null}test(t){return t==="[default]"?this.hasDefaultSlot():this.hasNamedSlot(t)}hostConnected(){this.host.shadowRoot?.addEventListener?.("slotchange",this.handleSlotChange)}hostDisconnected(){this.host.shadowRoot?.removeEventListener?.("slotchange",this.handleSlotChange)}};var Ht=j`
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
`;var We=j`
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
`;var Or=new Set,Ye=new Map,Ie,zr="ltr",Ir="en",Ki=typeof MutationObserver<"u"&&typeof document<"u"&&typeof document.documentElement<"u";if(Ki){let t=new MutationObserver(Gi);zr=document.documentElement.dir||"ltr",Ir=document.documentElement.lang||navigator.language,t.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]})}function mo(...t){t.map(e=>{let o=e.$code.toLowerCase();Ye.has(o)?Ye.set(o,Object.assign(Object.assign({},Ye.get(o)),e)):Ye.set(o,e),Ie||(Ie=e)}),Gi()}function Gi(){Ki&&(zr=document.documentElement.dir||"ltr",Ir=document.documentElement.lang||navigator.language),[...Or.keys()].map(t=>{typeof t.requestUpdate=="function"&&t.requestUpdate()})}var Yo=class{constructor(e){this.host=e,this.host.addController(this)}hostConnected(){Or.add(this.host)}hostDisconnected(){Or.delete(this.host)}dir(){return`${this.host.dir||zr}`.toLowerCase()}lang(){return`${this.host.lang||Ir}`.toLowerCase()}getTranslationData(e){var o,i;let n;try{n=new Intl.Locale(e.replace(/_/g,"-"))}catch{return{locale:void 0,language:"",region:"",primary:void 0,secondary:void 0}}let c=n.language.toLowerCase(),d=(i=(o=n.region)===null||o===void 0?void 0:o.toLowerCase())!==null&&i!==void 0?i:"",m=Ye.get(`${c}-${d}`),v=Ye.get(c);return{locale:n,language:c,region:d,primary:m,secondary:v}}exists(e,o){var i;let{primary:n,secondary:c}=this.getTranslationData((i=o.lang)!==null&&i!==void 0?i:this.lang());return o=Object.assign({includeFallback:!1},o),!!(n&&n[e]||c&&c[e]||o.includeFallback&&Ie&&Ie[e])}term(e,...o){let{primary:i,secondary:n}=this.getTranslationData(this.lang()),c;if(i&&i[e])c=i[e];else if(n&&n[e])c=n[e];else if(Ie&&Ie[e])c=Ie[e];else return console.error(`No translation found for: ${String(e)}`),String(e);return typeof c=="function"?c(...o):c}date(e,o){return e=new Date(e),new Intl.DateTimeFormat(this.lang(),o).format(e)}number(e,o){return e=Number(e),isNaN(e)?"":new Intl.NumberFormat(this.lang(),o).format(e)}relativeTime(e,o,i){return new Intl.RelativeTimeFormat(this.lang(),i).format(e,o)}};var Xi={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",captions:"Captions",clearEntry:"Clear entry",close:"Close",createOption:t=>`Create "${t}"`,copied:"Copied",copy:"Copy",currentValue:"Current value",dropFileHere:"Drop file here or click to browse",decrement:"Decrement",dropFilesHere:"Drop files here or click to browse",error:"Error",enterFullscreen:"Enter fullscreen",exitFullscreen:"Exit fullscreen",goToSlide:(t,e)=>`Go to slide ${t} of ${e}`,hidePassword:"Hide password",increment:"Increment",loading:"Loading",moreOptions:"More Options",mute:"Mute",nextSlide:"Next slide",nextVideo:"Next Video",numCharacters:t=>t===1?"1 character":`${t} characters`,numCharactersRemaining:t=>t===1?"1 character remaining":`${t} characters remaining`,numOptionsSelected:t=>t===0?"No options selected":t===1?"1 option selected":`${t} options selected`,pause:"Pause",pauseAnimation:"Pause animation",pictureInPicture:"Picture in picture",play:"Play",playbackSpeed:"Playback speed",playlist:"Playlist",playAnimation:"Play animation",previousSlide:"Previous slide",previousVideo:"Previous video",progress:"Progress",remove:"Remove",resize:"Resize",scrollableRegion:"Scrollable region",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:t=>`Slide ${t}`,toggleColorFormat:"Toggle color format",seek:"Seek",seekProgress:(t,e)=>`${t} of ${e}`,currentlyPlaying:"currently playing",unmute:"Unmute",videoPlayer:"Video player",volume:"Volume",zoomIn:"Zoom in",zoomOut:"Zoom out"};mo(Xi);var Ji=Xi;var St=class extends Yo{};mo(Ji);function W(t,e){let o={waitUntilFirstUpdate:!1,...e};return(i,n)=>{let{update:c}=i,d=Array.isArray(t)?t:[t];i.update=function(m){d.forEach(v=>{let y=v;if(m.has(y)){let C=m.get(y),b=this[y];C!==b&&(!o.waitUntilFirstUpdate||this.hasUpdated)&&this[n](C,b)}}),c.call(this,m)}}}var Dt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},be=t=>(...e)=>({_$litDirective$:t,values:e}),re=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,o,i){this._$Ct=e,this._$AM=o,this._$Ci=i}_$AS(e,o){return this.update(e,o)}update(e,o){return this.render(...o)}};var wt=be(class extends re{constructor(t){if(super(t),t.type!==Dt.ATTRIBUTE||t.name!=="class"||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){if(this.st===void 0){this.st=new Set,t.strings!==void 0&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(i=>i!=="")));for(let i in e)e[i]&&!this.nt?.has(i)&&this.st.add(i);return this.render(e)}let o=t.element.classList;for(let i of this.st)i in e||(o.remove(i),this.st.delete(i));for(let i in e){let n=!!e[i];n===this.st.has(i)||this.nt?.has(i)||(n?(o.add(i),this.st.add(i)):(o.remove(i),this.st.delete(i)))}return xt}});var et=t=>t??N;var Zi=Symbol.for(""),Ts=t=>{if(t?.r===Zi)return t?._$litStatic$};var Fr=(t,...e)=>({_$litStatic$:e.reduce((o,i,n)=>o+(c=>{if(c._$litStatic$!==void 0)return c._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${c}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)})(i)+t[n+1],t[0]),r:Zi}),Qi=new Map,Tr=t=>(e,...o)=>{let i=o.length,n,c,d=[],m=[],v,y=0,C=!1;for(;y<i;){for(v=e[y];y<i&&(c=o[y],(n=Ts(c))!==void 0);)v+=n+e[++y],C=!0;y!==i&&m.push(c),d.push(v),y++}if(y===i&&d.push(e[i]),C){let b=d.join("$$lit$$");(e=Qi.get(b))===void 0&&(d.raw=d,Qi.set(b,e=d)),o=m}return t(e,...o)},Ko=Tr(O),Nd=Tr(Di),qd=Tr(Ni);var V=class extends Ct{constructor(){super(...arguments),this.assumeInteractionOn=["click"],this.hasSlotController=new oe(this,"[default]","start","end"),this.localize=new St(this),this.invalid=!1,this.isIconButton=!1,this.title="",this.variant="neutral",this.appearance="accent",this.size="m",this.withCaret=!1,this.withStart=!1,this.withEnd=!1,this.disabled=!1,this.loading=!1,this.pill=!1,this.type="button"}static get validators(){return[...super.validators,To()]}handleSizeChange(){Ut(this.localName,this.size)}constructLightDOMButton(){let t=document.createElement("button");for(let e of this.attributes)e.name!=="style"&&t.setAttribute(e.name,e.value);return t.type=this.type,t.style.position="absolute !important",t.style.width="0 !important",t.style.height="0 !important",t.style.clipPath="inset(50%) !important",t.style.overflow="hidden !important",t.style.whiteSpace="nowrap !important",this.name&&(t.name=this.name),t.value=this.value||"",t}handleClick(t){if(this.disabled||this.loading){t.preventDefault(),t.stopImmediatePropagation();return}if(this.type!=="submit"&&this.type!=="reset"||!this.getForm())return;let o=this.constructLightDOMButton();this.parentElement?.append(o),o.click(),o.remove()}handleInvalid(){this.dispatchEvent(new Bo)}handleLabelSlotChange(){let t=this.labelSlot.assignedNodes({flatten:!0}),e=!1,o=!1,i=!1,n=!1;[...t].forEach(c=>{if(c.nodeType===Node.ELEMENT_NODE){let d=c;d.localName==="wa-icon"?(o=!0,e||(e=d.label!==void 0)):n=!0}else c.nodeType===Node.TEXT_NODE&&(c.textContent?.trim()||"").length>0&&(i=!0)}),this.isIconButton=o&&!i&&!n,this.customStates.set("icon-button",this.isIconButton),this.isIconButton&&!e&&console.warn('Icon buttons must have a label for screen readers. Add <wa-icon label="..."> to remove this warning.',this)}isButton(){return!this.href}isLink(){return!!this.href}handleDisabledChange(){this.customStates.set("disabled",this.disabled),this.updateValidity()}handleHrefChange(){this.customStates.set("link",this.isLink())}handleLoadingChange(){this.customStates.set("loading",this.loading)}setValue(...t){}click(){this.button.click()}focus(t){this.button.focus(t)}blur(){this.button.blur()}render(){let t=this.isLink(),e=t?Fr`a`:Fr`button`;return Ko`
      <${e}
        part="base"
        class=${wt({button:!0,caret:this.withCaret,disabled:this.disabled,loading:this.loading,rtl:this.localize.dir()==="rtl","has-label":this.hasSlotController.test("[default]"),"has-start":this.hasUpdated?this.hasSlotController.test("start"):this.withStart,"has-end":this.hasUpdated?this.hasSlotController.test("end"):this.withEnd,"is-icon-button":this.isIconButton})}
        ?disabled=${et(t?void 0:this.disabled)}
        type=${et(t?void 0:this.type)}
        title=${this.title}
        name=${et(t?void 0:this.name)}
        value=${et(t?void 0:this.value)}
        href=${et(t?this.href:void 0)}
        target=${et(t?this.target:void 0)}
        download=${et(t?this.download:void 0)}
        rel=${et(t&&this.rel?this.rel:void 0)}
        role=${et(t?void 0:"button")}
        aria-disabled=${et(t&&this.disabled?"true":void 0)}
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
      </${e}>
    `}};V.shadowRootOptions={...Ct.shadowRootOptions,delegatesFocus:!0};V.css=[Yi,We,Ht];h([st(".button")],V.prototype,"button",2);h([st("slot:not([name])")],V.prototype,"labelSlot",2);h([zt()],V.prototype,"invalid",2);h([zt()],V.prototype,"isIconButton",2);h([w()],V.prototype,"title",2);h([w({reflect:!0})],V.prototype,"variant",2);h([w({reflect:!0})],V.prototype,"appearance",2);h([w({reflect:!0})],V.prototype,"size",2);h([W("size")],V.prototype,"handleSizeChange",1);h([w({attribute:"with-caret",type:Boolean,reflect:!0})],V.prototype,"withCaret",2);h([w({attribute:"with-start",type:Boolean})],V.prototype,"withStart",2);h([w({attribute:"with-end",type:Boolean})],V.prototype,"withEnd",2);h([w({type:Boolean})],V.prototype,"disabled",2);h([w({type:Boolean,reflect:!0})],V.prototype,"loading",2);h([w({type:Boolean,reflect:!0})],V.prototype,"pill",2);h([w()],V.prototype,"type",2);h([w({reflect:!0})],V.prototype,"name",2);h([w({reflect:!0})],V.prototype,"value",2);h([w({reflect:!0})],V.prototype,"href",2);h([w()],V.prototype,"target",2);h([w()],V.prototype,"rel",2);h([w()],V.prototype,"download",2);h([w({attribute:"formaction"})],V.prototype,"formAction",2);h([w({attribute:"formenctype"})],V.prototype,"formEnctype",2);h([w({attribute:"formmethod"})],V.prototype,"formMethod",2);h([w({attribute:"formnovalidate",type:Boolean})],V.prototype,"formNoValidate",2);h([w({attribute:"formtarget"})],V.prototype,"formTarget",2);h([W("disabled",{waitUntilFirstUpdate:!0})],V.prototype,"handleDisabledChange",1);h([W("href")],V.prototype,"handleHrefChange",1);h([W("loading",{waitUntilFirstUpdate:!0})],V.prototype,"handleLoadingChange",1);V=h([it("wa-button")],V);V.disableWarning?.("change-in-update");var ta=j`
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
`;var Br=class extends ct{constructor(){super(...arguments),this.localize=new St(this)}render(){return O`
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
    `}};Br.css=ta;Br=h([it("wa-spinner")],Br);var ea=class extends Event{constructor(){super("wa-error",{bubbles:!0,cancelable:!1,composed:!0})}};var oa=class extends Event{constructor(){super("wa-load",{bubbles:!0,cancelable:!1,composed:!0})}};var ra=j`
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
`;function Bs(t){return`data:image/svg+xml,${encodeURIComponent(t)}`}var Mr={solid:{backward:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M236.3 107.1C247.9 96 265 92.9 279.7 99.2C294.4 105.5 304 120 304 136L304 272.3L476.3 107.2C487.9 96 505 92.9 519.7 99.2C534.4 105.5 544 120 544 136L544 504C544 520 534.4 534.5 519.7 540.8C505 547.1 487.9 544 476.3 532.9L304 367.7L304 504C304 520 294.4 534.5 279.7 540.8C265 547.1 247.9 544 236.3 532.9L44.3 348.9C36.5 341.3 32 330.9 32 320C32 309.1 36.5 298.7 44.3 291.1L236.3 107.1z"/></svg>',"backward-step":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M491 100.8C478.1 93.8 462.3 94.5 450 102.6L192 272.1L192 128C192 110.3 177.7 96 160 96C142.3 96 128 110.3 128 128L128 512C128 529.7 142.3 544 160 544C177.7 544 192 529.7 192 512L192 367.9L450 537.5C462.3 545.6 478 546.3 491 539.3C504 532.3 512 518.8 512 504.1L512 136.1C512 121.4 503.9 107.9 491 100.9z"/></svg>',check:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"/></svg>',"chevron-down":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>',"chevron-left":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>',"chevron-right":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M311.1 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L243.2 256 73.9 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>',circle:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0z"/></svg>',"closed-captioning":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M64 192C64 156.7 92.7 128 128 128L512 128C547.3 128 576 156.7 576 192L576 448C576 483.3 547.3 512 512 512L128 512C92.7 512 64 483.3 64 448L64 192zM216 272L248 272C252.4 272 256 275.6 256 280C256 293.3 266.7 304 280 304C293.3 304 304 293.3 304 280C304 249.1 278.9 224 248 224L216 224C185.1 224 160 249.1 160 280L160 360C160 390.9 185.1 416 216 416L248 416C278.9 416 304 390.9 304 360C304 346.7 293.3 336 280 336C266.7 336 256 346.7 256 360C256 364.4 252.4 368 248 368L216 368C211.6 368 208 364.4 208 360L208 280C208 275.6 211.6 272 216 272zM384 280C384 275.6 387.6 272 392 272L424 272C428.4 272 432 275.6 432 280C432 293.3 442.7 304 456 304C469.3 304 480 293.3 480 280C480 249.1 454.9 224 424 224L392 224C361.1 224 336 249.1 336 280L336 360C336 390.9 361.1 416 392 416L424 416C454.9 416 480 390.9 480 360C480 346.7 469.3 336 456 336C442.7 336 432 346.7 432 360C432 364.4 428.4 368 424 368L392 368C387.6 368 384 364.4 384 360L384 280z"/></svg>',"closed-captioning-slash":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M39 39.1C48.4 29.7 63.6 29.7 72.9 39.1L161.8 128L512 128C547.3 128 576 156.7 576 192L576 448C576 473.5 561.1 495.4 539.6 505.8L601 567.1C610.4 576.5 610.4 591.7 601 601C591.6 610.3 576.4 610.4 567.1 601L39 73.1C29.7 63.7 29.7 48.5 39 39.1zM384 350.1L384 279.9C384 275.5 387.6 271.9 392 271.9L424 271.9C428.4 271.9 432 275.5 432 279.9C432 293.2 442.7 303.9 456 303.9C469.3 303.9 480 293.2 480 279.9C480 249 454.9 223.9 424 223.9L392 223.9C361.1 223.9 336 249 336 279.9L336 302.1L384 350.1zM445.5 411.6C465.7 403.2 480 383.2 480 359.9C480 346.6 469.3 335.9 456 335.9C442.7 335.9 432 346.6 432 359.9C432 364.3 428.4 367.9 424 367.9L401.8 367.9L445.5 411.6zM162.3 264.1C160.8 269.1 160 274.5 160 280L160 360C160 390.9 185.1 416 216 416L248 416C266.1 416 282.1 407.5 292.4 394.2L410.2 512L128 512C92.7 512 64 483.3 64 448L64 192C64 184.2 65.4 176.7 68 169.8L162.3 264.1zM256.1 357.9C256 358.6 256 359.3 256 360C256 364.4 252.4 368 248 368L216 368C211.6 368 208 364.4 208 360L208 309.8L256.1 357.9z"/></svg>',compress:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M160 64c0-17.7-14.3-32-32-32S96 46.3 96 64l0 64-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c17.7 0 32-14.3 32-32l0-96zM32 320c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0 0 64c0 17.7 14.3 32 32 32s32-14.3 32-32l0-96c0-17.7-14.3-32-32-32l-96 0zM352 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7 14.3 32 32 32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0 0-64zM320 320c-17.7 0-32 14.3-32 32l0 96c0 17.7 14.3 32 32 32s32-14.3 32-32l0-64 64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0z"/></svg>',"ellipsis-vertical":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M320 208C289.1 208 264 182.9 264 152C264 121.1 289.1 96 320 96C350.9 96 376 121.1 376 152C376 182.9 350.9 208 320 208zM320 432C350.9 432 376 457.1 376 488C376 518.9 350.9 544 320 544C289.1 544 264 518.9 264 488C264 457.1 289.1 432 320 432zM376 320C376 350.9 350.9 376 320 376C289.1 376 264 350.9 264 320C264 289.1 289.1 264 320 264C350.9 264 376 289.1 376 320z"/></svg>',expand:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 96C110.3 96 96 110.3 96 128L96 224C96 241.7 110.3 256 128 256C145.7 256 160 241.7 160 224L160 160L224 160C241.7 160 256 145.7 256 128C256 110.3 241.7 96 224 96L128 96zM160 416C160 398.3 145.7 384 128 384C110.3 384 96 398.3 96 416L96 512C96 529.7 110.3 544 128 544L224 544C241.7 544 256 529.7 256 512C256 494.3 241.7 480 224 480L160 480L160 416zM416 96C398.3 96 384 110.3 384 128C384 145.7 398.3 160 416 160L480 160L480 224C480 241.7 494.3 256 512 256C529.7 256 544 241.7 544 224L544 128C544 110.3 529.7 96 512 96L416 96zM544 416C544 398.3 529.7 384 512 384C494.3 384 480 398.3 480 416L480 480L416 480C398.3 480 384 494.3 384 512C384 529.7 398.3 544 416 544L512 544C529.7 544 544 529.7 544 512L544 416z"/></svg>',eyedropper:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M341.6 29.2l-101.6 101.6-9.4-9.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-9.4-9.4 101.6-101.6c39-39 39-102.2 0-141.1s-102.2-39-141.1 0zM55.4 323.3c-15 15-23.4 35.4-23.4 56.6l0 42.4-26.6 39.9c-8.5 12.7-6.8 29.6 4 40.4s27.7 12.5 40.4 4l39.9-26.6 42.4 0c21.2 0 41.6-8.4 56.6-23.4l109.4-109.4-45.3-45.3-109.4 109.4c-3 3-7.1 4.7-11.3 4.7l-36.1 0 0-36.1c0-4.2 1.7-8.3 4.7-11.3l109.4-109.4-45.3-45.3-109.4 109.4z"/></svg>',forward:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M403.7 107.1C392.1 96 375 92.9 360.3 99.2C345.6 105.5 336 120 336 136L336 272.3L163.7 107.2C152.1 96 135 92.9 120.3 99.2C105.6 105.5 96 120 96 136L96 504C96 520 105.6 534.5 120.3 540.8C135 547.1 152.1 544 163.7 532.9L336 367.7L336 504C336 520 345.6 534.5 360.3 540.8C375 547.1 392.1 544 403.7 532.9L595.7 348.9C603.6 341.4 608 330.9 608 320C608 309.1 603.5 298.7 595.7 291.1L403.7 107.1z"/></svg>',file:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M192 64C156.7 64 128 92.7 128 128L128 512C128 547.3 156.7 576 192 576L448 576C483.3 576 512 547.3 512 512L512 234.5C512 217.5 505.3 201.2 493.3 189.2L386.7 82.7C374.7 70.7 358.5 64 341.5 64L192 64zM453.5 240L360 240C346.7 240 336 229.3 336 216L336 122.5L453.5 240z"/></svg>',"file-audio":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM389.8 307.7C380.7 301.4 368.3 303.6 362 312.7C355.7 321.8 357.9 334.2 367 340.5C390.9 357.2 406.4 384.8 406.4 416C406.4 447.2 390.8 474.9 367 491.5C357.9 497.8 355.7 510.3 362 519.3C368.3 528.3 380.8 530.6 389.8 524.3C423.9 500.5 446.4 460.8 446.4 416C446.4 371.2 424 331.5 389.8 307.7zM208 376C199.2 376 192 383.2 192 392L192 440C192 448.8 199.2 456 208 456L232 456L259.2 490C262.2 493.8 266.8 496 271.7 496L272 496C280.8 496 288 488.8 288 480L288 352C288 343.2 280.8 336 272 336L271.7 336C266.8 336 262.2 338.2 259.2 342L232 376L208 376zM336 448.2C336 458.9 346.5 466.4 354.9 459.8C367.8 449.5 376 433.7 376 416C376 398.3 367.8 382.5 354.9 372.2C346.5 365.5 336 373.1 336 383.8L336 448.3z"/></svg>',"file-code":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM282.2 359.6C290.8 349.5 289.7 334.4 279.6 325.8C269.5 317.2 254.4 318.3 245.8 328.4L197.8 384.4C190.1 393.4 190.1 406.6 197.8 415.6L245.8 471.6C254.4 481.7 269.6 482.8 279.6 474.2C289.6 465.6 290.8 450.4 282.2 440.4L247.6 400L282.2 359.6zM394.2 328.4C385.6 318.3 370.4 317.2 360.4 325.8C350.4 334.4 349.2 349.6 357.8 359.6L392.4 400L357.8 440.4C349.2 450.5 350.3 465.6 360.4 474.2C370.5 482.8 385.6 481.7 394.2 471.6L442.2 415.6C449.9 406.6 449.9 393.4 442.2 384.4L394.2 328.4z"/></svg>',"file-excel":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM292 330.7C284.6 319.7 269.7 316.7 258.7 324C247.7 331.3 244.7 346.3 252 357.3L291.2 416L252 474.7C244.6 485.7 247.6 500.6 258.7 508C269.8 515.4 284.6 512.4 292 501.3L320 459.3L348 501.3C355.4 512.3 370.3 515.3 381.3 508C392.3 500.7 395.3 485.7 388 474.7L348.8 416L388 357.3C395.4 346.3 392.4 331.4 381.3 324C370.2 316.6 355.4 319.6 348 330.7L320 372.7L292 330.7z"/></svg>',"file-image":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM256 320C256 302.3 241.7 288 224 288C206.3 288 192 302.3 192 320C192 337.7 206.3 352 224 352C241.7 352 256 337.7 256 320zM220.6 512L419.4 512C435.2 512 448 499.2 448 483.4C448 476.1 445.2 469 440.1 463.7L343.3 361.9C337.3 355.6 328.9 352 320.1 352L319.8 352C311 352 302.7 355.6 296.6 361.9L199.9 463.7C194.8 469 192 476.1 192 483.4C192 499.2 204.8 512 220.6 512z"/></svg>',"file-pdf":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 64C92.7 64 64 92.7 64 128L64 512C64 547.3 92.7 576 128 576L208 576L208 464C208 428.7 236.7 400 272 400L448 400L448 234.5C448 217.5 441.3 201.2 429.3 189.2L322.7 82.7C310.7 70.7 294.5 64 277.5 64L128 64zM389.5 240L296 240C282.7 240 272 229.3 272 216L272 122.5L389.5 240zM272 444C261 444 252 453 252 464L252 592C252 603 261 612 272 612C283 612 292 603 292 592L292 564L304 564C337.1 564 364 537.1 364 504C364 470.9 337.1 444 304 444L272 444zM304 524L292 524L292 484L304 484C315 484 324 493 324 504C324 515 315 524 304 524zM400 444C389 444 380 453 380 464L380 592C380 603 389 612 400 612L432 612C460.7 612 484 588.7 484 560L484 496C484 467.3 460.7 444 432 444L400 444zM420 572L420 484L432 484C438.6 484 444 489.4 444 496L444 560C444 566.6 438.6 572 432 572L420 572zM508 464L508 592C508 603 517 612 528 612C539 612 548 603 548 592L548 548L576 548C587 548 596 539 596 528C596 517 587 508 576 508L548 508L548 484L576 484C587 484 596 475 596 464C596 453 587 444 576 444L528 444C517 444 508 453 508 464z"/></svg>',"file-powerpoint":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM280 320C266.7 320 256 330.7 256 344L256 488C256 501.3 266.7 512 280 512C293.3 512 304 501.3 304 488L304 464L328 464C367.8 464 400 431.8 400 392C400 352.2 367.8 320 328 320L280 320zM328 416L304 416L304 368L328 368C341.3 368 352 378.7 352 392C352 405.3 341.3 416 328 416z"/></svg>',"file-video":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM208 368L208 464C208 481.7 222.3 496 240 496L336 496C353.7 496 368 481.7 368 464L368 440L403 475C406.2 478.2 410.5 480 415 480C424.4 480 432 472.4 432 463L432 368.9C432 359.5 424.4 351.9 415 351.9C410.5 351.9 406.2 353.7 403 356.9L368 391.9L368 367.9C368 350.2 353.7 335.9 336 335.9L240 335.9C222.3 335.9 208 350.2 208 367.9z"/></svg>',"file-word":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM263.4 338.8C260.5 325.9 247.7 317.7 234.8 320.6C221.9 323.5 213.7 336.3 216.6 349.2L248.6 493.2C250.9 503.7 260 511.4 270.8 512C281.6 512.6 291.4 505.9 294.8 495.6L320 419.9L345.2 495.6C348.6 505.8 358.4 512.5 369.2 512C380 511.5 389.1 503.8 391.4 493.2L423.4 349.2C426.3 336.3 418.1 323.4 405.2 320.6C392.3 317.8 379.4 325.9 376.6 338.8L363.4 398.2L342.8 336.4C339.5 326.6 330.4 320 320 320C309.6 320 300.5 326.6 297.2 336.4L276.6 398.2L263.4 338.8z"/></svg>',"file-zipper":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM192 136C192 149.3 202.7 160 216 160L264 160C277.3 160 288 149.3 288 136C288 122.7 277.3 112 264 112L216 112C202.7 112 192 122.7 192 136zM192 232C192 245.3 202.7 256 216 256L264 256C277.3 256 288 245.3 288 232C288 218.7 277.3 208 264 208L216 208C202.7 208 192 218.7 192 232zM256 304L224 304C206.3 304 192 318.3 192 336L192 384C192 410.5 213.5 432 240 432C266.5 432 288 410.5 288 384L288 336C288 318.3 273.7 304 256 304zM240 368C248.8 368 256 375.2 256 384C256 392.8 248.8 400 240 400C231.2 400 224 392.8 224 384C224 375.2 231.2 368 240 368z"/></svg>',"forward-step":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M21 36.8c12.9-7 28.7-6.3 41 1.8L320 208.1 320 64c0-17.7 14.3-32 32-32s32 14.3 32 32l0 384c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-144.1-258 169.6c-12.3 8.1-28 8.8-41 1.8S0 454.7 0 440L0 72C0 57.3 8.1 43.8 21 36.8z"/></svg>',gauge:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zm320 96c0-26.9-16.5-49.9-40-59.3L280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 172.7c-23.5 9.5-40 32.5-40 59.3 0 35.3 28.7 64 64 64s64-28.7 64-64zM144 176a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm-16 80a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM400 144a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>',gear:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M259.1 73.5C262.1 58.7 275.2 48 290.4 48L350.2 48C365.4 48 378.5 58.7 381.5 73.5L396 143.5C410.1 149.5 423.3 157.2 435.3 166.3L503.1 143.8C517.5 139 533.3 145 540.9 158.2L570.8 210C578.4 223.2 575.7 239.8 564.3 249.9L511 297.3C511.9 304.7 512.3 312.3 512.3 320C512.3 327.7 511.8 335.3 511 342.7L564.4 390.2C575.8 400.3 578.4 417 570.9 430.1L541 481.9C533.4 495 517.6 501.1 503.2 496.3L435.4 473.8C423.3 482.9 410.1 490.5 396.1 496.6L381.7 566.5C378.6 581.4 365.5 592 350.4 592L290.6 592C275.4 592 262.3 581.3 259.3 566.5L244.9 496.6C230.8 490.6 217.7 482.9 205.6 473.8L137.5 496.3C123.1 501.1 107.3 495.1 99.7 481.9L69.8 430.1C62.2 416.9 64.9 400.3 76.3 390.2L129.7 342.7C128.8 335.3 128.4 327.7 128.4 320C128.4 312.3 128.9 304.7 129.7 297.3L76.3 249.8C64.9 239.7 62.3 223 69.8 209.9L99.7 158.1C107.3 144.9 123.1 138.9 137.5 143.7L205.3 166.2C217.4 157.1 230.6 149.5 244.6 143.4L259.1 73.5zM320.3 400C364.5 399.8 400.2 363.9 400 319.7C399.8 275.5 363.9 239.8 319.7 240C275.5 240.2 239.8 276.1 240 320.3C240.2 364.5 276.1 400.2 320.3 400z"/></svg>',"grip-vertical":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M128 40c0-22.1-17.9-40-40-40L40 0C17.9 0 0 17.9 0 40L0 88c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zM0 424l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM320 40c0-22.1-17.9-40-40-40L232 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zM192 232l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM320 424c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z"/></svg>',indeterminate:'<svg part="indeterminate-icon" class="icon" viewBox="0 0 16 16"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round"><g stroke="currentColor" stroke-width="2"><g transform="translate(2.285714 6.857143)"><path d="M10.2857143,1.14285714 L1.14285714,1.14285714"/></g></g></g></svg>',minus:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32z"/></svg>',pause:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M48 32C21.5 32 0 53.5 0 80L0 432c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48L48 32zm224 0c-26.5 0-48 21.5-48 48l0 352c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48l-64 0z"/></svg>',"picture-in-picture":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M448 32c35.3 0 64 28.7 64 64l0 112-64 0 0-112-384 0 0 320 144 0 0 64-144 0-6.5-.3c-30.1-3.1-54.1-27-57.1-57.1L0 416 0 96C0 62.9 25.2 35.6 57.5 32.3L64 32 448 32zm16 224c26.5 0 48 21.5 48 48l0 128c0 26.5-21.5 48-48 48l-160 0c-26.5 0-48-21.5-48-48l0-128c0-26.5 21.5-48 48-48l160 0z"/></svg>',play:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M91.2 36.9c-12.4-6.8-27.4-6.5-39.6 .7S32 57.9 32 72l0 368c0 14.1 7.5 27.2 19.6 34.4s27.2 7.5 39.6 .7l336-184c12.8-7 20.8-20.5 20.8-35.1s-8-28.1-20.8-35.1l-336-184z"/></svg>',"play-circle":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9l0 176c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z"/></svg>',plus:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"/></svg>',star:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M309.5-18.9c-4.1-8-12.4-13.1-21.4-13.1s-17.3 5.1-21.4 13.1L193.1 125.3 33.2 150.7c-8.9 1.4-16.3 7.7-19.1 16.3s-.5 18 5.8 24.4l114.4 114.5-25.2 159.9c-1.4 8.9 2.3 17.9 9.6 23.2s16.9 6.1 25 2L288.1 417.6 432.4 491c8 4.1 17.7 3.3 25-2s11-14.2 9.6-23.2L441.7 305.9 556.1 191.4c6.4-6.4 8.6-15.8 5.8-24.4s-10.1-14.9-19.1-16.3L383 125.3 309.5-18.9z"/></svg>',upload:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M352 173.3L352 384C352 401.7 337.7 416 320 416C302.3 416 288 401.7 288 384L288 173.3L246.6 214.7C234.1 227.2 213.8 227.2 201.3 214.7C188.8 202.2 188.8 181.9 201.3 169.4L297.3 73.4C309.8 60.9 330.1 60.9 342.6 73.4L438.6 169.4C451.1 181.9 451.1 202.2 438.6 214.7C426.1 227.2 405.8 227.2 393.3 214.7L352 173.3zM320 464C364.2 464 400 428.2 400 384L480 384C515.3 384 544 412.7 544 448L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 448C96 412.7 124.7 384 160 384L240 384C240 428.2 275.8 464 320 464zM464 488C477.3 488 488 477.3 488 464C488 450.7 477.3 440 464 440C450.7 440 440 450.7 440 464C440 477.3 450.7 488 464 488z"/></svg>',user:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M224 248a120 120 0 1 0 0-240 120 120 0 1 0 0 240zm-29.7 56C95.8 304 16 383.8 16 482.3 16 498.7 29.3 512 45.7 512l356.6 0c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3l-59.4 0z"/></svg>',volume:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M48 352l48 0 134.1 119.2c6.4 5.7 14.6 8.8 23.1 8.8 19.2 0 34.8-15.6 34.8-34.8l0-378.4c0-19.2-15.6-34.8-34.8-34.8-8.5 0-16.7 3.1-23.1 8.8L96 160 48 160c-26.5 0-48 21.5-48 48l0 96c0 26.5 21.5 48 48 48zM441.1 107c-10.3-8.4-25.4-6.8-33.8 3.5s-6.8 25.4 3.5 33.8C443.3 170.7 464 210.9 464 256s-20.7 85.3-53.2 111.8c-10.3 8.4-11.8 23.5-3.5 33.8s23.5 11.8 33.8 3.5c43.2-35.2 70.9-88.9 70.9-149s-27.7-113.8-70.9-149zm-60.5 74.5c-10.3-8.4-25.4-6.8-33.8 3.5s-6.8 25.4 3.5 33.8C361.1 227.6 368 241 368 256s-6.9 28.4-17.7 37.3c-10.3 8.4-11.8 23.5-3.5 33.8s23.5 11.8 33.8 3.5C402.1 312.9 416 286.1 416 256s-13.9-56.9-35.5-74.5z"/></svg>',"volume-low":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M48 352l48 0 134.1 119.2c6.4 5.7 14.6 8.8 23.1 8.8 19.2 0 34.8-15.6 34.8-34.8l0-378.4c0-19.2-15.6-34.8-34.8-34.8-8.5 0-16.7 3.1-23.1 8.8L96 160 48 160c-26.5 0-48 21.5-48 48l0 96c0 26.5 21.5 48 48 48zM380.6 181.5c-10.3-8.4-25.4-6.8-33.8 3.5s-6.8 25.4 3.5 33.8C361.1 227.6 368 241 368 256s-6.9 28.4-17.7 37.3c-10.3 8.4-11.8 23.5-3.5 33.8s23.5 11.8 33.8 3.5C402.1 312.9 416 286.1 416 256s-13.9-56.9-35.5-74.5z"/></svg>',"volume-xmark":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M48 352l48 0 134.1 119.2c6.4 5.7 14.6 8.8 23.1 8.8 19.2 0 34.8-15.6 34.8-34.8l0-378.4c0-19.2-15.6-34.8-34.8-34.8-8.5 0-16.7 3.1-23.1 8.8L96 160 48 160c-26.5 0-48 21.5-48 48l0 96c0 26.5 21.5 48 48 48zM367 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>',xmark:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z"/></svg>'},regular:{"circle-question":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M464 256a208 208 0 1 0 -416 0 208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zm256-80c-17.7 0-32 14.3-32 32 0 13.3-10.7 24-24 24s-24-10.7-24-24c0-44.2 35.8-80 80-80s80 35.8 80 80c0 47.2-36 67.2-56 74.5l0 3.8c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-8.1c0-20.5 14.8-35.2 30.1-40.2 6.4-2.1 13.2-5.5 18.2-10.3 4.3-4.2 7.7-10 7.7-19.6 0-17.7-14.3-32-32-32zM224 368a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>',"circle-xmark":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464a256 256 0 1 0 0-512 256 256 0 1 0 0 512zM167 167c-9.4 9.4-9.4 24.6 0 33.9l55 55-55 55c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l55-55 55 55c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-55-55 55-55c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-55 55-55-55c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>',copy:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M384 336l-192 0c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l133.5 0c4.2 0 8.3 1.7 11.3 4.7l58.5 58.5c3 3 4.7 7.1 4.7 11.3L400 320c0 8.8-7.2 16-16 16zM192 384l192 0c35.3 0 64-28.7 64-64l0-197.5c0-17-6.7-33.3-18.7-45.3L370.7 18.7C358.7 6.7 342.5 0 325.5 0L192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-16-48 0 0 16c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l16 0 0-48-16 0z"/></svg>',eye:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M288 80C222.8 80 169.2 109.6 128.1 147.7 89.6 183.5 63 226 49.4 256 63 286 89.6 328.5 128.1 364.3 169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256 513 226 486.4 183.5 447.9 147.7 406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1 3.3 7.9 3.3 16.7 0 24.6-14.9 35.7-46.2 87.7-93 131.1-47.1 43.7-111.8 80.6-192.6 80.6S142.5 443.2 95.4 399.4c-46.8-43.5-78.1-95.4-93-131.1-3.3-7.9-3.3-16.7 0-24.6 14.9-35.7 46.2-87.7 93-131.1zM288 336c44.2 0 80-35.8 80-80 0-29.6-16.1-55.5-40-69.3-1.4 59.7-49.6 107.9-109.3 109.3 13.8 23.9 39.7 40 69.3 40zm-79.6-88.4c2.5 .3 5 .4 7.6 .4 35.3 0 64-28.7 64-64 0-2.6-.2-5.1-.4-7.6-37.4 3.9-67.2 33.7-71.1 71.1zm45.6-115c10.8-3 22.2-4.5 33.9-4.5 8.8 0 17.5 .9 25.8 2.6 .3 .1 .5 .1 .8 .2 57.9 12.2 101.4 63.7 101.4 125.2 0 70.7-57.3 128-128 128-61.6 0-113-43.5-125.2-101.4-1.8-8.6-2.8-17.5-2.8-26.6 0-11 1.4-21.8 4-32 .2-.7 .3-1.3 .5-1.9 11.9-43.4 46.1-77.6 89.5-89.5z"/></svg>',"eye-slash":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M41-24.9c-9.4-9.4-24.6-9.4-33.9 0S-2.3-.3 7 9.1l528 528c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-96.4-96.4c2.7-2.4 5.4-4.8 8-7.2 46.8-43.5 78.1-95.4 93-131.1 3.3-7.9 3.3-16.7 0-24.6-14.9-35.7-46.2-87.7-93-131.1-47.1-43.7-111.8-80.6-192.6-80.6-56.8 0-105.6 18.2-146 44.2L41-24.9zM176.9 111.1c32.1-18.9 69.2-31.1 111.1-31.1 65.2 0 118.8 29.6 159.9 67.7 38.5 35.7 65.1 78.3 78.6 108.3-13.6 30-40.2 72.5-78.6 108.3-3.1 2.8-6.2 5.6-9.4 8.4L393.8 328c14-20.5 22.2-45.3 22.2-72 0-70.7-57.3-128-128-128-26.7 0-51.5 8.2-72 22.2l-39.1-39.1zm182 182l-108-108c11.1-5.8 23.7-9.1 37.1-9.1 44.2 0 80 35.8 80 80 0 13.4-3.3 26-9.1 37.1zM103.4 173.2l-34-34c-32.6 36.8-55 75.8-66.9 104.5-3.3 7.9-3.3 16.7 0 24.6 14.9 35.7 46.2 87.7 93 131.1 47.1 43.7 111.8 80.6 192.6 80.6 37.3 0 71.2-7.9 101.5-20.6L352.2 422c-20 6.4-41.4 10-64.2 10-65.2 0-118.8-29.6-159.9-67.7-38.5-35.7-65.1-78.3-78.6-108.3 10.4-23.1 28.6-53.6 54-82.8z"/></svg>',star:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M288.1-32c9 0 17.3 5.1 21.4 13.1L383 125.3 542.9 150.7c8.9 1.4 16.3 7.7 19.1 16.3s.5 18-5.8 24.4L441.7 305.9 467 465.8c1.4 8.9-2.3 17.9-9.6 23.2s-17 6.1-25 2L288.1 417.6 143.8 491c-8 4.1-17.7 3.3-25-2s-11-14.2-9.6-23.2L134.4 305.9 20 191.4c-6.4-6.4-8.6-15.8-5.8-24.4s10.1-14.9 19.1-16.3l159.9-25.4 73.6-144.2c4.1-8 12.4-13.1 21.4-13.1zm0 76.8L230.3 158c-3.5 6.8-10 11.6-17.6 12.8l-125.5 20 89.8 89.9c5.4 5.4 7.9 13.1 6.7 20.7l-19.8 125.5 113.3-57.6c6.8-3.5 14.9-3.5 21.8 0l113.3 57.6-19.8-125.5c-1.2-7.6 1.3-15.3 6.7-20.7l89.8-89.9-125.5-20c-7.6-1.2-14.1-6-17.6-12.8L288.1 44.8z"/></svg>'}},Ms={name:"system",resolver:(t,e="classic",o="solid")=>{let n=Mr[o][t]??Mr.regular[t]??Mr.regular["circle-question"];return n?Bs(n):""}},ia=Ms;var Rs="",Rr="";function aa(){return Rs.replace(/\/$/,"")}function Ps(t){Rr=t}function na(){if(!Rr){let t=document.querySelector("[data-fa-kit-code]");t&&Ps(t.getAttribute("data-fa-kit-code")||"")}return Rr}var sa="7.2.0";function Ds(t,e,o){let i="solid";return e==="chisel"&&(i="chisel-regular"),e==="etch"&&(i="etch-solid"),e==="graphite"&&(i="graphite-thin"),e==="jelly"&&(i="jelly-regular",o==="duo-regular"&&(i="jelly-duo-regular"),o==="fill-regular"&&(i="jelly-fill-regular")),e==="jelly-duo"&&(i="jelly-duo-regular"),e==="jelly-fill"&&(i="jelly-fill-regular"),e==="notdog"&&(o==="solid"&&(i="notdog-solid"),o==="duo-solid"&&(i="notdog-duo-solid")),e==="notdog-duo"&&(i="notdog-duo-solid"),e==="slab"&&((o==="solid"||o==="regular")&&(i="slab-regular"),o==="press-regular"&&(i="slab-press-regular")),e==="slab-press"&&(i="slab-press-regular"),e==="thumbprint"&&(i="thumbprint-light"),e==="utility"&&(i="utility-semibold"),e==="utility-duo"&&(i="utility-duo-semibold"),e==="utility-fill"&&(i="utility-fill-semibold"),e==="whiteboard"&&(i="whiteboard-semibold"),e==="classic"&&(o==="thin"&&(i="thin"),o==="light"&&(i="light"),o==="regular"&&(i="regular"),o==="solid"&&(i="solid")),e==="duotone"&&(o==="thin"&&(i="duotone-thin"),o==="light"&&(i="duotone-light"),o==="regular"&&(i="duotone-regular"),o==="solid"&&(i="duotone")),e==="sharp"&&(o==="thin"&&(i="sharp-thin"),o==="light"&&(i="sharp-light"),o==="regular"&&(i="sharp-regular"),o==="solid"&&(i="sharp-solid")),e==="sharp-duotone"&&(o==="thin"&&(i="sharp-duotone-thin"),o==="light"&&(i="sharp-duotone-light"),o==="regular"&&(i="sharp-duotone-regular"),o==="solid"&&(i="sharp-duotone-solid")),e==="brands"&&(i="brands"),i}function Ns(t,e,o){let i=Ds(t,e,o),n=aa();if(n)return`${n}/${i}/${t}.svg`;let c=na();return c.length>0?`https://ka-p.fontawesome.com/releases/v${sa}/svgs/${i}/${t}.svg?token=${encodeURIComponent(c)}`:`https://ka-f.fontawesome.com/releases/v${sa}/svgs/${i}/${t}.svg`}var qs={name:"default",resolver:(t,e="classic",o="solid")=>Ns(t,e,o),mutator:(t,e)=>{if(e?.family&&!t.hasAttribute("data-duotone-initialized")){let{family:o,variant:i}=e;if(o==="duotone"||o==="sharp-duotone"||o==="notdog-duo"||o==="notdog"&&i==="duo-solid"||o==="jelly-duo"||o==="jelly"&&i==="duo-regular"||o==="utility-duo"||o==="thumbprint"){let n=[...t.querySelectorAll("path")],c=n.find(m=>!m.hasAttribute("opacity")),d=n.find(m=>m.hasAttribute("opacity"));if(!c||!d)return;if(c.setAttribute("data-duotone-primary",""),d.setAttribute("data-duotone-secondary",""),e.swapOpacity&&c&&d){let m=d.getAttribute("opacity")||"0.4";c.style.setProperty("--path-opacity",m),d.style.setProperty("--path-opacity","1")}t.setAttribute("data-duotone-initialized","")}}}},la=qs;var Vs="classic",Us=[la,ia],Pr=[];function ca(t){Pr.push(t)}function da(t){Pr=Pr.filter(e=>e!==t)}function Go(t){return Us.find(e=>e.name===t)}function ua(){return Vs}var{I:Hs}=Ui,pa=t=>t;var fa=(t,e)=>e===void 0?t?._$litType$!==void 0:t?._$litType$===e;var ma=t=>t.strings===void 0,ha=()=>document.createComment(""),Ke=(t,e,o)=>{let i=t._$AA.parentNode,n=e===void 0?t._$AB:e._$AA;if(o===void 0){let c=i.insertBefore(ha(),n),d=i.insertBefore(ha(),n);o=new Hs(c,d,t,t.options)}else{let c=o._$AB.nextSibling,d=o._$AM,m=d!==t;if(m){let v;o._$AQ?.(t),o._$AM=t,o._$AP!==void 0&&(v=t._$AU)!==d._$AU&&o._$AP(v)}if(c!==n||m){let v=o._$AA;for(;v!==c;){let y=pa(v).nextSibling;pa(i).insertBefore(v,n),v=y}}}return o},ye=(t,e,o=t)=>(t._$AI(e,o),t),js={},Xo=(t,e=js)=>t._$AH=e,ga=t=>t._$AH,Jo=t=>{t._$AR(),t._$AA.remove()};var go=Symbol(),Qo=Symbol(),Dr,Nr=new Map,_t=class extends ct{constructor(){super(...arguments),this.svg=null,this.autoWidth=!1,this.swapOpacity=!1,this.label="",this.library="default",this.rotate=0,this.resolveIcon=async(t,e)=>{let o;if(e?.spriteSheet){this.hasUpdated||await this.updateComplete,this.svg=O`<svg part="svg">
        <use part="use" href="${t}"></use>
      </svg>`,await this.updateComplete;let i=this.shadowRoot.querySelector("[part='svg']");return typeof e.mutator=="function"&&e.mutator(i,this),this.svg}try{if(o=await fetch(t,{mode:"cors"}),!o.ok)return o.status===410?go:Qo}catch{return Qo}try{let i=document.createElement("div");i.innerHTML=await o.text();let n=i.firstElementChild;if(n?.tagName?.toLowerCase()!=="svg")return go;Dr||(Dr=new DOMParser);let d=Dr.parseFromString(n.outerHTML,"text/html").body.querySelector("svg");return d?(d.part.add("svg"),document.adoptNode(d)):go}catch{return go}}}connectedCallback(){super.connectedCallback(),ca(this)}firstUpdated(t){super.firstUpdated(t),this.hasAttribute("rotate")&&this.style.setProperty("--rotate-angle",`${this.rotate}deg`),this.setIcon()}disconnectedCallback(){super.disconnectedCallback(),da(this)}async getIconSource(){let t=Go(this.library),e=this.family||ua();if(this.name&&t){let o;try{o=await t.resolver(this.name,e,this.variant,this.autoWidth)}catch{o=void 0}return{url:o,fromLibrary:!0}}return{url:this.src,fromLibrary:!1}}handleLabelChange(){typeof this.label=="string"&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"))}async setIcon(){let{url:t,fromLibrary:e}=await this.getIconSource(),o=e?Go(this.library):void 0;if(!t){this.svg=null;return}let i=Nr.get(t);i||(i=this.resolveIcon(t,o),Nr.set(t,i));let n=await i;n===Qo&&Nr.delete(t);let c=await this.getIconSource();if(t===c.url){if(fa(n)){this.svg=n;return}switch(n){case Qo:case go:this.svg=null,this.dispatchEvent(new ea);break;default:this.svg=n.cloneNode(!0),o?.mutator?.(this.svg,this),this.dispatchEvent(new oa)}}}updated(t){super.updated(t);let e=Go(this.library);this.hasAttribute("rotate")&&this.style.setProperty("--rotate-angle",`${this.rotate}deg`);let o=this.shadowRoot?.querySelector("svg");o&&e?.mutator?.(o,this)}render(){return this.hasUpdated?this.svg:O`<svg part="svg" width="16" height="16"></svg>`}};_t.css=ra;h([zt()],_t.prototype,"svg",2);h([w({reflect:!0})],_t.prototype,"name",2);h([w({reflect:!0})],_t.prototype,"family",2);h([w({reflect:!0})],_t.prototype,"variant",2);h([w({attribute:"auto-width",type:Boolean,reflect:!0})],_t.prototype,"autoWidth",2);h([w({attribute:"swap-opacity",type:Boolean,reflect:!0})],_t.prototype,"swapOpacity",2);h([w()],_t.prototype,"src",2);h([w()],_t.prototype,"label",2);h([w({reflect:!0})],_t.prototype,"library",2);h([w({type:Number,reflect:!0})],_t.prototype,"rotate",2);h([w({type:String,reflect:!0})],_t.prototype,"flip",2);h([w({type:String,reflect:!0})],_t.prototype,"animation",2);h([W("label")],_t.prototype,"handleLabelChange",1);h([W(["family","name","library","variant","src","autoWidth","swapOpacity"],{waitUntilFirstUpdate:!0})],_t.prototype,"setIcon",1);_t=h([it("wa-icon")],_t);var va=j`
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
`;function Ws(t,e){return{top:Math.round(t.getBoundingClientRect().top-e.getBoundingClientRect().top),left:Math.round(t.getBoundingClientRect().left-e.getBoundingClientRect().left)}}var qr=new Set;function Ys(){let t=document.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}function Ks(){let t=Number(getComputedStyle(document.body).paddingRight.replace(/px/,""));return isNaN(t)||!t?0:t}function Vr(t){if(qr.add(t),!document.documentElement.classList.contains("wa-scroll-lock")){let e=Ys()+Ks(),o=getComputedStyle(document.documentElement).scrollbarGutter;(!o||o==="auto")&&(o="stable"),e<2&&(o=""),document.documentElement.style.setProperty("--wa-scroll-lock-gutter",o),document.documentElement.classList.add("wa-scroll-lock"),document.documentElement.style.setProperty("--wa-scroll-lock-size",`${e}px`)}}function Ur(t){qr.delete(t),qr.size===0&&(document.documentElement.classList.remove("wa-scroll-lock"),document.documentElement.style.removeProperty("--wa-scroll-lock-size"))}function wa(t,e,o="vertical",i="smooth"){let n=Ws(t,e),c=n.top+e.scrollTop,d=n.left+e.scrollLeft,m=e.scrollLeft,v=e.scrollLeft+e.offsetWidth,y=e.scrollTop,C=e.scrollTop+e.offsetHeight;(o==="horizontal"||o==="both")&&(d<m?e.scrollTo({left:d,behavior:i}):d+t.clientWidth>v&&e.scrollTo({left:d-e.offsetWidth+t.clientWidth,behavior:i})),(o==="vertical"||o==="both")&&(c<y?e.scrollTo({top:c,behavior:i}):c+t.clientHeight>C&&e.scrollTo({top:c-e.offsetHeight+t.clientHeight,behavior:i}))}var Zo=class extends Event{constructor(){super("wa-clear",{bubbles:!0,cancelable:!1,composed:!0})}};var Fe=[];function Ge(t){Fe.push(t)}function Te(t){for(let e=Fe.length-1;e>=0;e--)if(Fe[e]===t){Fe.splice(e,1);break}}function Be(t){return Fe.length>0&&Fe[Fe.length-1]===t}var Xe=class extends Event{constructor(){super("wa-show",{bubbles:!0,cancelable:!0,composed:!0})}};var Je=class extends Event{constructor(t){super("wa-hide",{bubbles:!0,cancelable:!0,composed:!0}),this.detail=t}};var Qe=class extends Event{constructor(){super("wa-after-hide",{bubbles:!0,cancelable:!1,composed:!0})}};var Ze=class extends Event{constructor(){super("wa-after-show",{bubbles:!0,cancelable:!1,composed:!0})}};function to(t,e){return new Promise(o=>{function i(n){n.target===t&&(t.removeEventListener(e,i),o())}t.addEventListener(e,i)})}function Gt(t,e){return new Promise(o=>{let i=new AbortController,{signal:n}=i;if(t.classList.contains(e))return;t.classList.add(e);let c=!1,d=()=>{c||(c=!0,t.classList.remove(e),o(),i.abort())};t.addEventListener("animationend",d,{once:!0,signal:n}),t.addEventListener("animationcancel",d,{once:!0,signal:n}),requestAnimationFrame(()=>{!c&&t.getAnimations().length===0&&d()})})}var tr=(t={})=>{let{validationElement:e,validationProperty:o}=t;e||(e=Object.assign(document.createElement("input"),{required:!0})),o||(o="value");let i={observedAttributes:["required"],message:e.validationMessage,checkValidity(n){let c={message:"",isValid:!0,invalidKeys:[]};return(n.required??n.hasAttribute("required"))&&!n[o]&&(c.message=typeof i.message=="function"?i.message(n):i.message||"",c.isValid=!1,c.invalidKeys.push("valueMissing")),c}};return i};var eo=j`
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
`;var vo=class extends re{constructor(e){if(super(e),this.it=N,e.type!==Dt.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===N||e==null)return this._t=void 0,this.it=e;if(e===xt)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let o=[e];return o.raw=o,this._t={_$litType$:this.constructor.resultType,strings:o,values:[]}}};vo.directiveName="unsafeHTML",vo.resultType=1;var ba=be(vo);var U=class extends Ct{constructor(){super(...arguments),this.assumeInteractionOn=["blur","input"],this.cachedOptions=null,this.hasSlotController=new oe(this,"hint","label"),this.localize=new St(this),this.selectionOrder=new Map,this.typeToSelectString="",this.slotChangePending=!1,this.displayLabel="",this.selectedOptions=[],this.name="",this._defaultValue=null,this.size="m",this.placeholder="",this.multiple=!1,this.maxOptionsVisible=3,this.disabled=!1,this.withClear=!1,this.open=!1,this.appearance="outlined",this.pill=!1,this.label="",this.placement="bottom",this.hint="",this.withLabel=!1,this.withHint=!1,this.required=!1,this.getTag=t=>O`
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
          data-value=${t.value}
          @wa-remove=${e=>this.handleTagRemove(e,t)}
        >
          ${t.label}
        </wa-tag>
      `,this.handleDocumentFocusIn=t=>{let e=t.composedPath();this&&!e.includes(this)&&this.hide()},this.handleDocumentKeyDown=t=>{let e=t.target,o=e.closest('[part~="clear-button"]')!==null,i=e.closest("wa-button")!==null;if(!(o||i)){if(t.key==="Escape"&&this.open&&Be(this)&&(t.preventDefault(),t.stopPropagation(),this.hide(),this.displayInput.focus({preventScroll:!0})),t.key==="Enter"||t.key===" "&&this.typeToSelectString===""){if(t.preventDefault(),t.stopImmediatePropagation(),!this.open){this.show();return}this.currentOption&&!this.currentOption.disabled&&(this.valueHasChanged=!0,this.hasInteracted=!0,this.multiple?this.toggleOptionSelection(this.currentOption):this.setSelectedOptions(this.currentOption),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:!0})));return}if(["ArrowUp","ArrowDown","Home","End"].includes(t.key)){let n=this.getAllOptions(),c=n.indexOf(this.currentOption),d=Math.max(0,c);if(t.preventDefault(),!this.open&&(this.show(),this.currentOption))return;t.key==="ArrowDown"?(d=c+1,d>n.length-1&&(d=0)):t.key==="ArrowUp"?(d=c-1,d<0&&(d=n.length-1)):t.key==="Home"?d=0:t.key==="End"&&(d=n.length-1),this.setCurrentOption(n[d])}if(t.key?.length===1||t.key==="Backspace"){let n=this.getAllOptions();if(t.metaKey||t.ctrlKey||t.altKey)return;if(!this.open){if(t.key==="Backspace")return;this.show()}t.stopPropagation(),t.preventDefault(),clearTimeout(this.typeToSelectTimeout),this.typeToSelectTimeout=window.setTimeout(()=>this.typeToSelectString="",1e3),t.key==="Backspace"?this.typeToSelectString=this.typeToSelectString.slice(0,-1):this.typeToSelectString+=t.key.toLowerCase();for(let c of n)if(c.label.toLowerCase().startsWith(this.typeToSelectString)){this.setCurrentOption(c);break}}}},this.handleDocumentMouseDown=t=>{let e=t.composedPath();this&&!e.includes(this)&&this.hide()}}static get validators(){let t=[tr({validationElement:Object.assign(document.createElement("select"),{required:!0})})];return[...super.validators,...t]}get validationTarget(){return this.valueInput}set defaultValue(t){this._defaultValue=this.convertDefaultValue(t)}get defaultValue(){return this.convertDefaultValue(this._defaultValue)}rawValuesEqual(t,e){return t==null&&e==null?!0:t==null||e==null||t.length!==e.length?!1:t.every((o,i)=>o===e[i])}convertDefaultValue(t){return!(this.multiple||this.hasAttribute("multiple"))&&Array.isArray(t)&&(t=t[0]),t}set value(t){let e=this.value;t instanceof FormData&&(t=t.getAll(this.name)),t!=null&&!Array.isArray(t)&&(t=[t]);let o=this._value;this._value=t??null,this.rawValuesEqual(o,this._value)||(this.valueHasChanged=!0,this.requestUpdate("value",e))}get value(){let t=this._value??this.defaultValue??null;t!=null&&(t=Array.isArray(t)?t:[t]),this.optionValues=new Set(this.getAllOptions().filter(o=>!o.disabled).map(o=>o.value));let e=t;return t!=null&&(e=t.filter(o=>this.optionValues.has(o)),e=this.multiple?e:e[0],e=e??null),e}handleSizeChange(){Ut(this.localName,this.size)}connectedCallback(){super.connectedCallback(),this.processSlotChange(),this.open=!1}disconnectedCallback(){super.disconnectedCallback(),this.removeOpenListeners(),this.cachedOptions=null}updateDefaultValue(){let e=this.getAllOptions().filter(o=>o.hasAttribute("selected")||o.defaultSelected);if(e.length>0){let o=e.map(i=>i.value);this._defaultValue=this.multiple?o:o[0]}this.hasAttribute("value")&&(this._defaultValue=this.getAttribute("value")||null)}addOpenListeners(){document.addEventListener("focusin",this.handleDocumentFocusIn),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown),Ge(this),this.getRootNode()!==document&&this.getRootNode().addEventListener("focusin",this.handleDocumentFocusIn)}removeOpenListeners(){document.removeEventListener("focusin",this.handleDocumentFocusIn),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),Te(this),this.getRootNode()!==document&&this.getRootNode().removeEventListener("focusin",this.handleDocumentFocusIn)}handleFocus(){this.displayInput.setSelectionRange(0,0)}handleLabelClick(){this.displayInput.focus()}handleComboboxClick(t){t.preventDefault()}handleComboboxMouseDown(t){let o=t.composedPath().some(i=>i instanceof Element&&i.tagName.toLowerCase()==="wa-button");this.disabled||o||(t.preventDefault(),this.displayInput.focus({preventScroll:!0}),this.open=!this.open)}handleComboboxKeyDown(t){t.stopPropagation(),this.handleDocumentKeyDown(t)}handleClearClick(t){t.stopPropagation(),this.hasInteracted=!0,this.valueHasChanged=!0,this.value!==null&&(this.displayLabel="",this.selectionOrder.clear(),this.setSelectedOptions([]),this.displayInput.focus({preventScroll:!0}),this.updateComplete.then(()=>{this.dispatchEvent(new Zo),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}))}handleClearMouseDown(t){t.stopPropagation(),t.preventDefault()}handleOptionClick(t){let o=t.target.closest("wa-option");o&&!o.disabled&&(this.hasInteracted=!0,this.valueHasChanged=!0,this.multiple?this.toggleOptionSelection(o):this.setSelectedOptions(o),this.updateComplete.then(()=>this.displayInput.focus({preventScroll:!0})),this.requestUpdate("value"),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:!0})))}handleDefaultSlotChange(){this.slotChangePending||(this.slotChangePending=!0,queueMicrotask(()=>{this.slotChangePending=!1,this.processSlotChange()}))}processSlotChange(){customElements.get("wa-option")||customElements.whenDefined("wa-option").then(()=>this.handleDefaultSlotChange()),this.cachedOptions=null;let t=this.getAllOptions();this.updateDefaultValue();let e=this.value;if(e==null||!this.valueHasChanged&&!this.hasInteracted){this.selectionChanged();return}Array.isArray(e)||(e=[e]);let o=t.filter(i=>e.includes(i.value));this.setSelectedOptions(o)}handleTagRemove(t,e){if(t.stopPropagation(),this.disabled)return;this.hasInteracted=!0,this.valueHasChanged=!0;let o=e;if(!o){let i=t.target.closest("wa-tag[data-value]");if(i){let n=i.dataset.value;o=this.selectedOptions.find(c=>c.value===n)}}o&&(this.toggleOptionSelection(o,!1),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}))}getAllOptions(){return this.cachedOptions?this.cachedOptions:this?.querySelectorAll?(this.cachedOptions=[...this.querySelectorAll("wa-option")],this.cachedOptions):[]}getFirstOption(){return this.querySelector("wa-option")}setCurrentOption(t){this.getAllOptions().forEach(o=>{o.current=!1,o.tabIndex=-1}),t&&(this.currentOption=t,t.current=!0,t.tabIndex=0,t.focus({preventScroll:!0}))}setSelectedOptions(t){let e=this.getAllOptions(),o=Array.isArray(t)?t:[t];e.forEach(i=>{o.includes(i)||(i.selected=!1)}),o.length&&o.forEach(i=>i.selected=!0),this.selectionChanged()}toggleOptionSelection(t,e){e===!0||e===!1?t.selected=e:t.selected=!t.selected,this.selectionChanged()}selectionChanged(){let e=this.getAllOptions().filter(d=>{if(!this.hasInteracted&&!this.valueHasChanged){let m=this.defaultValue,v=Array.isArray(m)?m:[m];return d.hasAttribute("selected")||d.defaultSelected||d.selected||v?.includes(d.value)}return d.selected}),o=new Set(e.map(d=>d.value));for(let d of this.selectionOrder.keys())o.has(d)||this.selectionOrder.delete(d);let n=(this.selectionOrder.size>0?Math.max(...this.selectionOrder.values()):-1)+1;for(let d of e)this.selectionOrder.has(d.value)||this.selectionOrder.set(d.value,n++);this.selectedOptions=e.sort((d,m)=>{let v=this.selectionOrder.get(d.value)??0,y=this.selectionOrder.get(m.value)??0;return v-y});let c=new Set(this.selectedOptions.map(d=>d.value));if(c.size>0||this._value){let d=this._value;if(this._value==null){let m=this.defaultValue??[];this._value=Array.isArray(m)?m:[m]}this._value=this._value?.filter(m=>!this.optionValues?.has(m))??null,this._value?.unshift(...c),this.requestUpdate("value",d)}if(this.multiple)this.placeholder&&!this.value?.length?this.displayLabel="":this.displayLabel=this.localize.term("numOptionsSelected",this.selectedOptions.length);else{let d=this.selectedOptions[0];this.displayLabel=d?.label??""}this.updateComplete.then(()=>{this.updateValidity()})}get tags(){return this.selectedOptions.map((t,e)=>{if(e<this.maxOptionsVisible||this.maxOptionsVisible<=0){let o=this.getTag(t,e);return o?typeof o=="string"?ba(o):o:null}else if(e===this.maxOptionsVisible)return O`
          <wa-tag
            part="tag"
            exportparts="
              base:tag__base,
              content:tag__content,
              remove-button:tag__remove-button,
              remove-button__base:tag__remove-button__base
            "
            >+${this.selectedOptions.length-e}</wa-tag
          >
        `;return null})}updated(t){super.updated(t),(t.has("value")||t.has("displayLabel"))&&this.customStates.set("blank",!this.value&&!this.displayLabel)}handleDisabledChange(){this.disabled&&this.open&&(this.open=!1)}handleValueChange(){let t=this.getAllOptions(),e=Array.isArray(this.value)?this.value:[this.value],o=t.filter(i=>e.includes(i.value));this.setSelectedOptions(o),this.updateValidity()}async handleOpenChange(){if(this.open&&!this.disabled){this.setCurrentOption(this.selectedOptions[0]||this.getFirstOption());let t=new Xe;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1;return}this.addOpenListeners(),this.listbox.hidden=!1,this.popup.active=!0,requestAnimationFrame(()=>{this.setCurrentOption(this.currentOption)}),await Gt(this.popup.popup,"show"),this.currentOption&&wa(this.currentOption,this.listbox,"vertical","auto"),this.dispatchEvent(new Ze)}else{let t=new Je;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1;return}this.removeOpenListeners(),await Gt(this.popup.popup,"hide"),this.listbox.hidden=!0,this.popup.active=!1,this.dispatchEvent(new Qe)}}async show(){if(this.open||this.disabled){this.open=!1;return}return this.open=!0,to(this,"wa-after-show")}async hide(){if(!this.open||this.disabled){this.open=!1;return}return this.open=!1,to(this,"wa-after-hide")}focus(t){this.displayInput.focus(t)}blur(){this.displayInput.blur()}formResetCallback(){this.selectionOrder.clear(),this.value=this.defaultValue,super.formResetCallback(),this.handleValueChange(),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}render(){let t=this.hasUpdated?this.hasSlotController.test("label"):this.withLabel,e=this.hasUpdated?this.hasSlotController.test("hint"):this.withHint,o=this.label?!0:!!t,i=this.hint?!0:!!e,n=(this.hasUpdated||!1)&&this.withClear&&!this.disabled&&(this.displayLabel||this.value&&this.value.length>0);return O`
      <div
        part="form-control"
        class=${wt({"form-control":!0,"form-control-has-label":o})}
      >
        <label
          id="label"
          part="form-control-label label"
          class=${wt({label:!0,"has-label":o})}
          aria-hidden=${o?"false":"true"}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <wa-popup
            class=${wt({select:!0,open:this.open,disabled:this.disabled,enabled:!this.disabled,multiple:this.multiple})}
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
          class=${wt({"has-slotted":i})}
          aria-hidden=${i?"false":"true"}
          >${this.hint}</slot
        >
      </div>
    `}};U.css=[va,eo,Ht];h([st(".select")],U.prototype,"popup",2);h([st(".combobox")],U.prototype,"combobox",2);h([st(".display-input")],U.prototype,"displayInput",2);h([st(".value-input")],U.prototype,"valueInput",2);h([st(".listbox")],U.prototype,"listbox",2);h([zt()],U.prototype,"displayLabel",2);h([zt()],U.prototype,"currentOption",2);h([zt()],U.prototype,"selectedOptions",2);h([w({reflect:!0})],U.prototype,"name",2);h([w({attribute:!1})],U.prototype,"defaultValue",1);h([w({attribute:"value",reflect:!1})],U.prototype,"value",1);h([w({reflect:!0})],U.prototype,"size",2);h([W("size")],U.prototype,"handleSizeChange",1);h([w()],U.prototype,"placeholder",2);h([w({type:Boolean,reflect:!0})],U.prototype,"multiple",2);h([w({attribute:"max-options-visible",type:Number})],U.prototype,"maxOptionsVisible",2);h([w({type:Boolean})],U.prototype,"disabled",2);h([w({attribute:"with-clear",type:Boolean})],U.prototype,"withClear",2);h([w({type:Boolean,reflect:!0})],U.prototype,"open",2);h([w({reflect:!0})],U.prototype,"appearance",2);h([w({type:Boolean,reflect:!0})],U.prototype,"pill",2);h([w()],U.prototype,"label",2);h([w({reflect:!0})],U.prototype,"placement",2);h([w({attribute:"hint"})],U.prototype,"hint",2);h([w({attribute:"with-label",type:Boolean})],U.prototype,"withLabel",2);h([w({attribute:"with-hint",type:Boolean})],U.prototype,"withHint",2);h([w({type:Boolean,reflect:!0})],U.prototype,"required",2);h([w({attribute:!1})],U.prototype,"getTag",2);h([W("disabled",{waitUntilFirstUpdate:!0})],U.prototype,"handleDisabledChange",1);h([W("value",{waitUntilFirstUpdate:!0})],U.prototype,"handleValueChange",1);h([W("open",{waitUntilFirstUpdate:!0})],U.prototype,"handleOpenChange",1);U=h([it("wa-select")],U);U.disableWarning?.("change-in-update");var ya=class extends Event{constructor(){super("wa-remove",{bubbles:!0,cancelable:!1,composed:!0})}};var xa=j`
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
`;var he=class extends ct{constructor(){super(...arguments),this.localize=new St(this),this.variant="neutral",this.appearance="filled-outlined",this.size="m",this.pill=!1,this.withRemove=!1}handleSizeChange(){Ut(this.localName,this.size)}handleRemoveClick(){this.dispatchEvent(new ya)}render(){return O`
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
    `}};he.css=[xa,We,Ht];h([w({reflect:!0})],he.prototype,"variant",2);h([w({reflect:!0})],he.prototype,"appearance",2);h([w({reflect:!0})],he.prototype,"size",2);h([W("size")],he.prototype,"handleSizeChange",1);h([w({type:Boolean,reflect:!0})],he.prototype,"pill",2);h([w({attribute:"with-remove",type:Boolean})],he.prototype,"withRemove",2);he=h([it("wa-tag")],he);var Ca=j`
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
`;function wo(t,e=0){if(!t||!globalThis.Node)return"";if(typeof t[Symbol.iterator]=="function")return(Array.isArray(t)?t:[...t]).map(n=>wo(n,--e)).join("");let o=t;if(o.nodeType===Node.TEXT_NODE)return o.textContent??"";if(o.nodeType===Node.ELEMENT_NODE){let i=o;if(i.hasAttribute("slot")||i.matches("style, script"))return"";if(i instanceof HTMLSlotElement){let n=i.assignedNodes({flatten:!0});if(n.length>0)return wo(n,--e)}return e>-1?wo(i,--e):i.textContent??""}return o.hasChildNodes()?wo(o.childNodes,--e):""}var Xt=class extends ct{constructor(){super(...arguments),this.localize=new St(this),this.cachedDefaultLabel="",this.isInitialized=!1,this.isDefaultLabelDirty=!0,this.current=!1,this.value="",this.disabled=!1,this.selected=!1,this.defaultSelected=!1,this._label="",this.handleHover=t=>{t.type==="mouseenter"?this.customStates.set("hover",!0):t.type==="mouseleave"&&this.customStates.set("hover",!1)}}set label(t){let e=this._label;this._label=t||"",this._label!==e&&this.requestUpdate("label",e)}get label(){return this._label?this._label:this.defaultLabel}get defaultLabel(){return(this.isDefaultLabelDirty||!this.cachedDefaultLabel)&&this.updateDefaultLabel(),this.cachedDefaultLabel}connectedCallback(){super.connectedCallback(),this.setAttribute("role","option"),this.setAttribute("aria-selected","false"),this.addEventListener("mouseenter",this.handleHover),this.addEventListener("mouseleave",this.handleHover)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("mouseenter",this.handleHover),this.removeEventListener("mouseleave",this.handleHover)}handleDefaultSlotChange(){this.isDefaultLabelDirty=!0,this.isInitialized?(customElements.whenDefined("wa-select").then(()=>{let t=this.closest("wa-select");t&&t.handleDefaultSlotChange()}),customElements.whenDefined("wa-combobox").then(()=>{let t=this.closest("wa-combobox");t&&t.handleDefaultSlotChange()})):this.isInitialized=!0}willUpdate(t){if(t.has("defaultSelected")&&!this.closest("wa-combobox, wa-select")?.hasInteracted&&this.defaultSelected){let e=this.selected;this.selected=this.defaultSelected,this.requestUpdate("selected",e)}super.willUpdate(t)}updated(t){super.updated(t),t.has("disabled")&&(this.setAttribute("aria-disabled",this.disabled?"true":"false"),this.customStates.set("disabled",this.disabled)),t.has("selected")&&(this.setAttribute("aria-selected",this.selected?"true":"false"),this.customStates.set("selected",this.selected)),t.has("value")&&(typeof this.value!="string"&&(this.value=String(this.value)),this.handleDefaultSlotChange()),t.has("current")&&this.customStates.set("current",this.current)}firstUpdated(t){if(super.firstUpdated(t),this.selected&&!this.defaultSelected){let e=this.closest("wa-select, wa-combobox");e&&!e.hasInteracted&&e.selectionChanged?.()}}updateDefaultLabel(){let t=this.cachedDefaultLabel;this.cachedDefaultLabel=wo(this).trim(),this.isDefaultLabelDirty=!1;let e=this.cachedDefaultLabel!==t;return!this._label&&e&&this.requestUpdate("label",t),e}render(){return O`
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
    `}};Xt.css=Ca;h([st(".label")],Xt.prototype,"defaultSlot",2);h([zt()],Xt.prototype,"current",2);h([w({reflect:!0})],Xt.prototype,"value",2);h([w({type:Boolean})],Xt.prototype,"disabled",2);h([w({type:Boolean,attribute:!1})],Xt.prototype,"selected",2);h([w({type:Boolean,attribute:"selected"})],Xt.prototype,"defaultSelected",2);h([w()],Xt.prototype,"label",1);Xt=h([it("wa-option")],Xt);var ka=class extends Event{constructor(){super("wa-reposition",{bubbles:!0,cancelable:!1,composed:!0})}};var _a=j`
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
`;var ie=Math.min,It=Math.max,yo=Math.round,xo=Math.floor,Jt=t=>({x:t,y:t}),Gs={left:"right",right:"left",bottom:"top",top:"bottom"};function or(t,e,o){return It(t,ie(e,o))}function Me(t,e){return typeof t=="function"?t(e):t}function fe(t){return t.split("-")[0]}function Re(t){return t.split("-")[1]}function Hr(t){return t==="x"?"y":"x"}function rr(t){return t==="y"?"height":"width"}function ae(t){let e=t[0];return e==="t"||e==="b"?"y":"x"}function ir(t){return Hr(ae(t))}function Aa(t,e,o){o===void 0&&(o=!1);let i=Re(t),n=ir(t),c=rr(n),d=n==="x"?i===(o?"end":"start")?"right":"left":i==="start"?"bottom":"top";return e.reference[c]>e.floating[c]&&(d=bo(d)),[d,bo(d)]}function Ea(t){let e=bo(t);return[er(t),e,er(e)]}function er(t){return t.includes("start")?t.replace("start","end"):t.replace("end","start")}var La=["left","right"],Sa=["right","left"],Xs=["top","bottom"],Js=["bottom","top"];function Qs(t,e,o){switch(t){case"top":case"bottom":return o?e?Sa:La:e?La:Sa;case"left":case"right":return e?Xs:Js;default:return[]}}function $a(t,e,o,i){let n=Re(t),c=Qs(fe(t),o==="start",i);return n&&(c=c.map(d=>d+"-"+n),e&&(c=c.concat(c.map(er)))),c}function bo(t){let e=fe(t);return Gs[e]+t.slice(e.length)}function Zs(t){return{top:0,right:0,bottom:0,left:0,...t}}function jr(t){return typeof t!="number"?Zs(t):{top:t,right:t,bottom:t,left:t}}function Pe(t){let{x:e,y:o,width:i,height:n}=t;return{width:i,height:n,top:o,left:e,right:e+i,bottom:o+n,x:e,y:o}}function Oa(t,e,o){let{reference:i,floating:n}=t,c=ae(e),d=ir(e),m=rr(d),v=fe(e),y=c==="y",C=i.x+i.width/2-n.width/2,b=i.y+i.height/2-n.height/2,S=i[m]/2-n[m]/2,k;switch(v){case"top":k={x:C,y:i.y-n.height};break;case"bottom":k={x:C,y:i.y+i.height};break;case"right":k={x:i.x+i.width,y:b};break;case"left":k={x:i.x-n.width,y:b};break;default:k={x:i.x,y:i.y}}switch(Re(e)){case"start":k[d]-=S*(o&&y?-1:1);break;case"end":k[d]+=S*(o&&y?-1:1);break}return k}async function za(t,e){var o;e===void 0&&(e={});let{x:i,y:n,platform:c,rects:d,elements:m,strategy:v}=t,{boundary:y="clippingAncestors",rootBoundary:C="viewport",elementContext:b="floating",altBoundary:S=!1,padding:k=0}=Me(e,t),$=jr(k),D=m[S?b==="floating"?"reference":"floating":b],M=Pe(await c.getClippingRect({element:(o=await(c.isElement==null?void 0:c.isElement(D)))==null||o?D:D.contextElement||await(c.getDocumentElement==null?void 0:c.getDocumentElement(m.floating)),boundary:y,rootBoundary:C,strategy:v})),Y=b==="floating"?{x:i,y:n,width:d.floating.width,height:d.floating.height}:d.reference,G=await(c.getOffsetParent==null?void 0:c.getOffsetParent(m.floating)),ot=await(c.isElement==null?void 0:c.isElement(G))?await(c.getScale==null?void 0:c.getScale(G))||{x:1,y:1}:{x:1,y:1},ht=Pe(c.convertOffsetParentRelativeRectToViewportRelativeRect?await c.convertOffsetParentRelativeRectToViewportRelativeRect({elements:m,rect:Y,offsetParent:G,strategy:v}):Y);return{top:(M.top-ht.top+$.top)/ot.y,bottom:(ht.bottom-M.bottom+$.bottom)/ot.y,left:(M.left-ht.left+$.left)/ot.x,right:(ht.right-M.right+$.right)/ot.x}}var tl=50,Ia=async(t,e,o)=>{let{placement:i="bottom",strategy:n="absolute",middleware:c=[],platform:d}=o,m=d.detectOverflow?d:{...d,detectOverflow:za},v=await(d.isRTL==null?void 0:d.isRTL(e)),y=await d.getElementRects({reference:t,floating:e,strategy:n}),{x:C,y:b}=Oa(y,i,v),S=i,k=0,$={};for(let I=0;I<c.length;I++){let D=c[I];if(!D)continue;let{name:M,fn:Y}=D,{x:G,y:ot,data:ht,reset:ft}=await Y({x:C,y:b,initialPlacement:i,placement:S,strategy:n,middlewareData:$,rects:y,platform:m,elements:{reference:t,floating:e}});C=G??C,b=ot??b,$[M]={...$[M],...ht},ft&&k<tl&&(k++,typeof ft=="object"&&(ft.placement&&(S=ft.placement),ft.rects&&(y=ft.rects===!0?await d.getElementRects({reference:t,floating:e,strategy:n}):ft.rects),{x:C,y:b}=Oa(y,S,v)),I=-1)}return{x:C,y:b,placement:S,strategy:n,middlewareData:$}},Fa=t=>({name:"arrow",options:t,async fn(e){let{x:o,y:i,placement:n,rects:c,platform:d,elements:m,middlewareData:v}=e,{element:y,padding:C=0}=Me(t,e)||{};if(y==null)return{};let b=jr(C),S={x:o,y:i},k=ir(n),$=rr(k),I=await d.getDimensions(y),D=k==="y",M=D?"top":"left",Y=D?"bottom":"right",G=D?"clientHeight":"clientWidth",ot=c.reference[$]+c.reference[k]-S[k]-c.floating[$],ht=S[k]-c.reference[k],ft=await(d.getOffsetParent==null?void 0:d.getOffsetParent(y)),bt=ft?ft[G]:0;(!bt||!await(d.isElement==null?void 0:d.isElement(ft)))&&(bt=m.floating[G]||c.floating[$]);let Yt=ot/2-ht/2,qt=bt/2-I[$]/2-1,Ft=ie(b[M],qt),te=ie(b[Y],qt),Mt=Ft,ee=bt-I[$]-te,gt=bt/2-I[$]/2+Yt,ce=or(Mt,gt,ee),Kt=!v.arrow&&Re(n)!=null&&gt!==ce&&c.reference[$]/2-(gt<Mt?Ft:te)-I[$]/2<0,Rt=Kt?gt<Mt?gt-Mt:gt-ee:0;return{[k]:S[k]+Rt,data:{[k]:ce,centerOffset:gt-ce-Rt,...Kt&&{alignmentOffset:Rt}},reset:Kt}}});var Ta=function(t){return t===void 0&&(t={}),{name:"flip",options:t,async fn(e){var o,i;let{placement:n,middlewareData:c,rects:d,initialPlacement:m,platform:v,elements:y}=e,{mainAxis:C=!0,crossAxis:b=!0,fallbackPlacements:S,fallbackStrategy:k="bestFit",fallbackAxisSideDirection:$="none",flipAlignment:I=!0,...D}=Me(t,e);if((o=c.arrow)!=null&&o.alignmentOffset)return{};let M=fe(n),Y=ae(m),G=fe(m)===m,ot=await(v.isRTL==null?void 0:v.isRTL(y.floating)),ht=S||(G||!I?[bo(m)]:Ea(m)),ft=$!=="none";!S&&ft&&ht.push(...$a(m,I,$,ot));let bt=[m,...ht],Yt=await v.detectOverflow(e,D),qt=[],Ft=((i=c.flip)==null?void 0:i.overflows)||[];if(C&&qt.push(Yt[M]),b){let gt=Aa(n,d,ot);qt.push(Yt[gt[0]],Yt[gt[1]])}if(Ft=[...Ft,{placement:n,overflows:qt}],!qt.every(gt=>gt<=0)){var te,Mt;let gt=(((te=c.flip)==null?void 0:te.index)||0)+1,ce=bt[gt];if(ce&&(!(b==="alignment"?Y!==ae(ce):!1)||Ft.every(At=>ae(At.placement)===Y?At.overflows[0]>0:!0)))return{data:{index:gt,overflows:Ft},reset:{placement:ce}};let Kt=(Mt=Ft.filter(Rt=>Rt.overflows[0]<=0).sort((Rt,At)=>Rt.overflows[1]-At.overflows[1])[0])==null?void 0:Mt.placement;if(!Kt)switch(k){case"bestFit":{var ee;let Rt=(ee=Ft.filter(At=>{if(ft){let Vt=ae(At.placement);return Vt===Y||Vt==="y"}return!0}).map(At=>[At.placement,At.overflows.filter(Vt=>Vt>0).reduce((Vt,Ue)=>Vt+Ue,0)]).sort((At,Vt)=>At[1]-Vt[1])[0])==null?void 0:ee[0];Rt&&(Kt=Rt);break}case"initialPlacement":Kt=m;break}if(n!==Kt)return{reset:{placement:Kt}}}return{}}}};var el=new Set(["left","top"]);async function ol(t,e){let{placement:o,platform:i,elements:n}=t,c=await(i.isRTL==null?void 0:i.isRTL(n.floating)),d=fe(o),m=Re(o),v=ae(o)==="y",y=el.has(d)?-1:1,C=c&&v?-1:1,b=Me(e,t),{mainAxis:S,crossAxis:k,alignmentAxis:$}=typeof b=="number"?{mainAxis:b,crossAxis:0,alignmentAxis:null}:{mainAxis:b.mainAxis||0,crossAxis:b.crossAxis||0,alignmentAxis:b.alignmentAxis};return m&&typeof $=="number"&&(k=m==="end"?$*-1:$),v?{x:k*C,y:S*y}:{x:S*y,y:k*C}}var Ba=function(t){return t===void 0&&(t=0),{name:"offset",options:t,async fn(e){var o,i;let{x:n,y:c,placement:d,middlewareData:m}=e,v=await ol(e,t);return d===((o=m.offset)==null?void 0:o.placement)&&(i=m.arrow)!=null&&i.alignmentOffset?{}:{x:n+v.x,y:c+v.y,data:{...v,placement:d}}}}},Ma=function(t){return t===void 0&&(t={}),{name:"shift",options:t,async fn(e){let{x:o,y:i,placement:n,platform:c}=e,{mainAxis:d=!0,crossAxis:m=!1,limiter:v={fn:M=>{let{x:Y,y:G}=M;return{x:Y,y:G}}},...y}=Me(t,e),C={x:o,y:i},b=await c.detectOverflow(e,y),S=ae(fe(n)),k=Hr(S),$=C[k],I=C[S];if(d){let M=k==="y"?"top":"left",Y=k==="y"?"bottom":"right",G=$+b[M],ot=$-b[Y];$=or(G,$,ot)}if(m){let M=S==="y"?"top":"left",Y=S==="y"?"bottom":"right",G=I+b[M],ot=I-b[Y];I=or(G,I,ot)}let D=v.fn({...e,[k]:$,[S]:I});return{...D,data:{x:D.x-o,y:D.y-i,enabled:{[k]:d,[S]:m}}}}}};var Ra=function(t){return t===void 0&&(t={}),{name:"size",options:t,async fn(e){var o,i;let{placement:n,rects:c,platform:d,elements:m}=e,{apply:v=()=>{},...y}=Me(t,e),C=await d.detectOverflow(e,y),b=fe(n),S=Re(n),k=ae(n)==="y",{width:$,height:I}=c.floating,D,M;b==="top"||b==="bottom"?(D=b,M=S===(await(d.isRTL==null?void 0:d.isRTL(m.floating))?"start":"end")?"left":"right"):(M=b,D=S==="end"?"top":"bottom");let Y=I-C.top-C.bottom,G=$-C.left-C.right,ot=ie(I-C[D],Y),ht=ie($-C[M],G),ft=!e.middlewareData.shift,bt=ot,Yt=ht;if((o=e.middlewareData.shift)!=null&&o.enabled.x&&(Yt=G),(i=e.middlewareData.shift)!=null&&i.enabled.y&&(bt=Y),ft&&!S){let Ft=It(C.left,0),te=It(C.right,0),Mt=It(C.top,0),ee=It(C.bottom,0);k?Yt=$-2*(Ft!==0||te!==0?Ft+te:It(C.left,C.right)):bt=I-2*(Mt!==0||ee!==0?Mt+ee:It(C.top,C.bottom))}await v({...e,availableWidth:Yt,availableHeight:bt});let qt=await d.getDimensions(m.floating);return $!==qt.width||I!==qt.height?{reset:{rects:!0}}:{}}}};function ar(){return typeof window<"u"}function Ne(t){return Da(t)?(t.nodeName||"").toLowerCase():"#document"}function Bt(t){var e;return(t==null||(e=t.ownerDocument)==null?void 0:e.defaultView)||window}function Qt(t){var e;return(e=(Da(t)?t.ownerDocument:t.document)||window.document)==null?void 0:e.documentElement}function Da(t){return ar()?t instanceof Node||t instanceof Bt(t).Node:!1}function jt(t){return ar()?t instanceof Element||t instanceof Bt(t).Element:!1}function ne(t){return ar()?t instanceof HTMLElement||t instanceof Bt(t).HTMLElement:!1}function Pa(t){return!ar()||typeof ShadowRoot>"u"?!1:t instanceof ShadowRoot||t instanceof Bt(t).ShadowRoot}function oo(t){let{overflow:e,overflowX:o,overflowY:i,display:n}=Wt(t);return/auto|scroll|overlay|hidden|clip/.test(e+i+o)&&n!=="inline"&&n!=="contents"}function Na(t){return/^(table|td|th)$/.test(Ne(t))}function Co(t){try{if(t.matches(":popover-open"))return!0}catch{}try{return t.matches(":modal")}catch{return!1}}var rl=/transform|translate|scale|rotate|perspective|filter/,il=/paint|layout|strict|content/,De=t=>!!t&&t!=="none",Wr;function ro(t){let e=jt(t)?Wt(t):t;return De(e.transform)||De(e.translate)||De(e.scale)||De(e.rotate)||De(e.perspective)||!nr()&&(De(e.backdropFilter)||De(e.filter))||rl.test(e.willChange||"")||il.test(e.contain||"")}function qa(t){let e=me(t);for(;ne(e)&&!qe(e);){if(ro(e))return e;if(Co(e))return null;e=me(e)}return null}function nr(){return Wr==null&&(Wr=typeof CSS<"u"&&CSS.supports&&CSS.supports("-webkit-backdrop-filter","none")),Wr}function qe(t){return/^(html|body|#document)$/.test(Ne(t))}function Wt(t){return Bt(t).getComputedStyle(t)}function ko(t){return jt(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.scrollX,scrollTop:t.scrollY}}function me(t){if(Ne(t)==="html")return t;let e=t.assignedSlot||t.parentNode||Pa(t)&&t.host||Qt(t);return Pa(e)?e.host:e}function Va(t){let e=me(t);return qe(e)?t.ownerDocument?t.ownerDocument.body:t.body:ne(e)&&oo(e)?e:Va(e)}function ge(t,e,o){var i;e===void 0&&(e=[]),o===void 0&&(o=!0);let n=Va(t),c=n===((i=t.ownerDocument)==null?void 0:i.body),d=Bt(n);if(c){let m=sr(d);return e.concat(d,d.visualViewport||[],oo(n)?n:[],m&&o?ge(m):[])}else return e.concat(n,ge(n,[],o))}function sr(t){return t.parent&&Object.getPrototypeOf(t.parent)?t.frameElement:null}function Wa(t){let e=Wt(t),o=parseFloat(e.width)||0,i=parseFloat(e.height)||0,n=ne(t),c=n?t.offsetWidth:o,d=n?t.offsetHeight:i,m=yo(o)!==c||yo(i)!==d;return m&&(o=c,i=d),{width:o,height:i,$:m}}function Kr(t){return jt(t)?t:t.contextElement}function io(t){let e=Kr(t);if(!ne(e))return Jt(1);let o=e.getBoundingClientRect(),{width:i,height:n,$:c}=Wa(e),d=(c?yo(o.width):o.width)/i,m=(c?yo(o.height):o.height)/n;return(!d||!Number.isFinite(d))&&(d=1),(!m||!Number.isFinite(m))&&(m=1),{x:d,y:m}}var al=Jt(0);function Ya(t){let e=Bt(t);return!nr()||!e.visualViewport?al:{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}}function nl(t,e,o){return e===void 0&&(e=!1),!o||e&&o!==Bt(t)?!1:e}function Ve(t,e,o,i){e===void 0&&(e=!1),o===void 0&&(o=!1);let n=t.getBoundingClientRect(),c=Kr(t),d=Jt(1);e&&(i?jt(i)&&(d=io(i)):d=io(t));let m=nl(c,o,i)?Ya(c):Jt(0),v=(n.left+m.x)/d.x,y=(n.top+m.y)/d.y,C=n.width/d.x,b=n.height/d.y;if(c){let S=Bt(c),k=i&&jt(i)?Bt(i):i,$=S,I=sr($);for(;I&&i&&k!==$;){let D=io(I),M=I.getBoundingClientRect(),Y=Wt(I),G=M.left+(I.clientLeft+parseFloat(Y.paddingLeft))*D.x,ot=M.top+(I.clientTop+parseFloat(Y.paddingTop))*D.y;v*=D.x,y*=D.y,C*=D.x,b*=D.y,v+=G,y+=ot,$=Bt(I),I=sr($)}}return Pe({width:C,height:b,x:v,y})}function lr(t,e){let o=ko(t).scrollLeft;return e?e.left+o:Ve(Qt(t)).left+o}function Ka(t,e){let o=t.getBoundingClientRect(),i=o.left+e.scrollLeft-lr(t,o),n=o.top+e.scrollTop;return{x:i,y:n}}function sl(t){let{elements:e,rect:o,offsetParent:i,strategy:n}=t,c=n==="fixed",d=Qt(i),m=e?Co(e.floating):!1;if(i===d||m&&c)return o;let v={scrollLeft:0,scrollTop:0},y=Jt(1),C=Jt(0),b=ne(i);if((b||!b&&!c)&&((Ne(i)!=="body"||oo(d))&&(v=ko(i)),b)){let k=Ve(i);y=io(i),C.x=k.x+i.clientLeft,C.y=k.y+i.clientTop}let S=d&&!b&&!c?Ka(d,v):Jt(0);return{width:o.width*y.x,height:o.height*y.y,x:o.x*y.x-v.scrollLeft*y.x+C.x+S.x,y:o.y*y.y-v.scrollTop*y.y+C.y+S.y}}function ll(t){return Array.from(t.getClientRects())}function cl(t){let e=Qt(t),o=ko(t),i=t.ownerDocument.body,n=It(e.scrollWidth,e.clientWidth,i.scrollWidth,i.clientWidth),c=It(e.scrollHeight,e.clientHeight,i.scrollHeight,i.clientHeight),d=-o.scrollLeft+lr(t),m=-o.scrollTop;return Wt(i).direction==="rtl"&&(d+=It(e.clientWidth,i.clientWidth)-n),{width:n,height:c,x:d,y:m}}var Ua=25;function dl(t,e){let o=Bt(t),i=Qt(t),n=o.visualViewport,c=i.clientWidth,d=i.clientHeight,m=0,v=0;if(n){c=n.width,d=n.height;let C=nr();(!C||C&&e==="fixed")&&(m=n.offsetLeft,v=n.offsetTop)}let y=lr(i);if(y<=0){let C=i.ownerDocument,b=C.body,S=getComputedStyle(b),k=C.compatMode==="CSS1Compat"&&parseFloat(S.marginLeft)+parseFloat(S.marginRight)||0,$=Math.abs(i.clientWidth-b.clientWidth-k);$<=Ua&&(c-=$)}else y<=Ua&&(c+=y);return{width:c,height:d,x:m,y:v}}function ul(t,e){let o=Ve(t,!0,e==="fixed"),i=o.top+t.clientTop,n=o.left+t.clientLeft,c=ne(t)?io(t):Jt(1),d=t.clientWidth*c.x,m=t.clientHeight*c.y,v=n*c.x,y=i*c.y;return{width:d,height:m,x:v,y}}function Ha(t,e,o){let i;if(e==="viewport")i=dl(t,o);else if(e==="document")i=cl(Qt(t));else if(jt(e))i=ul(e,o);else{let n=Ya(t);i={x:e.x-n.x,y:e.y-n.y,width:e.width,height:e.height}}return Pe(i)}function Ga(t,e){let o=me(t);return o===e||!jt(o)||qe(o)?!1:Wt(o).position==="fixed"||Ga(o,e)}function pl(t,e){let o=e.get(t);if(o)return o;let i=ge(t,[],!1).filter(m=>jt(m)&&Ne(m)!=="body"),n=null,c=Wt(t).position==="fixed",d=c?me(t):t;for(;jt(d)&&!qe(d);){let m=Wt(d),v=ro(d);!v&&m.position==="fixed"&&(n=null),(c?!v&&!n:!v&&m.position==="static"&&!!n&&(n.position==="absolute"||n.position==="fixed")||oo(d)&&!v&&Ga(t,d))?i=i.filter(C=>C!==d):n=m,d=me(d)}return e.set(t,i),i}function hl(t){let{element:e,boundary:o,rootBoundary:i,strategy:n}=t,d=[...o==="clippingAncestors"?Co(e)?[]:pl(e,this._c):[].concat(o),i],m=Ha(e,d[0],n),v=m.top,y=m.right,C=m.bottom,b=m.left;for(let S=1;S<d.length;S++){let k=Ha(e,d[S],n);v=It(k.top,v),y=ie(k.right,y),C=ie(k.bottom,C),b=It(k.left,b)}return{width:y-b,height:C-v,x:b,y:v}}function fl(t){let{width:e,height:o}=Wa(t);return{width:e,height:o}}function ml(t,e,o){let i=ne(e),n=Qt(e),c=o==="fixed",d=Ve(t,!0,c,e),m={scrollLeft:0,scrollTop:0},v=Jt(0);function y(){v.x=lr(n)}if(i||!i&&!c)if((Ne(e)!=="body"||oo(n))&&(m=ko(e)),i){let k=Ve(e,!0,c,e);v.x=k.x+e.clientLeft,v.y=k.y+e.clientTop}else n&&y();c&&!i&&n&&y();let C=n&&!i&&!c?Ka(n,m):Jt(0),b=d.left+m.scrollLeft-v.x-C.x,S=d.top+m.scrollTop-v.y-C.y;return{x:b,y:S,width:d.width,height:d.height}}function Yr(t){return Wt(t).position==="static"}function ja(t,e){if(!ne(t)||Wt(t).position==="fixed")return null;if(e)return e(t);let o=t.offsetParent;return Qt(t)===o&&(o=o.ownerDocument.body),o}function Xa(t,e){let o=Bt(t);if(Co(t))return o;if(!ne(t)){let n=me(t);for(;n&&!qe(n);){if(jt(n)&&!Yr(n))return n;n=me(n)}return o}let i=ja(t,e);for(;i&&Na(i)&&Yr(i);)i=ja(i,e);return i&&qe(i)&&Yr(i)&&!ro(i)?o:i||qa(t)||o}var gl=async function(t){let e=this.getOffsetParent||Xa,o=this.getDimensions,i=await o(t.floating);return{reference:ml(t.reference,await e(t.floating),t.strategy),floating:{x:0,y:0,width:i.width,height:i.height}}};function vl(t){return Wt(t).direction==="rtl"}var _o={convertOffsetParentRelativeRectToViewportRelativeRect:sl,getDocumentElement:Qt,getClippingRect:hl,getOffsetParent:Xa,getElementRects:gl,getClientRects:ll,getDimensions:fl,getScale:io,isElement:jt,isRTL:vl};function Ja(t,e){return t.x===e.x&&t.y===e.y&&t.width===e.width&&t.height===e.height}function wl(t,e){let o=null,i,n=Qt(t);function c(){var m;clearTimeout(i),(m=o)==null||m.disconnect(),o=null}function d(m,v){m===void 0&&(m=!1),v===void 0&&(v=1),c();let y=t.getBoundingClientRect(),{left:C,top:b,width:S,height:k}=y;if(m||e(),!S||!k)return;let $=xo(b),I=xo(n.clientWidth-(C+S)),D=xo(n.clientHeight-(b+k)),M=xo(C),G={rootMargin:-$+"px "+-I+"px "+-D+"px "+-M+"px",threshold:It(0,ie(1,v))||1},ot=!0;function ht(ft){let bt=ft[0].intersectionRatio;if(bt!==v){if(!ot)return d();bt?d(!1,bt):i=setTimeout(()=>{d(!1,1e-7)},1e3)}bt===1&&!Ja(y,t.getBoundingClientRect())&&d(),ot=!1}try{o=new IntersectionObserver(ht,{...G,root:n.ownerDocument})}catch{o=new IntersectionObserver(ht,G)}o.observe(t)}return d(!0),c}function Qa(t,e,o,i){i===void 0&&(i={});let{ancestorScroll:n=!0,ancestorResize:c=!0,elementResize:d=typeof ResizeObserver=="function",layoutShift:m=typeof IntersectionObserver=="function",animationFrame:v=!1}=i,y=Kr(t),C=n||c?[...y?ge(y):[],...e?ge(e):[]]:[];C.forEach(M=>{n&&M.addEventListener("scroll",o,{passive:!0}),c&&M.addEventListener("resize",o)});let b=y&&m?wl(y,o):null,S=-1,k=null;d&&(k=new ResizeObserver(M=>{let[Y]=M;Y&&Y.target===y&&k&&e&&(k.unobserve(e),cancelAnimationFrame(S),S=requestAnimationFrame(()=>{var G;(G=k)==null||G.observe(e)})),o()}),y&&!v&&k.observe(y),e&&k.observe(e));let $,I=v?Ve(t):null;v&&D();function D(){let M=Ve(t);I&&!Ja(I,M)&&o(),I=M,$=requestAnimationFrame(D)}return o(),()=>{var M;C.forEach(Y=>{n&&Y.removeEventListener("scroll",o),c&&Y.removeEventListener("resize",o)}),b?.(),(M=k)==null||M.disconnect(),k=null,v&&cancelAnimationFrame($)}}var Za=Ba;var tn=Ma,en=Ta,Gr=Ra;var on=Fa;var rn=(t,e,o)=>{let i=new Map,n={platform:_o,...o},c={...n.platform,_c:i};return Ia(t,e,{...n,platform:c})};function an(t){return bl(t)}function Xr(t){return t.assignedSlot?t.assignedSlot:t.parentNode instanceof ShadowRoot?t.parentNode.host:t.parentNode}function bl(t){for(let e=t;e;e=Xr(e))if(e instanceof Element&&getComputedStyle(e).display==="none")return null;for(let e=Xr(t);e;e=Xr(e)){if(!(e instanceof Element))continue;let o=getComputedStyle(e);if(o.display!=="contents"&&(o.position!=="static"||ro(o)||e.tagName==="BODY"))return e}return null}function nn(t){return t!==null&&typeof t=="object"&&"getBoundingClientRect"in t&&("contextElement"in t?t instanceof Element:!0)}var cr=globalThis?.HTMLElement?.prototype.hasOwnProperty("popover"),Z=class extends ct{constructor(){super(...arguments),this.localize=new St(this),this.active=!1,this.placement="top",this.boundary="viewport",this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=!1,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl&&this.popup){let t=this.anchorEl.getBoundingClientRect(),e=this.popup.getBoundingClientRect(),o=this.placement.includes("top")||this.placement.includes("bottom"),i=0,n=0,c=0,d=0,m=0,v=0,y=0,C=0;o?t.top<e.top?(i=t.left,n=t.bottom,c=t.right,d=t.bottom,m=e.left,v=e.top,y=e.right,C=e.top):(i=e.left,n=e.bottom,c=e.right,d=e.bottom,m=t.left,v=t.top,y=t.right,C=t.top):t.left<e.left?(i=t.right,n=t.top,c=e.left,d=e.top,m=t.right,v=t.bottom,y=e.left,C=e.bottom):(i=e.right,n=e.top,c=t.left,d=t.top,m=e.right,v=e.bottom,y=t.left,C=t.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${i}px`),this.style.setProperty("--hover-bridge-top-left-y",`${n}px`),this.style.setProperty("--hover-bridge-top-right-x",`${c}px`),this.style.setProperty("--hover-bridge-top-right-y",`${d}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${m}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${v}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${y}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${C}px`)}}}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}async updated(t){super.updated(t),t.has("active")&&(this.active?this.start():this.stop()),t.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){if(await this.stop(),this.anchor&&typeof this.anchor=="string"){let t=this.getRootNode();this.anchorEl=t.getElementById(this.anchor)}else this.anchor instanceof Element||nn(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),this.anchorEl&&this.start()}start(){!this.anchorEl||!this.active||!this.isConnected||(this.popup?.showPopover?.(),this.cleanup=Qa(this.anchorEl,this.popup,()=>{this.reposition()}))}async stop(){return new Promise(t=>{this.popup?.hidePopover?.(),this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>t())):t()})}reposition(){if(!this.active||!this.anchorEl||!this.popup)return;let t=[Za({mainAxis:this.distance,crossAxis:this.skidding})];this.sync?t.push(Gr({apply:({rects:i})=>{let n=this.sync==="width"||this.sync==="both",c=this.sync==="height"||this.sync==="both";this.popup.style.width=n?`${i.reference.width}px`:"",this.popup.style.height=c?`${i.reference.height}px`:""}})):(this.popup.style.width="",this.popup.style.height="");let e;cr&&!nn(this.anchor)&&this.boundary==="scroll"&&(e=ge(this.anchorEl).filter(i=>i instanceof Element)),this.flip&&t.push(en({boundary:this.flipBoundary||e,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:this.flipFallbackStrategy==="best-fit"?"bestFit":"initialPlacement",padding:this.flipPadding})),this.shift&&t.push(tn({boundary:this.shiftBoundary||e,padding:this.shiftPadding})),this.autoSize?t.push(Gr({boundary:this.autoSizeBoundary||e,padding:this.autoSizePadding,apply:({availableWidth:i,availableHeight:n})=>{this.autoSize==="vertical"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-height",`${n}px`):this.style.removeProperty("--auto-size-available-height"),this.autoSize==="horizontal"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-width",`${i}px`):this.style.removeProperty("--auto-size-available-width")}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&t.push(on({element:this.arrowEl,padding:this.arrowPadding}));let o=cr?i=>_o.getOffsetParent(i,an):_o.getOffsetParent;rn(this.anchorEl,this.popup,{placement:this.placement,middleware:t,strategy:cr?"absolute":"fixed",platform:{..._o,getOffsetParent:o}}).then(({x:i,y:n,middlewareData:c,placement:d})=>{let m=this.localize.dir()==="rtl",v={top:"bottom",right:"left",bottom:"top",left:"right"}[d.split("-")[0]];if(this.setAttribute("data-current-placement",d),Object.assign(this.popup.style,{left:`${i}px`,top:`${n}px`}),this.arrow){let y=c.arrow.x,C=c.arrow.y,b="",S="",k="",$="";if(this.arrowPlacement==="start"){let I=typeof y=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";b=typeof C=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",S=m?I:"",$=m?"":I}else if(this.arrowPlacement==="end"){let I=typeof y=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";S=m?"":I,$=m?I:"",k=typeof C=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:""}else this.arrowPlacement==="center"?($=typeof y=="number"?"calc(50% - var(--arrow-size-diagonal))":"",b=typeof C=="number"?"calc(50% - var(--arrow-size-diagonal))":""):($=typeof y=="number"?`${y}px`:"",b=typeof C=="number"?`${C}px`:"");Object.assign(this.arrowEl.style,{top:b,right:S,bottom:k,left:$,[v]:"calc(var(--arrow-base-offset) - var(--arrow-size-diagonal))"})}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.dispatchEvent(new ka)}render(){return O`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${wt({"popup-hover-bridge":!0,"popup-hover-bridge-visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        popover="manual"
        part="popup"
        class=${wt({popup:!0,"popup-active":this.active,"popup-fixed":!cr,"popup-has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?O`<div part="arrow" class="arrow" role="presentation"></div>`:""}
      </div>
    `}};Z.css=_a;h([st(".popup")],Z.prototype,"popup",2);h([st(".arrow")],Z.prototype,"arrowEl",2);h([w()],Z.prototype,"anchor",2);h([w({type:Boolean,reflect:!0})],Z.prototype,"active",2);h([w({reflect:!0})],Z.prototype,"placement",2);h([w()],Z.prototype,"boundary",2);h([w({type:Number})],Z.prototype,"distance",2);h([w({type:Number})],Z.prototype,"skidding",2);h([w({type:Boolean})],Z.prototype,"arrow",2);h([w({attribute:"arrow-placement"})],Z.prototype,"arrowPlacement",2);h([w({attribute:"arrow-padding",type:Number})],Z.prototype,"arrowPadding",2);h([w({type:Boolean})],Z.prototype,"flip",2);h([w({attribute:"flip-fallback-placements",converter:{fromAttribute:t=>t.split(" ").map(e=>e.trim()).filter(e=>e!==""),toAttribute:t=>t.join(" ")}})],Z.prototype,"flipFallbackPlacements",2);h([w({attribute:"flip-fallback-strategy"})],Z.prototype,"flipFallbackStrategy",2);h([w({type:Object})],Z.prototype,"flipBoundary",2);h([w({attribute:"flip-padding",type:Number})],Z.prototype,"flipPadding",2);h([w({type:Boolean})],Z.prototype,"shift",2);h([w({type:Object})],Z.prototype,"shiftBoundary",2);h([w({attribute:"shift-padding",type:Number})],Z.prototype,"shiftPadding",2);h([w({attribute:"auto-size"})],Z.prototype,"autoSize",2);h([w()],Z.prototype,"sync",2);h([w({type:Object})],Z.prototype,"autoSizeBoundary",2);h([w({attribute:"auto-size-padding",type:Number})],Z.prototype,"autoSizePadding",2);h([w({attribute:"hover-bridge",type:Boolean})],Z.prototype,"hoverBridge",2);Z=h([it("wa-popup")],Z);var sn=j`
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
`;function ln(t){return t.split(" ").map(e=>e.trim()).filter(e=>e!=="")}var Zt=class extends ct{constructor(){super(...arguments),this.localize=new St(this),this.hasSlotController=new oe(this,"footer","header-actions","label"),this.open=!1,this.label="",this.withoutHeader=!1,this.lightDismiss=!1,this.withFooter=!1,this.handleDocumentKeyDown=t=>{t.key==="Escape"&&this.open&&Be(this)&&(t.preventDefault(),t.stopPropagation(),this.requestClose(this.dialog))}}firstUpdated(){this.open&&(this.addOpenListeners(),this.dialog.showModal(),Vr(this))}disconnectedCallback(){super.disconnectedCallback(),Ur(this),this.removeOpenListeners()}async requestClose(t){let e=new Je({source:t});if(this.dispatchEvent(e),e.defaultPrevented){this.open=!0,Gt(this.dialog,"pulse");return}this.removeOpenListeners(),await Gt(this.dialog,"hide"),this.open=!1,this.dialog.close(),Ur(this);let o=this.originalTrigger;typeof o?.focus=="function"&&setTimeout(()=>o.focus()),this.dispatchEvent(new Qe)}addOpenListeners(){document.addEventListener("keydown",this.handleDocumentKeyDown),Ge(this)}removeOpenListeners(){document.removeEventListener("keydown",this.handleDocumentKeyDown),Te(this)}handleDialogCancel(t){t.preventDefault(),!this.dialog.classList.contains("hide")&&t.target===this.dialog&&Be(this)&&this.requestClose(this.dialog)}handleDialogClick(t){let o=t.target.closest('[data-dialog="close"]');o&&(t.stopPropagation(),this.requestClose(o))}async handleDialogPointerDown(t){t.target===this.dialog&&(this.lightDismiss?this.requestClose(this.dialog):await Gt(this.dialog,"pulse"))}handleOpenChange(){this.open&&!this.dialog.open?this.show():!this.open&&this.dialog.open&&(this.open=!0,this.requestClose(this.dialog))}async show(){let t=new Xe;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1;return}this.addOpenListeners(),this.originalTrigger=document.activeElement,this.open=!0,this.dialog.showModal(),Vr(this),requestAnimationFrame(()=>{let e=this.querySelector("[autofocus]");e&&typeof e.focus=="function"?e.focus():this.dialog.focus()}),await Gt(this.dialog,"show"),this.dispatchEvent(new Ze)}render(){let t=!this.withoutHeader,e=this.hasUpdated?this.hasSlotController.test("footer"):this.withFooter;return O`
      <dialog
        part="dialog"
        class=${wt({dialog:!0,open:this.open})}
        @cancel=${this.handleDialogCancel}
        @click=${this.handleDialogClick}
        @pointerdown=${this.handleDialogPointerDown}
      >
        ${t?O`
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

        ${e?O`
              <footer part="footer" class="footer">
                <slot name="footer"></slot>
              </footer>
            `:""}
      </dialog>
    `}};Zt.css=sn;h([st(".dialog")],Zt.prototype,"dialog",2);h([w({type:Boolean,reflect:!0})],Zt.prototype,"open",2);h([w({reflect:!0})],Zt.prototype,"label",2);h([w({attribute:"without-header",type:Boolean,reflect:!0})],Zt.prototype,"withoutHeader",2);h([w({attribute:"light-dismiss",type:Boolean})],Zt.prototype,"lightDismiss",2);h([w({attribute:"with-footer",type:Boolean})],Zt.prototype,"withFooter",2);h([W("open",{waitUntilFirstUpdate:!0})],Zt.prototype,"handleOpenChange",1);Zt=h([it("wa-dialog")],Zt);document.addEventListener("click",t=>{let e=t.target.closest("[data-dialog]");if(e instanceof Element){let[o,i]=ln(e.getAttribute("data-dialog")||"");if(o==="open"&&i?.length){let c=e.getRootNode().getElementById(i);c?.localName==="wa-dialog"?c.open=!0:console.warn(`A dialog with an ID of "${i}" could not be found in this document.`)}}}),document.addEventListener("pointerdown",()=>{});var cn=j`
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
`;var ao=class extends ct{constructor(){super(...arguments),this.orientation="horizontal"}connectedCallback(){super.connectedCallback(),this.setAttribute("role","separator")}handleVerticalChange(){this.setAttribute("aria-orientation",this.orientation)}};ao.css=cn;h([w({reflect:!0})],ao.prototype,"orientation",2);h([W("orientation")],ao.prototype,"handleVerticalChange",1);ao=h([it("wa-divider")],ao);var dn=j`
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
`;var xe=class extends ct{constructor(){super(...arguments),this.variant="brand",this.size="m"}handleSizeChange(){Ut(this.localName,this.size)}render(){return O`
      <div part="icon">
        <slot name="icon"></slot>
      </div>

      <div part="message">
        <slot></slot>
      </div>
    `}};xe.css=[dn,We,Ht];h([w({reflect:!0})],xe.prototype,"variant",2);h([w({reflect:!0})],xe.prototype,"appearance",2);h([w({reflect:!0})],xe.prototype,"size",2);h([W("size")],xe.prototype,"handleSizeChange",1);xe=h([it("wa-callout")],xe);function un(t,e){let o=t.metaKey||t.ctrlKey||t.shiftKey||t.altKey;t.key==="Enter"&&!o&&setTimeout(()=>{!t.defaultPrevented&&!t.isComposing&&yl(e)})}function yl(t){let e=null;if("form"in t&&(e=t.form),!e&&"getForm"in t&&(e=t.getForm()),!e)return;let o=[...e.elements];if(o.length===1){e.requestSubmit(null);return}let i=o.find(n=>n.type==="submit"&&!n.matches(":disabled"));i&&(["input","button"].includes(i.localName)?e.requestSubmit(i):i.click())}var pn=j`
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
`;var Lo=be(class extends re{constructor(t){if(super(t),t.type!==Dt.PROPERTY&&t.type!==Dt.ATTRIBUTE&&t.type!==Dt.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!ma(t))throw Error("`live` bindings can only contain a single expression")}render(t){return t}update(t,[e]){if(e===xt||e===N)return e;let o=t.element,i=t.name;if(t.type===Dt.PROPERTY){if(e===o[i])return xt}else if(t.type===Dt.BOOLEAN_ATTRIBUTE){if(!!e===o.hasAttribute(i))return xt}else if(t.type===Dt.ATTRIBUTE&&o.getAttribute(i)===e+"")return xt;return Xo(t),e}});var q=class extends Ct{constructor(){super(...arguments),this.assumeInteractionOn=["blur","input"],this.hasSlotController=new oe(this,"hint","label"),this.localize=new St(this),this.title="",this.type="text",this._value=null,this.defaultValue=this.getAttribute("value")||null,this.size="m",this.appearance="outlined",this.pill=!1,this.label="",this.hint="",this.withClear=!1,this.placeholder="",this.readonly=!1,this.passwordToggle=!1,this.passwordVisible=!1,this.withoutSpinButtons=!1,this.required=!1,this.spellcheck=!0,this.withLabel=!1,this.withHint=!1}static get validators(){return[...super.validators,To()]}get value(){return this.valueHasChanged?this._value:this._value??this.defaultValue}set value(t){this._value!==t&&(this.valueHasChanged=!0,this._value=t)}handleSizeChange(){Ut(this.localName,this.size)}handleChange(t){this.value=this.input.value,this.relayNativeEvent(t,{bubbles:!0,composed:!0})}handleClearClick(t){t.preventDefault(),this.value!==""&&(this.value="",this.updateComplete.then(()=>{this.dispatchEvent(new Zo),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})),this.input.focus()}handleInput(){this.value=this.input.value}handleKeyDown(t){un(t,this)}handlePasswordToggle(){this.passwordVisible=!this.passwordVisible}updated(t){if(super.updated(t),t.has("value")||t.has("defaultValue")||t.has("type")){let e=["number","date","time","datetime-local"];this.input&&e.includes(this.type)&&this.value&&this.input.value!==this.value&&(this._value=this.input.value),this.customStates.set("blank",!this.value),this.updateValidity()}}handleStepChange(){this.input.step=String(this.step),this.updateValidity()}focus(t){this.input.focus(t)}blur(){this.input.blur()}select(){this.input.select()}setSelectionRange(t,e,o="none"){this.input.setSelectionRange(t,e,o)}setRangeText(t,e,o,i="preserve"){let n=e??this.input.selectionStart,c=o??this.input.selectionEnd;this.input.setRangeText(t,n,c,i),this.value!==this.input.value&&(this.value=this.input.value)}showPicker(){"showPicker"in HTMLInputElement.prototype&&this.input.showPicker()}stepUp(){this.input.stepUp(),this.value!==this.input.value&&(this.value=this.input.value)}stepDown(){this.input.stepDown(),this.value!==this.input.value&&(this.value=this.input.value)}formResetCallback(){this.value=null,this.input&&(this.input.value=this.value),super.formResetCallback()}render(){let t=this.hasUpdated?this.hasSlotController.test("label"):this.withLabel,e=this.hasUpdated?this.hasSlotController.test("hint"):this.withHint,o=this.label?!0:!!t,i=this.hint?!0:!!e,n=this.withClear&&!this.disabled&&!this.readonly,c=this.hasUpdated&&n&&(typeof this.value=="number"||this.value&&this.value.length>0);return O`
      <label
        part="form-control-label label"
        class=${wt({label:!0,"has-label":o})}
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
          name=${et(this.name)}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          placeholder=${et(this.placeholder)}
          minlength=${et(this.minlength)}
          maxlength=${et(this.maxlength)}
          min=${et(this.min)}
          max=${et(this.max)}
          step=${et(this.step)}
          .value=${Lo(this.value??"")}
          autocapitalize=${et(this.autocapitalize)}
          autocomplete=${et(this.autocomplete)}
          autocorrect=${this.autocorrect?"on":"off"}
          ?autofocus=${this.autofocus}
          spellcheck=${this.spellcheck}
          pattern=${et(this.pattern)}
          enterkeyhint=${et(this.enterkeyhint)}
          inputmode=${et(this.inputmode)}
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
        class=${wt({"has-slotted":i})}
        aria-hidden=${i?"false":"true"}
        >${this.hint}</slot
      >
    `}};q.css=[Ht,eo,pn];q.shadowRootOptions={...Ct.shadowRootOptions,delegatesFocus:!0};h([st("input")],q.prototype,"input",2);h([w()],q.prototype,"title",2);h([w({reflect:!0})],q.prototype,"type",2);h([zt()],q.prototype,"value",1);h([w({attribute:"value",reflect:!0})],q.prototype,"defaultValue",2);h([w({reflect:!0})],q.prototype,"size",2);h([W("size")],q.prototype,"handleSizeChange",1);h([w({reflect:!0})],q.prototype,"appearance",2);h([w({type:Boolean,reflect:!0})],q.prototype,"pill",2);h([w()],q.prototype,"label",2);h([w({attribute:"hint"})],q.prototype,"hint",2);h([w({attribute:"with-clear",type:Boolean})],q.prototype,"withClear",2);h([w()],q.prototype,"placeholder",2);h([w({type:Boolean,reflect:!0})],q.prototype,"readonly",2);h([w({attribute:"password-toggle",type:Boolean})],q.prototype,"passwordToggle",2);h([w({attribute:"password-visible",type:Boolean})],q.prototype,"passwordVisible",2);h([w({attribute:"without-spin-buttons",type:Boolean,reflect:!0})],q.prototype,"withoutSpinButtons",2);h([w({type:Boolean,reflect:!0})],q.prototype,"required",2);h([w()],q.prototype,"pattern",2);h([w({type:Number})],q.prototype,"minlength",2);h([w({type:Number})],q.prototype,"maxlength",2);h([w()],q.prototype,"min",2);h([w()],q.prototype,"max",2);h([w()],q.prototype,"step",2);h([w()],q.prototype,"autocapitalize",2);h([w({type:Boolean,converter:{fromAttribute:t=>!(!t||t==="off"),toAttribute:t=>t?"on":"off"}})],q.prototype,"autocorrect",2);h([w()],q.prototype,"autocomplete",2);h([w({type:Boolean})],q.prototype,"autofocus",2);h([w()],q.prototype,"enterkeyhint",2);h([w({type:Boolean,converter:{fromAttribute:t=>!(!t||t==="false"),toAttribute:t=>t?"true":"false"}})],q.prototype,"spellcheck",2);h([w()],q.prototype,"inputmode",2);h([w({attribute:"with-label",type:Boolean})],q.prototype,"withLabel",2);h([w({attribute:"with-hint",type:Boolean})],q.prototype,"withHint",2);h([W("step",{waitUntilFirstUpdate:!0})],q.prototype,"handleStepChange",1);q=h([it("wa-input")],q);q.disableWarning?.("change-in-update");var hn=j`
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
`;var mt=class extends Ct{constructor(){super(...arguments),this.hasSlotController=new oe(this,"hint"),this.title="",this.name=null,this._value=this.getAttribute("value")??null,this.size="m",this.disabled=!1,this.indeterminate=!1,this._checked=null,this.defaultChecked=this.hasAttribute("checked"),this.required=!1,this.hint=""}static get validators(){let t=[tr({validationProperty:"checked",validationElement:Object.assign(document.createElement("input"),{type:"checkbox",required:!0})})];return[...super.validators,...t]}get value(){return this._value??"on"}set value(t){this._value=t}handleSizeChange(){Ut(this.localName,this.size)}get checked(){return this.valueHasChanged?!!this._checked:this._checked??this.defaultChecked}set checked(t){this._checked=!!t,this.valueHasChanged=!0}handleClick(){this.hasInteracted=!0,this.checked=!this.checked,this.indeterminate=!1,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}connectedCallback(){super.connectedCallback(),this.handleDefaultCheckedChange()}handleDefaultCheckedChange(){this.handleValueOrCheckedChange()}handleValueOrCheckedChange(){this.setValue(this.checked?this.value:null,this._value),this.updateValidity()}handleStateChange(){this.hasUpdated&&(this.input.checked=this.checked,this.input.indeterminate=this.indeterminate),this.customStates.set("checked",this.checked),this.customStates.set("indeterminate",this.indeterminate),this.updateValidity()}handleDisabledChange(){this.customStates.set("disabled",this.disabled)}willUpdate(t){super.willUpdate(t),(t.has("value")||t.has("checked")||t.has("defaultChecked"))&&this.handleValueOrCheckedChange()}formResetCallback(){this._checked=null,super.formResetCallback(),this.handleValueOrCheckedChange()}click(){this.input.click()}focus(t){this.input.focus(t)}blur(){this.input.blur()}render(){let t=this.hasSlotController.test("hint"),e=this.hint?!0:!!t,o=!this.checked&&this.indeterminate,i=o?"indeterminate":"check",n=o?"indeterminate":"check";return O`
      <label part="base">
        <span part="control">
          <input
            class="input"
            type="checkbox"
            title=${this.title}
            name=${et(this.name)}
            value=${et(this._value)}
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
        aria-hidden=${e?"false":"true"}
        class="${wt({"has-slotted":e})}"
      >
        ${this.hint}
      </slot>
    `}};mt.css=[eo,Ht,hn];mt.shadowRootOptions={...Ct.shadowRootOptions,delegatesFocus:!0};h([st('input[type="checkbox"]')],mt.prototype,"input",2);h([w()],mt.prototype,"title",2);h([w({reflect:!0})],mt.prototype,"name",2);h([w({reflect:!0})],mt.prototype,"value",1);h([w({reflect:!0})],mt.prototype,"size",2);h([W("size")],mt.prototype,"handleSizeChange",1);h([w({type:Boolean})],mt.prototype,"disabled",2);h([w({type:Boolean,reflect:!0})],mt.prototype,"indeterminate",2);h([w({type:Boolean,attribute:!1})],mt.prototype,"checked",1);h([w({type:Boolean,reflect:!0,attribute:"checked"})],mt.prototype,"defaultChecked",2);h([w({type:Boolean,reflect:!0})],mt.prototype,"required",2);h([w()],mt.prototype,"hint",2);h([W(["checked","defaultChecked"])],mt.prototype,"handleDefaultCheckedChange",1);h([W(["checked","indeterminate"])],mt.prototype,"handleStateChange",1);h([W("disabled")],mt.prototype,"handleDisabledChange",1);mt=h([it("wa-checkbox")],mt);mt.disableWarning?.("change-in-update");var fn=j`
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
`;var mn="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";var gn=(t=21)=>{let e="",o=crypto.getRandomValues(new Uint8Array(t|=0));for(;t--;)e+=mn[o[t]&63];return e};function vn(t=""){return`${t}${gn()}`}var dt=class extends ct{constructor(){super(...arguments),this.placement="top",this.disabled=!1,this.distance=8,this.open=!1,this.skidding=0,this.showDelay=150,this.hideDelay=0,this.trigger="hover focus",this.withoutArrow=!1,this.for=null,this.anchor=null,this.eventController=new AbortController,this.handleBlur=()=>{this.hasTrigger("focus")&&this.hide()},this.handleClick=()=>{this.hasTrigger("click")&&(this.open?this.hide():this.show())},this.handleFocus=()=>{this.hasTrigger("focus")&&this.show()},this.handleDocumentKeyDown=t=>{t.key==="Escape"&&this.open&&Be(this)&&(t.preventDefault(),t.stopPropagation(),this.hide())},this.handleMouseOver=()=>{this.hasTrigger("hover")&&(clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.show(),this.showDelay))},this.handleMouseOut=()=>{if(this.hasTrigger("hover")){let t=!!this.anchor?.matches(":hover"),e=this.matches(":hover");if(t||e)return;clearTimeout(this.hoverTimeout),t||e||(this.hoverTimeout=window.setTimeout(()=>{this.hide()},this.hideDelay))}}}connectedCallback(){super.connectedCallback(),this.eventController.signal.aborted&&(this.eventController=new AbortController),this.addEventListener("mouseout",this.handleMouseOut),this.open&&(this.open=!1,this.updateComplete.then(()=>{this.open=!0})),this.id||(this.id=vn("wa-tooltip-")),this.for&&this.anchor?(this.anchor=null,this.handleForChange()):this.for&&this.handleForChange()}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",this.handleDocumentKeyDown),Te(this),this.eventController.abort(),this.anchor&&this.removeFromAriaLabelledBy(this.anchor,this.id)}firstUpdated(){this.body.hidden=!this.open,this.open&&(this.popup.active=!0,this.popup.reposition())}hasTrigger(t){return this.trigger.split(" ").includes(t)}addToAriaLabelledBy(t,e){let i=(t.getAttribute("aria-labelledby")||"").split(/\s+/).filter(Boolean);i.includes(e)||(i.push(e),t.setAttribute("aria-labelledby",i.join(" ")))}removeFromAriaLabelledBy(t,e){let n=(t.getAttribute("aria-labelledby")||"").split(/\s+/).filter(Boolean).filter(c=>c!==e);n.length>0?t.setAttribute("aria-labelledby",n.join(" ")):t.removeAttribute("aria-labelledby")}async handleOpenChange(){if(this.open){if(this.disabled)return;let t=new Xe;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1;return}document.addEventListener("keydown",this.handleDocumentKeyDown,{signal:this.eventController.signal}),Ge(this),this.body.hidden=!1,this.popup.active=!0,await Gt(this.popup.popup,"show-with-scale"),this.popup.reposition(),this.dispatchEvent(new Ze)}else{let t=new Je;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1;return}document.removeEventListener("keydown",this.handleDocumentKeyDown),Te(this),await Gt(this.popup.popup,"hide-with-scale"),this.popup.active=!1,this.body.hidden=!0,this.dispatchEvent(new Qe)}}handleForChange(){let t=this.getRootNode();if(!t)return;let e=this.for?t.getElementById(this.for):null,o=this.anchor;if(e===o)return;let{signal:i}=this.eventController;e&&(this.addToAriaLabelledBy(e,this.id),e.addEventListener("blur",this.handleBlur,{capture:!0,signal:i}),e.addEventListener("focus",this.handleFocus,{capture:!0,signal:i}),e.addEventListener("click",this.handleClick,{signal:i}),e.addEventListener("mouseover",this.handleMouseOver,{signal:i}),e.addEventListener("mouseout",this.handleMouseOut,{signal:i})),o&&(this.removeFromAriaLabelledBy(o,this.id),o.removeEventListener("blur",this.handleBlur,{capture:!0}),o.removeEventListener("focus",this.handleFocus,{capture:!0}),o.removeEventListener("click",this.handleClick),o.removeEventListener("mouseover",this.handleMouseOver),o.removeEventListener("mouseout",this.handleMouseOut)),this.anchor=e}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}handleDisabledChange(){this.disabled&&this.open&&this.hide()}async show(){if(!this.open)return this.open=!0,to(this,"wa-after-show")}async hide(){if(this.open)return this.open=!1,to(this,"wa-after-hide")}render(){return O`
      <wa-popup
        part="base"
        exportparts="
          popup:base__popup,
          arrow:base__arrow
        "
        class=${wt({tooltip:!0,"tooltip-open":this.open})}
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
    `}};dt.css=fn;dt.dependencies={"wa-popup":Z};h([st("slot:not([name])")],dt.prototype,"defaultSlot",2);h([st(".body")],dt.prototype,"body",2);h([st("wa-popup")],dt.prototype,"popup",2);h([w()],dt.prototype,"placement",2);h([w({type:Boolean,reflect:!0})],dt.prototype,"disabled",2);h([w({type:Number})],dt.prototype,"distance",2);h([w({type:Boolean,reflect:!0})],dt.prototype,"open",2);h([w({type:Number})],dt.prototype,"skidding",2);h([w({attribute:"show-delay",type:Number})],dt.prototype,"showDelay",2);h([w({attribute:"hide-delay",type:Number})],dt.prototype,"hideDelay",2);h([w()],dt.prototype,"trigger",2);h([w({attribute:"without-arrow",type:Boolean,reflect:!0})],dt.prototype,"withoutArrow",2);h([w()],dt.prototype,"for",2);h([zt()],dt.prototype,"anchor",2);h([W("open",{waitUntilFirstUpdate:!0})],dt.prototype,"handleOpenChange",1);h([W("for")],dt.prototype,"handleForChange",1);h([W(["distance","placement","skidding"])],dt.prototype,"handleOptionsChange",1);h([W("disabled")],dt.prototype,"handleDisabledChange",1);dt=h([it("wa-tooltip")],dt);var $n=gs(wn());var bn=(t,e,o)=>{let i=new Map;for(let n=e;n<=o;n++)i.set(t[n],n);return i},Ce=be(class extends re{constructor(t){if(super(t),t.type!==Dt.CHILD)throw Error("repeat() can only be used in text expressions")}dt(t,e,o){let i;o===void 0?o=e:e!==void 0&&(i=e);let n=[],c=[],d=0;for(let m of t)n[d]=i?i(m,d):d,c[d]=o(m,d),d++;return{values:c,keys:n}}render(t,e,o){return this.dt(t,e,o).values}update(t,[e,o,i]){let n=ga(t),{values:c,keys:d}=this.dt(e,o,i);if(!Array.isArray(n))return this.ut=d,c;let m=this.ut??=[],v=[],y,C,b=0,S=n.length-1,k=0,$=c.length-1;for(;b<=S&&k<=$;)if(n[b]===null)b++;else if(n[S]===null)S--;else if(m[b]===d[k])v[k]=ye(n[b],c[k]),b++,k++;else if(m[S]===d[$])v[$]=ye(n[S],c[$]),S--,$--;else if(m[b]===d[$])v[$]=ye(n[b],c[$]),Ke(t,v[$+1],n[b]),b++,$--;else if(m[S]===d[k])v[k]=ye(n[S],c[k]),Ke(t,n[b],n[S]),S--,k++;else if(y===void 0&&(y=bn(d,k,$),C=bn(m,b,S)),y.has(m[b]))if(y.has(m[S])){let I=C.get(d[k]),D=I!==void 0?n[I]:null;if(D===null){let M=Ke(t,n[b]);ye(M,c[k]),v[k]=M}else v[k]=ye(D,c[k]),Ke(t,n[b],D),n[I]=null;k++}else Jo(n[S]),S--;else Jo(n[b]),b++;for(;k<=$;){let I=Ke(t,v[$+1]);ye(I,c[k]),v[k++]=I}for(;b<=S;){let I=n[b++];I!==null&&Jo(I)}return this.ut=d,Xo(t,v),xt}});var xl=[{id:"account",label:"Conta",sortable:!0},{id:"pattern",label:"Padr\xE3o",sortable:!0},{id:"replacement",label:"Substitui\xE7\xE3o",sortable:!0},{id:"category",label:"Categoria",sortable:!0},{id:"memo",label:"Memo",sortable:!0},{id:"actions",label:"A\xE7\xF5es",sortable:!1}],Zr=class extends Tt{static properties={rules:{type:Array},accounts:{type:Array},sortCol:{type:String},sortDir:{type:String},page:{type:Number},pageSize:{type:Number}};createRenderRoot(){return this}constructor(){super(),this.rules=[],this.accounts=[],this.sortCol="pattern",this.sortDir="asc",this.page=1,this.pageSize=20}emit(e,o={}){this.dispatchEvent(new CustomEvent(e,{detail:o,bubbles:!0,composed:!0}))}accountName(e){let o=this.accounts.find(i=>i.id===e);return o?o.id===0?"Todas":o.name.charAt(0).toUpperCase()+o.name.slice(1):""}get sorted(){let e=[...this.rules];return e.sort((o,i)=>{let n=String(this._valueFor(o,this.sortCol)).toLowerCase(),c=String(this._valueFor(i,this.sortCol)).toLowerCase();return n<c?this.sortDir==="asc"?-1:1:n>c?this.sortDir==="asc"?1:-1:0}),e}_valueFor(e,o){switch(o){case"account":return this.accountName(e.accountId);case"pattern":return e.pattern||"";case"replacement":return e.replacement||"";case"category":return e._categoryName||"";case"memo":return e.memoTemplate||"";default:return""}}get paginated(){let e=this.sorted,o=(this.page-1)*this.pageSize;return e.slice(o,o+this.pageSize)}get totalPages(){return Math.max(1,Math.ceil(this.rules.length/this.pageSize))}onSort(e){e.sortable&&(this.sortCol===e.id?this.emit("sort-change",{col:e.id,dir:this.sortDir==="asc"?"desc":"asc"}):this.emit("sort-change",{col:e.id,dir:"asc"}))}onPageClick(e){e<1||e>this.totalPages||e===this.page||this.emit("page-change",{page:e})}sortIcon(e){return this.sortCol!==e?"\u2195":this.sortDir==="asc"?"\u2191":"\u2193"}renderPagination(){let e=this.totalPages;if(e<=1)return N;let o=this.page,i=5,n=Math.max(1,o-Math.floor(i/2)),c=Math.min(e,n+i-1);c-n+1<i&&(n=Math.max(1,c-i+1));let d=[];n>1&&(d.push(1),n>2&&d.push("\u2026"));for(let m=n;m<=c;m++)d.push(m);return c<e&&(c<e-1&&d.push("\u2026"),d.push(e)),O`
            <nav class="mr-pagination" aria-label="Paginação">
                <button class="mr-page-btn" ?disabled=${o===1} @click=${()=>this.onPageClick(o-1)}>‹</button>
                ${d.map(m=>m==="\u2026"?O`<span class="mr-page-ellipsis">…</span>`:O`<button class="mr-page-btn ${m===o?"is-active":""}" @click=${()=>this.onPageClick(m)}>${m}</button>`)}
                <button class="mr-page-btn" ?disabled=${o===e} @click=${()=>this.onPageClick(o+1)}>›</button>
            </nav>
        `}render(){if(this.rules.length===0)return O`<div class="mr-empty">Nenhuma regra para mostrar.</div>`;let e=this.paginated;return O`
            <div class="mr-table-wrap">
                <table class="mr-table">
                    <thead>
                        <tr>
                            ${xl.map(o=>O`
                                <th class="mr-th mr-th-${o.id} ${o.sortable?"is-sortable":""} ${this.sortCol===o.id?"is-active":""}"
                                    @click=${()=>this.onSort(o)}>
                                    <span>${o.label}</span>
                                    ${o.sortable?O`<span class="mr-sort">${this.sortIcon(o.id)}</span>`:N}
                                </th>
                            `)}
                        </tr>
                    </thead>
                    <tbody>
                        ${Ce(e,o=>o.id,o=>O`
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
        `}};customElements.define("manage-rules-table",Zr);var ti=class extends Tt{static properties={items:{type:Array},emptyText:{type:String}};createRenderRoot(){return this}constructor(){super(),this.items=[],this.emptyText="Nada cadastrado."}emit(e,o={}){this.dispatchEvent(new CustomEvent(e,{detail:o,bubbles:!0,composed:!0}))}render(){return this.items.length?O`
            <div class="chip-grid">
                ${Ce(this.items,e=>e.key,e=>O`
                    <div class="chip ${e.locked?"is-locked":""}" title=${e.tooltip||""}>
                        <span class="chip-label">${e.label}</span>
                        ${e.locked?O`<span class="chip-lock" title="Pré-definido">●</span>`:O`<button class="chip-remove"
                                           title="Remover"
                                           @click=${()=>this.emit("chip-remove",{key:e.key})}>×</button>`}
                    </div>
                `)}
            </div>
        `:O`<div class="chip-empty">${this.emptyText}</div>`}};customElements.define("chip-list",ti);var Cl="__hidden__",dr="__local_ungrouped__";function yn(t){let e=String(t||"").trim();if(!e)return{group:"",leaf:"",original:e};let o=e.indexOf(":");return o===-1?{group:"",leaf:e,original:e}:{group:e.slice(0,o).trim(),leaf:e.slice(o+1).trim()||e,original:e}}var ei=class extends Tt{static properties={cache:{type:Object},localCategories:{type:Array},rulesByCategoryId:{type:Object},connected:{type:Boolean},budgetId:{type:String},syncing:{type:Boolean,reflect:!0},collapsed:{type:Object,state:!0},editing:{type:Object,state:!0}};createRenderRoot(){return this}constructor(){super(),this.cache=null,this.localCategories=[],this.rulesByCategoryId={},this.connected=!1,this.budgetId="",this.syncing=!1,this.collapsed={},this.editing=null}beginEditCategory(e){this.editing={kind:"cat",key:e.original,value:e.name},this.updateComplete.then(()=>this.focusEditInput())}beginEditGroup(e){e&&(this.editing={kind:"group",key:e,value:e},this.updateComplete.then(()=>this.focusEditInput()))}beginAddInGroup(e){this.editing={kind:"add",key:e,value:""},this.updateComplete.then(()=>{this.focusEditInput(),this._outsideClickHandler=o=>{let i=this.querySelector(".ct-popover"),n=this.querySelector(`.ct-group-add-btn[data-group="${CSS.escape(e)}"]`);i&&!i.contains(o.target)&&n!==o.target&&!n?.contains(o.target)&&this.commitEdit(!1)},setTimeout(()=>document.addEventListener("mousedown",this._outsideClickHandler),0)})}focusEditInput(){let e=this.querySelector(".ct-edit-input, .ct-popover-input");e&&(e.focus(),e.select())}onEditInput(e){this.editing&&(this.editing={...this.editing,value:e.target.value})}onEditKey(e){e.key==="Enter"?(e.preventDefault(),this.commitEdit(!0)):e.key==="Escape"&&(e.preventDefault(),this.commitEdit(!1))}commitEdit(e){let o=this.editing;if(this.editing=null,this._outsideClickHandler&&(document.removeEventListener("mousedown",this._outsideClickHandler),this._outsideClickHandler=null),!e||!o)return;let i=String(o.value||"").trim();if(i){if(o.kind==="cat"){let n=yn(o.key),c=n.group?`${n.group}: ${i}`:i;if(c.toLowerCase()===o.key.toLowerCase())return;this.emit("category-rename",{oldName:o.key,newName:c})}else if(o.kind==="group"){if(i.toLowerCase()===o.key.toLowerCase())return;this.emit("group-rename",{oldGroup:o.key,newGroup:i})}else if(o.kind==="add"){let n=`${o.key}: ${i}`;this.emit("category-add",{fullName:n})}}}disconnectedCallback(){super.disconnectedCallback(),this._outsideClickHandler&&(document.removeEventListener("mousedown",this._outsideClickHandler),this._outsideClickHandler=null)}emit(e,o={}){this.dispatchEvent(new CustomEvent(e,{detail:o,bubbles:!0,composed:!0}))}onSync(){this.syncing||this.emit("category-sync")}onToggleGroup(e){this.collapsed={...this.collapsed,[e]:!this.collapsed[e]}}formatRelativeTime(e){if(!e)return"nunca";let o=Date.now()-e;if(o<6e4)return"agora h\xE1 pouco";let i=Math.floor(o/6e4);if(i<60)return`${i} min atr\xE1s`;let n=Math.floor(i/60);if(n<24)return`${n} h atr\xE1s`;let c=Math.floor(n/24);return`${c} dia${c===1?"":"s"} atr\xE1s`}renderStatusBar(){if(!this.connected&&!this.budgetId)return O`
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
            `;let e=Object.keys(this.cache.byId||{}).length;return O`
            <div class="ct-status ct-status-synced">
                <div class="ct-status-text">
                    <strong>Sincronizado com YNAB</strong> · ${e} categoria${e===1?"":"s"}
                    <span class="ct-status-meta">Última sync ${this.formatRelativeTime(this.cache.syncedAt)}</span>
                </div>
                <wa-button appearance="outlined" size="small" @click=${this.onSync} ?loading=${this.syncing}>
                    Sincronizar agora
                </wa-button>
            </div>
        `}onRemoveLocal(e,o){confirm(`Remover a categoria "${o}"?`)&&this.emit("chip-remove",{key:e})}renderCategoryRow(e,o={}){let i=o.rulesKeyByOriginal?e.original||e.name:e.id,n=this.rulesByCategoryId[i]||this.rulesByCategoryId[e.name]||0,c=!!o.orphan,d=!!o.removable,m=e.original||e.name,v=d&&this.editing?.kind==="cat"&&this.editing.key===m;return O`
            <div class="ct-category ${c?"is-orphan":""}" title=${d?'Duplo-clique para renomear \xB7 "\xD7" para remover':"Para renomear, edite no YNAB e sincronize."}>
                ${v?O`<input class="ct-edit-input ct-edit-input-leaf"
                                  .value=${this.editing.value}
                                  @input=${this.onEditInput}
                                  @keydown=${this.onEditKey}
                                  @blur=${()=>this.commitEdit(!0)}>`:O`<span class="ct-category-name"
                                 @dblclick=${d?C=>{C.stopPropagation(),this.beginEditCategory(e)}:null}>${e.name}</span>`}
                ${o.badge?O`<span class="ct-category-badge">${o.badge}</span>`:N}
                ${n>0?O`<span class="ct-category-count">${n} regra${n===1?"":"s"}</span>`:N}
                ${d&&!v?O`<button type="button" class="ct-category-remove" title="Remover"
                                   @click=${()=>this.onRemoveLocal(m,m)}>×</button>`:N}
            </div>
        `}renderGroup(e,o,i,n={}){let c=!!this.collapsed[e],d=c?"\u25B8":"\u25BE",m=i.length,v=n.tone==="is-local",y=!!n.removable,C=v?o:null,b=y&&this.editing?.kind==="group"&&this.editing.key===C,S=y&&this.editing?.kind==="add"&&this.editing.key===C;return O`
            <div class="ct-group ${n.tone||""}">
                <div class="ct-group-head-row"
                     role="button"
                     tabindex="0"
                     @click=${()=>this.onToggleGroup(e)}
                     @keydown=${k=>{(k.key==="Enter"||k.key===" ")&&(k.preventDefault(),this.onToggleGroup(e))}}>
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
                        ${Ce(i,k=>k.id,k=>this.renderCategoryRow(k,n))}
                    </div>
                `}
            </div>
        `}renderAddPopover(e){return O`
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
        `}render(){let e=this.cache?.categoryGroups||[],o=this.cache?.byId||{},i=[],n=[];for(let b of e){let S=b.categories.filter($=>!$.hidden&&!b.hidden),k=b.categories.filter($=>$.hidden||b.hidden);S.length>0&&i.push({id:b.id,name:b.name,categories:S}),n.push(...k)}let c=new Set;for(let b in o)c.add(String(o[b].name).toLowerCase());let d=(this.localCategories||[]).filter(b=>o[b.id]?!1:!c.has(String(b.name).toLowerCase())),m=new Map;for(let b of d){let S=yn(b.name),k=S.group||dr;m.has(k)||m.set(k,[]),m.get(k).push({id:b.id,name:S.leaf,original:S.original})}let v=Array.from(m.entries()).sort((b,S)=>b[0]===dr?1:S[0]===dr?-1:b[0].localeCompare(S[0])),y=v.length>0,C=i.length>0||n.length>0;return O`
            <div class="ct-host">
                ${this.renderStatusBar()}
                <div class="ct-groups">
                    ${Ce(i,b=>b.id,b=>this.renderGroup(b.id,b.name,b.categories))}
                    ${n.length>0?this.renderGroup(Cl,"Ocultas no YNAB",n,{tone:"is-muted"}):N}
                    ${y?Ce(v,([b])=>`local-${b}`,([b,S])=>{let k=b===dr?"Sem grupo":b;return this.renderGroup(`local-${b}`,k,S,{tone:"is-local",removable:!0,rulesKeyByOriginal:!0})}):N}
                    ${!C&&!y?O`<div class="ct-empty">Nada por aqui ainda. Adicione uma categoria pelo formulário acima ou sincronize com o YNAB.</div>`:N}
                </div>
            </div>
        `}};customElements.define("category-tree",ei);var ve=typeof browser<"u"?browser.runtime:chrome.runtime,xn=typeof browser<"u"?browser.storage:chrome.storage,E={rules:[],accounts:[],categories:[],editingRuleId:null,sortCol:"pattern",sortDir:"asc",page:1,pageSize:20,searchTerm:"",activeTab:"rules",ynabConfig:null,ynabBudgets:[],ynabAccounts:[],ynabCategoriesCache:null,categoriesSyncing:!1},g={},se=null,Nt=null,oi=null;document.addEventListener("DOMContentLoaded",kl);async function kl(){Ll(),await StorageManager.init(),Sl(),await _l(),await mr(),await ke(),await le(),Al(),Yl(),Cn(),window.addEventListener("hashchange",Cn)}async function _l(){try{let t=await ve.sendMessage({type:"YNAB_GET_CONFIG"});t?.ok&&(E.ynabConfig=t.config)}catch{}}function Ll(){g.railItems=Array.from(document.querySelectorAll(".rail-item[data-section]")),g.tabs={rules:document.getElementById("tab-rules"),categories:document.getElementById("tab-categories"),accounts:document.getElementById("tab-accounts"),ynab:document.getElementById("tab-ynab")},g.counts={rules:document.querySelector('[data-count="rules"]'),categories:document.querySelector('[data-count="categories"]'),accounts:document.querySelector('[data-count="accounts"]')},g.btnExport=document.getElementById("btn-export"),g.btnImport=document.getElementById("btn-import"),g.importFile=document.getElementById("import-file"),g.rulesTable=document.getElementById("rules-table"),g.rulesSearch=document.getElementById("rules-search"),g.rulesFooter=document.getElementById("rules-footer-info"),g.ruleDialog=document.getElementById("rule-dialog"),g.openRuleDialogBtn=document.getElementById("open-rule-dialog-btn"),g.addRuleForm=document.getElementById("add-rule-form"),g.ruleAccount=document.getElementById("rule-account"),g.ruleCategory=document.getElementById("rule-category"),g.rulePattern=document.getElementById("rule-pattern"),g.ruleReplacement=document.getElementById("rule-replacement"),g.ruleMemo=document.getElementById("rule-memo"),g.ruleRegex=document.getElementById("rule-regex"),g.memoField=document.getElementById("memo-field"),g.ruleFormHint=document.getElementById("rule-form-hint"),g.submitBtn=document.getElementById("submit-btn"),g.cancelBtn=document.getElementById("cancel-btn"),g.categoriesTree=document.getElementById("categories-tree"),g.categoriesToolbarFallback=document.getElementById("categories-toolbar-fallback"),g.addCategoryForm=document.getElementById("add-category-form"),g.categoryName=document.getElementById("category-name"),g.categoriesFooter=document.getElementById("categories-footer-info"),g.accountsList=document.getElementById("accounts-list"),g.addAccountForm=document.getElementById("add-account-form"),g.accountName=document.getElementById("account-name"),g.accountsFooter=document.getElementById("accounts-footer-info"),g.ynabStatusIcon=document.getElementById("ynab-status-icon"),g.ynabSetupCard=document.getElementById("ynab-setup-card"),g.ynabConnectCard=document.getElementById("ynab-connect-card"),g.ynabBudgetCard=document.getElementById("ynab-budget-card"),g.ynabMappingCard=document.getElementById("ynab-mapping-card"),g.ynabStatus=document.getElementById("ynab-status"),g.ynabConnectBtn=document.getElementById("ynab-connect-btn"),g.ynabDisconnectBtn=document.getElementById("ynab-disconnect-btn"),g.ynabRedirectInput=document.getElementById("ynab-redirect-uri"),g.ynabCopyRedirect=document.getElementById("ynab-copy-redirect"),g.ynabBudgetSelect=document.getElementById("ynab-budget-select"),g.ynabMappingRows=document.getElementById("ynab-mapping-rows"),g.ynabSaveMappingBtn=document.getElementById("ynab-save-mapping-btn"),g.ynabFooter=document.getElementById("ynab-footer-info"),g.toast=document.getElementById("toast"),g.toastMsg=document.getElementById("toast-msg")}function Sl(){try{let t=chrome.runtime.getManifest(),e=document.querySelector(".version");e&&t.version&&(e.textContent=`v${t.version}`)}catch{}}function Al(){g.railItems.forEach(t=>{t.addEventListener("click",e=>{e.preventDefault();let o=t.dataset.section;location.hash=`#tab-${o}`})}),g.btnExport.addEventListener("click",async()=>{try{await StorageManager.exportData(),H("Exporta\xE7\xE3o iniciada.","success")}catch(t){H(`Falha ao exportar: ${t.message||t}`,"danger")}}),g.btnImport.addEventListener("click",()=>g.importFile.click()),g.importFile.addEventListener("change",async t=>{let e=t.target.files&&t.target.files[0];if(e){if(!confirm("Importar substituir\xE1 regras, categorias e contas atuais. Deseja continuar?")){t.target.value="";return}try{await StorageManager.importData(e),H("Importa\xE7\xE3o conclu\xEDda.","success"),await mr(),await ke(),await le(),ii(),ai()}catch(o){H(`Falha ao importar: ${o.message||o}`,"danger")}finally{t.target.value=""}}}),g.openRuleDialogBtn.addEventListener("click",()=>_n()),g.submitBtn.addEventListener("click",kn),g.cancelBtn.addEventListener("click",()=>Ln()),g.addRuleForm.addEventListener("submit",t=>{t.preventDefault(),kn()}),g.ruleRegex.addEventListener("change",t=>{g.memoField.hidden=!t.target.checked}),g.rulesSearch.addEventListener("input",t=>{E.searchTerm=t.target.value.toLowerCase(),E.page=1,ur()}),g.rulesTable.addEventListener("sort-change",t=>{E.sortCol=t.detail.col,E.sortDir=t.detail.dir,ur()}),g.rulesTable.addEventListener("page-change",t=>{E.page=t.detail.page,ur()}),g.rulesTable.addEventListener("rule-edit",t=>Il(t.detail.rule)),g.rulesTable.addEventListener("rule-toggle",t=>Tl(t.detail.id)),g.rulesTable.addEventListener("rule-remove",t=>Fl(t.detail.id)),g.addCategoryForm.addEventListener("submit",t=>{t.preventDefault(),Dl()}),g.categoriesTree.addEventListener("chip-remove",t=>Nl(t.detail.key)),g.categoriesTree.addEventListener("category-sync",()=>Pl()),g.categoriesTree.addEventListener("category-rename",t=>ql(t.detail.oldName,t.detail.newName)),g.categoriesTree.addEventListener("group-rename",t=>Vl(t.detail.oldGroup,t.detail.newGroup)),g.categoriesTree.addEventListener("category-add",t=>Ul(t.detail.fullName)),xn?.onChanged?.addListener&&xn.onChanged.addListener((t,e)=>{e==="local"&&(t.ynab_categories&&StorageManager.getYnabCategoriesCache().then(o=>{E.ynabCategoriesCache=o,no()}),t.ynab_config&&ve.sendMessage({type:"YNAB_GET_CONFIG"}).then(o=>{o?.ok&&(E.ynabConfig=o.config,ni(),no())}),t.payee_rules&&le())}),g.addAccountForm.addEventListener("submit",t=>{t.preventDefault(),jl()}),g.accountsList.addEventListener("chip-remove",t=>Wl(parseInt(t.detail.key,10))),Kl()}var El={"#tab-rules":"rules","#tab-categories":"categories","#tab-accounts":"accounts","#tab-ynab":"ynab"};function Cn(){let t=El[(location.hash||"").toLowerCase()]||"rules";$l(t)}function $l(t){E.activeTab=t,Object.entries(g.tabs).forEach(([e,o])=>o.classList.toggle("is-active",e===t)),g.railItems.forEach(e=>e.classList.toggle("is-active",e.dataset.section===t)),t==="ynab"&&Gl()}function hr(){g.counts.rules&&(g.counts.rules.textContent=String(E.rules.length)),g.counts.categories&&(g.counts.categories.textContent=String(E.categories.length)),g.counts.accounts&&(g.counts.accounts.textContent=String(E.accounts.length))}async function le(){let[t,e,o]=await Promise.all([StorageManager.getPayeeRules(),StorageManager.getAccounts(),StorageManager.getCategories()]);E.accounts=e,E.categories=o;let i=new Map(o.map(c=>[c.id,c.name])),n=E.ynabCategoriesCache?.byId||{};E.rules=t.map(c=>({...c,_categoryName:Ol(c,n,i)})),hr(),ur()}function Ol(t,e,o){return t?t.categoryId&&e[t.categoryId]?e[t.categoryId].name:t._orphanCategory&&t.categoryId&&!e[t.categoryId]&&Object.keys(e).length>0?`${t.category||"(removida no YNAB)"}`:t.categoryId&&o.has(t.categoryId)?o.get(t.categoryId):t.category||"":""}function zl(){let t=E.searchTerm.trim().toLowerCase();return t?E.rules.filter(e=>{let o=E.accounts.find(c=>c.id===e.accountId);return[o?o.id===0?"Todas":o.name:"",e.pattern,e.replacement,e._categoryName,e.memoTemplate].map(c=>String(c||"").toLowerCase()).join(" ").includes(t)}):E.rules}function ur(){let t=zl();g.rulesTable.rules=t,g.rulesTable.accounts=E.accounts,g.rulesTable.sortCol=E.sortCol,g.rulesTable.sortDir=E.sortDir,g.rulesTable.page=E.page,g.rulesTable.pageSize=E.pageSize,g.rulesTable.requestUpdate();let e=t.length,o=E.rules.length;g.rulesFooter.textContent=e===o?`${e} regra${e===1?"":"s"}`:`${e} de ${o} regras (filtradas)`}function _n(t=null){t?(E.editingRuleId=t.id,g.ruleDialog.setAttribute("label","Editar regra"),g.ruleFormHint.textContent=t.pattern?`Editando: ${t.pattern}`:"",g.submitBtn.textContent="Salvar altera\xE7\xF5es",se&&se.setValue(String(t.accountId),!0),g.rulePattern.value=t.pattern||"",g.ruleReplacement.value=t.replacement||"",Nt&&(t._categoryName?(Nt.options[t._categoryName]||Nt.addOption({value:t._categoryName,text:t._categoryName}),Nt.setValue(t._categoryName,!0)):Nt.clear(!0)),g.ruleRegex.checked=!!t.isRegex,g.ruleMemo.value=t.memoTemplate||"",g.memoField.hidden=!t.isRegex):(Sn(),g.ruleDialog.setAttribute("label","Nova regra"),g.submitBtn.textContent="Adicionar regra"),g.ruleDialog.open=!0}function Ln(){g.ruleDialog.open=!1,Sn()}function Sn(){E.editingRuleId=null,se&&se.clear(!0),Nt&&Nt.clear(!0),g.rulePattern.value="",g.ruleReplacement.value="",g.ruleMemo.value="",g.ruleRegex.checked=!1,g.memoField.hidden=!0,g.ruleFormHint.textContent=""}async function kn(){let t=se?se.getValue():g.ruleAccount.value,e=t===""?NaN:parseInt(t,10);if(Number.isNaN(e)){H("Conta \xE9 obrigat\xF3ria.","danger");return}let o=g.rulePattern.value.trim();if(!o){H("Padr\xE3o \xE9 obrigat\xF3rio.","danger");return}let i=g.ruleRegex.checked;if(i)try{new RegExp(o)}catch{H("Regex inv\xE1lida.","danger");return}let n=Nt?(Nt.getValue()||"").trim():g.ruleCategory.value.trim(),c=E.categories.find(v=>v.name.toLowerCase()===n.toLowerCase()),d=c?String(c.id):"",m={accountId:e,pattern:o,replacement:g.ruleReplacement.value.trim(),categoryId:d,category:n,isRegex:i,memoTemplate:i?g.ruleMemo.value.trim():""};if(E.editingRuleId){let v=await StorageManager.getPayeeRules(),y=v.findIndex(C=>C.id===E.editingRuleId);y!==-1&&(v[y]={...v[y],...m},await StorageManager.setPayeeRules(v)),H("Regra atualizada.","success")}else await StorageManager.addPayeeRule(m),H("Regra criada.","success");Ln(),E.page=1,await le()}function Il(t){_n(t)}async function Fl(t){if(!confirm("Remover esta regra?"))return;await StorageManager.removePayeeRule(t);let e=await StorageManager.getPayeeRules(),o=Math.max(1,Math.ceil(e.length/E.pageSize));E.page>o&&(E.page=o),await le()}async function Tl(t){let o=(await StorageManager.getPayeeRules()).find(i=>i.id===t);o&&(await StorageManager.updatePayeeRule(t,{enabled:o.enabled===!1}),await le())}async function ke(){E.categories=await StorageManager.getCategories(),E.ynabCategoriesCache=await StorageManager.getYnabCategoriesCache(),no(),hr(),ai()}function fr(){return!!E.ynabConfig?.connected}function Bl(){return fr()&&!!E.ynabConfig?.budgetId}function no(){g.categoriesTree&&(g.categoriesTree.hidden=!1,g.categoriesTree.connected=Bl(),g.categoriesTree.budgetId=E.ynabConfig?.budgetId||"",g.categoriesTree.cache=E.ynabCategoriesCache,g.categoriesTree.localCategories=E.categories,g.categoriesTree.rulesByCategoryId=Ml(),g.categoriesTree.syncing=E.categoriesSyncing,g.categoriesTree.requestUpdate());let t=!!E.ynabCategoriesCache;g.categoriesToolbarFallback&&(g.categoriesToolbarFallback.hidden=t);let e=Object.keys(E.ynabCategoriesCache?.byId||{}).length;if(e>0){let o=Rl();g.categoriesFooter.textContent=`${e} no YNAB${o?` \xB7 ${o} locais sem correspond\xEAncia`:""}`}else fr()?g.categoriesFooter.textContent="YNAB conectado \xB7 sincronize pra carregar as categorias.":g.categoriesFooter.textContent=`${E.categories.length} categoria${E.categories.length===1?"":"s"} local${E.categories.length===1?"":"is"} \xB7 sem YNAB`}function Ml(){let t={};for(let e of E.rules||[]){let o=e.categoryId||e.category||"";o&&(t[o]=(t[o]||0)+1)}return t}function Rl(){let t=E.ynabCategoriesCache;if(!t)return 0;let e=t.byId||{},o=new Set(Object.values(e).map(i=>String(i.name).toLowerCase()));return(E.categories||[]).filter(i=>e[i.id]?!1:!o.has(String(i.name).toLowerCase())).length}async function Pl(){if(!E.categoriesSyncing){if(!fr()){H("Conecte-se ao YNAB antes de sincronizar.","warn");return}E.categoriesSyncing=!0,no();try{let t=await ve.sendMessage({type:"YNAB_LIST_CATEGORIES"});if(!t?.ok){H(t?.error||"Falha ao sincronizar categorias.","danger");return}await ke(),await le();let{totalCategories:e,hiddenCount:o,migration:i}=t,n=[`${e} categoria${e===1?"":"s"}`];o&&n.push(`${o} oculta${o===1?"":"s"}`),i?.migrated&&n.push(`${i.migrated} regra${i.migrated===1?"":"s"} migrada${i.migrated===1?"":"s"}`),i?.orphan&&n.push(`${i.orphan} \xF3rf\xE3${i.orphan===1?"":"s"}`),H(`Sincronizado \xB7 ${n.join(" \xB7 ")}`,"success")}catch(t){H(`Falha ao sincronizar: ${t.message||t}`,"danger")}finally{E.categoriesSyncing=!1,no()}}}async function Dl(){let t=g.categoryName.value.trim();if(t){if(E.categories.some(e=>e.name.toLowerCase()===t.toLowerCase())){H("Categoria j\xE1 existe.","warn");return}await StorageManager.setCategories(E.categories.concat([{name:t}])),g.categoryName.value="",await ke(),H(`Categoria "${t}" adicionada.`,"success")}}async function Nl(t){confirm(`Remover categoria "${t}"?`)&&(await StorageManager.setCategories(E.categories.filter(e=>e.name!==t)),await le(),await ke())}async function ql(t,e){try{let o=await StorageManager.renameLocalCategory(t,e);await le(),await ke();let i=o.changed>0?` \xB7 ${o.changed} regra${o.changed===1?"":"s"} atualizada${o.changed===1?"":"s"}`:"";H(`Categoria renomeada${i}.`,"success")}catch(o){H(o.message||"Falha ao renomear.","danger")}}async function Vl(t,e){try{let o=await StorageManager.renameLocalCategoryGroup(t,e);await le(),await ke(),H(`Grupo renomeado \xB7 ${o.categoryChanged} categoria${o.categoryChanged===1?"":"s"} \xB7 ${o.rulesChanged} regra${o.rulesChanged===1?"":"s"}.`,"success")}catch(o){H(o.message||"Falha ao renomear grupo.","danger")}}async function Ul(t){let e=String(t||"").trim();if(e){if(E.categories.some(o=>o.name.toLowerCase()===e.toLowerCase())){H(`Categoria "${e}" j\xE1 existe.`,"warn");return}await StorageManager.setCategories(E.categories.concat([{name:e}])),await ke(),H(`Categoria "${e}" adicionada.`,"success")}}async function mr(){E.accounts=await StorageManager.getAccounts(),Hl(),hr(),ii()}function Hl(){g.accountsList.items=E.accounts.map(t=>({key:String(t.id),label:t.id===0?"Todas as contas (coringa)":t.name,locked:t.id>=0&&t.id<=3,tooltip:t.id>=0&&t.id<=3?"Conta pr\xE9-definida \u2014 n\xE3o pode ser removida":""})),g.accountsList.emptyText="Nenhuma conta cadastrada.",g.accountsList.requestUpdate(),g.accountsFooter.textContent=`${E.accounts.length} conta${E.accounts.length===1?"":"s"}`}async function jl(){let t=g.accountName.value.trim();if(t){if(E.accounts.some(e=>e.name.toLowerCase()===t.toLowerCase())){H("Conta j\xE1 existe.","warn");return}await StorageManager.addAccount({name:t}),g.accountName.value="",await mr(),H(`Conta "${t}" adicionada.`,"success")}}async function Wl(t){let e=E.accounts.find(o=>o.id===t);e&&confirm(`Remover conta "${e.name}"?`)&&(await StorageManager.removeAccount(t),await mr())}function Yl(){let{TomSelect:t}=window.__manageDeps||{};t&&(ii(),ai())}function ii(){let{TomSelect:t}=window.__manageDeps||{};!t||!g.ruleAccount||(se&&(se.destroy(),se=null),g.ruleAccount.innerHTML='<option value="">Selecione\u2026</option>',E.accounts.forEach(e=>{let o=document.createElement("option");o.value=String(e.id),o.textContent=e.id===0?"Todas as contas":e.name,g.ruleAccount.appendChild(o)}),se=new t(g.ruleAccount,{create:!1,maxItems:1,sortField:{field:"text",direction:"asc"}}))}function ai(){let{TomSelect:t}=window.__manageDeps||{};if(!t||!g.ruleCategory)return;Nt&&(Nt.destroy(),Nt=null);let e=fr()&&E.ynabCategoriesCache;if(g.ruleCategory.innerHTML='<option value="">Opcional</option>',e){let o=E.ynabCategoriesCache.categoryGroups||[];for(let i of o){let n=document.createElement("optgroup");n.label=i.name;for(let c of i.categories){if(c.hidden)continue;let d=document.createElement("option");d.value=c.name,d.textContent=c.name,d.dataset.uuid=c.id,n.appendChild(d)}g.ruleCategory.appendChild(n)}}else E.categories.forEach(o=>{let i=document.createElement("option");i.value=o.name,i.textContent=o.name,g.ruleCategory.appendChild(i)});Nt=new t(g.ruleCategory,{create:!e,createOnBlur:!e,persist:!1,maxItems:1,optgroupField:"optgroup",sortField:{field:"text",direction:"asc"},onItemAdd:async o=>{if(e)return;let i=String(o||"").trim();i&&(E.categories.some(n=>n.name.toLowerCase()===i.toLowerCase())||(await StorageManager.setCategories(E.categories.concat([{name:i}])),E.categories=await StorageManager.getCategories(),no(),hr(),H(`Categoria "${i}" adicionada.`,"success")))}})}function Kl(){g.ynabCopyRedirect.addEventListener("click",async()=>{try{await navigator.clipboard?.writeText(g.ynabRedirectInput.value),H("Redirect URI copiada.","success")}catch{H("Selecione e copie manualmente (Ctrl+C).","warn")}}),g.ynabConnectBtn.addEventListener("click",async()=>{if(!E.ynabConfig?.clientId){H("Configure ynab-config.js antes de conectar.","warn");return}H("Abrindo popup de autentica\xE7\xE3o YNAB\u2026");let t=await ve.sendMessage({type:"YNAB_CONNECT"});if(!t?.ok){H(t?.error||"Falha ao conectar.","danger");return}E.ynabConfig=t.config,H("Conectado.","success"),await ri(),await An()}),g.ynabDisconnectBtn.addEventListener("click",async()=>{let t=await ve.sendMessage({type:"YNAB_DISCONNECT"});if(!t?.ok){H(t?.error||"Falha ao desconectar.","danger");return}E.ynabConfig=t.config,E.ynabBudgets=[],E.ynabAccounts=[],H("Desconectado.","success"),ri(),g.ynabBudgetCard.hidden=!0,g.ynabMappingCard.hidden=!0}),g.ynabBudgetSelect.addEventListener("change",async t=>{let e=t.target.value;e&&await En(e)}),g.ynabSaveMappingBtn.addEventListener("click",async()=>{let t=g.ynabBudgetSelect.value,e={};document.querySelectorAll("[data-bank-group]").forEach(i=>{let n=i.dataset.bankGroup,c=[];i.querySelectorAll('input[type="checkbox"]:checked').forEach(d=>{c.push({id:d.value,name:d.dataset.accountName||""})}),c.length>0&&(e[n]=c)});let o=await ve.sendMessage({type:"YNAB_SAVE_MAPPING",budgetId:t,accountMap:e});if(!o?.ok){H(o?.error||"Falha ao salvar mapeamento.","danger");return}E.ynabConfig=o.config,ni(),H("Mapeamento salvo. A sidebar j\xE1 reflete a mudan\xE7a.","success")})}async function Gl(){await ri(),E.ynabConfig?.connected&&await An()}async function ri(){let t=await ve.sendMessage({type:"YNAB_GET_CONFIG"});if(!t?.ok){g.ynabStatus.textContent="Erro ao ler configura\xE7\xE3o YNAB.";return}E.ynabConfig=t.config;let e=E.ynabConfig;g.ynabRedirectInput.value=e.redirectUri||"(redirect URI indispon\xEDvel \u2014 recarregue a extens\xE3o)";let o=!!e.clientId;if(g.ynabSetupCard.hidden=o,g.ynabConnectCard.hidden=!o,ni(),!!o)if(e.connected){let i=e.tokenExpiresAt?Math.max(0,e.tokenExpiresAt-Date.now()):0,n=Math.floor(i/6e4),c=e.userEmail||"usu\xE1rio YNAB";g.ynabStatus.innerHTML=`<strong>Conectado</strong> como ${c} \xB7 token expira em ~${n} min`,g.ynabConnectBtn.hidden=!0,g.ynabDisconnectBtn.hidden=!1,pr("ynab-connect-card","done")}else g.ynabStatus.textContent='N\xE3o conectado. Clique em "Conectar ao YNAB" para autenticar.',g.ynabConnectBtn.hidden=!1,g.ynabDisconnectBtn.hidden=!0,pr("ynab-connect-card","active")}function ni(){let t=E.ynabConfig,e=!!t?.connected,o=e&&!!t?.budgetId&&t?.accountMap&&Object.keys(t.accountMap).length>0;g.ynabStatusIcon&&(g.ynabStatusIcon.classList.toggle("is-connected",e),g.ynabStatusIcon.classList.toggle("is-warn",e&&!o),g.ynabStatusIcon.title=e?o?"YNAB conectado":"YNAB conectado \xB7 mapeamento pendente":"YNAB desconectado");let i=g.railItems.find(n=>n.dataset.section==="ynab");i&&(i.classList.toggle("is-ready",o),i.classList.toggle("is-warn",e&&!o))}async function An(){let t=await ve.sendMessage({type:"YNAB_LIST_BUDGETS"});if(!t?.ok){H(t?.error||"Falha ao listar or\xE7amentos.","danger");return}E.ynabBudgets=t.budgets,g.ynabBudgetSelect.innerHTML='<option value="">Selecione um or\xE7amento</option>',t.budgets.forEach(e=>{let o=document.createElement("option");o.value=e.id,o.textContent=e.name,g.ynabBudgetSelect.appendChild(o)}),g.ynabBudgetCard.hidden=!1,pr("ynab-budget-card",E.ynabConfig?.budgetId?"done":"active"),E.ynabConfig?.budgetId&&(g.ynabBudgetSelect.value=E.ynabConfig.budgetId,await En(E.ynabConfig.budgetId))}async function En(t){let e=await ve.sendMessage({type:"YNAB_LIST_ACCOUNTS",budgetId:t});if(!e?.ok){H(e?.error||"Falha ao listar contas.","danger");return}E.ynabAccounts=e.accounts;let o=Object.values(BankUtils.ACCOUNTS).filter(n=>n.accountId!=="all");g.ynabMappingRows.innerHTML="";let i=E.ynabConfig?.accountMap||{};o.forEach(n=>{let c=new Set((i[n.accountId]||[]).map(C=>C.id||C)),d=document.createElement("div");d.className="ynab-mapping-group",d.dataset.bankGroup=n.accountId;let m=document.createElement("div");m.className="ynab-mapping-head",m.textContent=n.displayName,d.appendChild(m);let v=document.createElement("div");v.className="ynab-mapping-hint",v.textContent="Marque todas as contas YNAB que recebem transa\xE7\xF5es deste tipo.",d.appendChild(v);let y=document.createElement("div");y.className="ynab-mapping-options",E.ynabAccounts.forEach(C=>{let b=document.createElement("label");b.className="cbx";let S=document.createElement("input");S.type="checkbox",S.value=C.id,S.dataset.accountName=C.name,c.has(C.id)&&(S.checked=!0),b.appendChild(S);let k=document.createElement("span");k.textContent=`${C.name}`;let $=document.createElement("span");$.style.color="var(--muted)",$.style.marginLeft="4px",$.textContent=`(${C.type})`,k.appendChild($),b.appendChild(k),y.appendChild(b)}),d.appendChild(y),g.ynabMappingRows.appendChild(d)}),g.ynabMappingCard.hidden=!1,pr("ynab-mapping-card",Object.keys(i).length>0?"done":"active")}function pr(t,e){let o=document.getElementById(t);o&&(o.classList.remove("is-active","is-done"),e==="active"?o.classList.add("is-active"):e==="done"&&o.classList.add("is-done"))}function H(t,e="success"){oi&&clearTimeout(oi),g.toastMsg.textContent=t,g.toast.classList.remove("is-danger","is-warn"),e==="danger"?g.toast.classList.add("is-danger"):e==="warn"&&g.toast.classList.add("is-warn"),g.toast.hidden=!1,oi=setTimeout(()=>{g.toast.hidden=!0},3600)}window.__manageDeps={TomSelect:$n.default};
