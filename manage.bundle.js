var is=Object.create;var fi=Object.defineProperty;var as=Object.getOwnPropertyDescriptor;var ns=Object.getOwnPropertyNames;var ss=Object.getPrototypeOf,ls=Object.prototype.hasOwnProperty;var cs=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var ds=(t,e,o,a)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of ns(e))!ls.call(t,s)&&s!==o&&fi(t,s,{get:()=>e[s],enumerable:!(a=as(e,s))||a.enumerable});return t};var us=(t,e,o)=>(o=t!=null?is(ss(t)):{},ds(e||!t||!t.__esModule?fi(o,"default",{value:t,enumerable:!0}):o,t));var hn=cs((Yr,Gr)=>{(function(t,e){typeof Yr=="object"&&typeof Gr<"u"?Gr.exports=e():typeof define=="function"&&define.amd?define(e):(t=typeof globalThis<"u"?globalThis:t||self,t.TomSelect=e())})(Yr,(function(){"use strict";function t(l,r){l.split(/\s+/).forEach(i=>{r(i)})}class e{constructor(){this._events={}}on(r,i){t(r,n=>{let u=this._events[n]||[];u.push(i),this._events[n]=u})}off(r,i){var n=arguments.length;if(n===0){this._events={};return}t(r,u=>{if(n===1){delete this._events[u];return}let f=this._events[u];f!==void 0&&(f.splice(f.indexOf(i),1),this._events[u]=f)})}trigger(r,...i){var n=this;t(r,u=>{let f=n._events[u];f!==void 0&&f.forEach(p=>{p.apply(n,i)})})}}function o(l){return l.plugins={},class extends l{constructor(...r){super(...r),this.plugins={names:[],settings:{},requested:{},loaded:{}}}static define(r,i){l.plugins[r]={name:r,fn:i}}initializePlugins(r){var i,n;let u=this,f=[];if(Array.isArray(r))r.forEach(p=>{typeof p=="string"?f.push(p):(u.plugins.settings[p.name]=p.options,f.push(p.name))});else if(r)for(i in r)r.hasOwnProperty(i)&&(u.plugins.settings[i]=r[i],f.push(i));for(;n=f.shift();)u.require(n)}loadPlugin(r){var i=this,n=i.plugins,u=l.plugins[r];if(!l.plugins.hasOwnProperty(r))throw new Error('Unable to find "'+r+'" plugin');n.requested[r]=!0,n.loaded[r]=u.fn.apply(i,[i.plugins.settings[r]||{}]),n.names.push(r)}require(r){var i=this,n=i.plugins;if(!i.plugins.loaded.hasOwnProperty(r)){if(n.requested[r])throw new Error('Plugin has circular dependency ("'+r+'")');i.loadPlugin(r)}return n.loaded[r]}}}let a=l=>(l=l.filter(Boolean),l.length<2?l[0]||"":g(l)==1?"["+l.join("")+"]":"(?:"+l.join("|")+")"),s=l=>{if(!d(l))return l.join("");let r="",i=0,n=()=>{i>1&&(r+="{"+i+"}")};return l.forEach((u,f)=>{if(u===l[f-1]){i++;return}n(),r+=u,i=1}),n(),r},c=l=>{let r=Array.from(l);return a(r)},d=l=>new Set(l).size!==l.length,m=l=>(l+"").replace(/([\$\(\)\*\+\.\?\[\]\^\{\|\}\\])/gu,"\\$1"),g=l=>l.reduce((r,i)=>Math.max(r,y(i)),0),y=l=>Array.from(l).length,C=l=>{if(l.length===1)return[[l]];let r=[],i=l.substring(1);return C(i).forEach(function(u){let f=u.slice(0);f[0]=l.charAt(0)+f[0],r.push(f),f=u.slice(0),f.unshift(l.charAt(0)),r.push(f)}),r},x=[[0,65535]],A="[\u0300-\u036F\xB7\u02BE\u02BC]",L,E,I=3,R={},B={"/":"\u2044\u2215",0:"\u07C0",a:"\u2C65\u0250\u0251",aa:"\uA733",ae:"\xE6\u01FD\u01E3",ao:"\uA735",au:"\uA737",av:"\uA739\uA73B",ay:"\uA73D",b:"\u0180\u0253\u0183",c:"\uA73F\u0188\u023C\u2184",d:"\u0111\u0257\u0256\u1D05\u018C\uABB7\u0501\u0266",e:"\u025B\u01DD\u1D07\u0247",f:"\uA77C\u0192",g:"\u01E5\u0260\uA7A1\u1D79\uA77F\u0262",h:"\u0127\u2C68\u2C76\u0265",i:"\u0268\u0131",j:"\u0249\u0237",k:"\u0199\u2C6A\uA741\uA743\uA745\uA7A3",l:"\u0142\u019A\u026B\u2C61\uA749\uA747\uA781\u026D",m:"\u0271\u026F\u03FB",n:"\uA7A5\u019E\u0272\uA791\u1D0E\u043B\u0509",o:"\xF8\u01FF\u0254\u0275\uA74B\uA74D\u1D11",oe:"\u0153",oi:"\u01A3",oo:"\uA74F",ou:"\u0223",p:"\u01A5\u1D7D\uA751\uA753\uA755\u03C1",q:"\uA757\uA759\u024B",r:"\u024D\u027D\uA75B\uA7A7\uA783",s:"\xDF\u023F\uA7A9\uA785\u0282",t:"\u0167\u01AD\u0288\u2C66\uA787",th:"\xFE",tz:"\uA729",u:"\u0289",v:"\u028B\uA75F\u028C",vy:"\uA761",w:"\u2C73",y:"\u01B4\u024F\u1EFF",z:"\u01B6\u0225\u0240\u2C6C\uA763",hv:"\u0195"};for(let l in B){let r=B[l]||"";for(let i=0;i<r.length;i++){let n=r.substring(i,i+1);R[n]=l}}let W=new RegExp(Object.keys(R).join("|")+"|"+A,"gu"),K=l=>{L===void 0&&(L=qt(x))},et=(l,r="NFKD")=>l.normalize(r),ht=l=>Array.from(l).reduce((r,i)=>r+ft(i),""),ft=l=>(l=et(l).toLowerCase().replace(W,r=>R[r]||""),et(l,"NFC"));function*bt(l){for(let[r,i]of l)for(let n=r;n<=i;n++){let u=String.fromCharCode(n),f=ht(u);f!=u.toLowerCase()&&(f.length>I||f.length!=0&&(yield{folded:f,composed:u,code_point:n}))}}let Kt=l=>{let r={},i=(n,u)=>{let f=r[n]||new Set,p=new RegExp("^"+c(f)+"$","iu");u.match(p)||(f.add(m(u)),r[n]=f)};for(let n of bt(l))i(n.folded,n.folded),i(n.folded,n.composed);return r},qt=l=>{let r=Kt(l),i={},n=[];for(let f in r){let p=r[f];p&&(i[f]=c(p)),f.length>1&&n.push(m(f))}n.sort((f,p)=>p.length-f.length);let u=a(n);return E=new RegExp("^"+u,"u"),i},Tt=(l,r=1)=>{let i=0;return l=l.map(n=>(L[n]&&(i+=n.length),L[n]||n)),i>=r?s(l):""},te=(l,r=1)=>(r=Math.max(r,l.length-1),a(C(l).map(i=>Tt(i,r)))),Mt=(l,r=!0)=>{let i=l.length>1?1:0;return a(l.map(n=>{let u=[],f=r?n.length():n.length()-1;for(let p=0;p<f;p++)u.push(te(n.substrs[p]||"",i));return s(u)}))},ee=(l,r)=>{for(let i of r){if(i.start!=l.start||i.end!=l.end||i.substrs.join("")!==l.substrs.join(""))continue;let n=l.parts,u=p=>{for(let b of n){if(b.start===p.start&&b.substr===p.substr)return!1;if(!(p.length==1||b.length==1)&&(p.start<b.start&&p.end>b.start||b.start<p.start&&b.end>p.start))return!0}return!1};if(!(i.parts.filter(u).length>0))return!0}return!1};class gt{parts;substrs;start;end;constructor(){this.parts=[],this.substrs=[],this.start=0,this.end=0}add(r){r&&(this.parts.push(r),this.substrs.push(r.substr),this.start=Math.min(r.start,this.start),this.end=Math.max(r.end,this.end))}last(){return this.parts[this.parts.length-1]}length(){return this.parts.length}clone(r,i){let n=new gt,u=JSON.parse(JSON.stringify(this.parts)),f=u.pop();for(let k of u)n.add(k);let p=i.substr.substring(0,r-f.start),b=p.length;return n.add({start:f.start,end:f.start+b,length:b,substr:p}),n}}let le=l=>{K(),l=ht(l);let r="",i=[new gt];for(let n=0;n<l.length;n++){let f=l.substring(n).match(E),p=l.substring(n,n+1),b=f?f[0]:null,k=[],_=new Set;for(let O of i){let T=O.last();if(!T||T.length==1||T.end<=n)if(b){let D=b.length;O.add({start:n,end:n+D,length:D,substr:b}),_.add("1")}else O.add({start:n,end:n+1,length:1,substr:p}),_.add("2");else if(b){let D=O.clone(n,T),nt=b.length;D.add({start:n,end:n+nt,length:nt,substr:b}),k.push(D)}else _.add("3")}if(k.length>0){k=k.sort((O,T)=>O.length()-T.length());for(let O of k)ee(O,i)||i.push(O);continue}if(n>0&&_.size==1&&!_.has("3")){r+=Mt(i,!1);let O=new gt,T=i[0];T&&O.add(T.last()),i=[O]}}return r+=Mt(i,!0),r},Yt=(l,r)=>{if(l)return l[r]},Bt=(l,r)=>{if(l){for(var i,n=r.split(".");(i=n.shift())&&(l=l[i]););return l}},At=(l,r,i)=>{var n,u;return!l||(l=l+"",r.regex==null)||(u=l.search(r.regex),u===-1)?0:(n=r.string.length/l.length,u===0&&(n+=.5),n*i)},Nt=(l,r)=>{var i=l[r];if(typeof i=="function")return i;i&&!Array.isArray(i)&&(l[r]=[i])},Re=(l,r)=>{if(Array.isArray(l))l.forEach(r);else for(var i in l)l.hasOwnProperty(i)&&r(l[i],i)},Ln=(l,r)=>typeof l=="number"&&typeof r=="number"?l>r?1:l<r?-1:0:(l=ht(l+"").toLowerCase(),r=ht(r+"").toLowerCase(),l>r?1:r>l?-1:0);class Sn{items;settings;constructor(r,i){this.items=r,this.settings=i||{diacritics:!0}}tokenize(r,i,n){if(!r||!r.length)return[];let u=[],f=r.split(/\s+/);var p;return n&&(p=new RegExp("^("+Object.keys(n).map(m).join("|")+"):(.*)$")),f.forEach(b=>{let k,_=null,O=null;p&&(k=b.match(p))&&(_=k[1],b=k[2]),b.length>0&&(this.settings.diacritics?O=le(b)||null:O=m(b),O&&i&&(O="\\b"+O)),u.push({string:b,regex:O?new RegExp(O,"iu"):null,field:_})}),u}getScoreFunction(r,i){var n=this.prepareSearch(r,i);return this._getScoreFunction(n)}_getScoreFunction(r){let i=r.tokens,n=i.length;if(!n)return function(){return 0};let u=r.options.fields,f=r.weights,p=u.length,b=r.getAttrFn;if(!p)return function(){return 1};let k=(function(){return p===1?function(_,O){let T=u[0].field;return At(b(O,T),_,f[T]||1)}:function(_,O){var T=0;if(_.field){let D=b(O,_.field);!_.regex&&D?T+=1/p:T+=At(D,_,1)}else Re(f,(D,nt)=>{T+=At(b(O,nt),_,D)});return T/p}})();return n===1?function(_){return k(i[0],_)}:r.options.conjunction==="and"?function(_){var O,T=0;for(let D of i){if(O=k(D,_),O<=0)return 0;T+=O}return T/n}:function(_){var O=0;return Re(i,T=>{O+=k(T,_)}),O/n}}getSortFunction(r,i){var n=this.prepareSearch(r,i);return this._getSortFunction(n)}_getSortFunction(r){var i,n=[];let u=this,f=r.options,p=!r.query&&f.sort_empty?f.sort_empty:f.sort;if(typeof p=="function")return p.bind(this);let b=function(_,O){return _==="$score"?O.score:r.getAttrFn(u.items[O.id],_)};if(p)for(let _ of p)(r.query||_.field!=="$score")&&n.push(_);if(r.query){i=!0;for(let _ of n)if(_.field==="$score"){i=!1;break}i&&n.unshift({field:"$score",direction:"desc"})}else n=n.filter(_=>_.field!=="$score");return n.length?function(_,O){var T,D;for(let nt of n)if(D=nt.field,T=(nt.direction==="desc"?-1:1)*Ln(b(D,_),b(D,O)),T)return T;return 0}:null}prepareSearch(r,i){let n={};var u=Object.assign({},i);if(Nt(u,"sort"),Nt(u,"sort_empty"),u.fields){Nt(u,"fields");let f=[];u.fields.forEach(p=>{typeof p=="string"&&(p={field:p,weight:1}),f.push(p),n[p.field]="weight"in p?p.weight:1}),u.fields=f}return{options:u,query:r.toLowerCase().trim(),tokens:this.tokenize(r,u.respect_word_boundaries,n),total:0,items:[],weights:n,getAttrFn:u.nesting?Bt:Yt}}search(r,i){var n=this,u,f;f=this.prepareSearch(r,i),i=f.options,r=f.query;let p=i.score||n._getScoreFunction(f);r.length?Re(n.items,(k,_)=>{u=p(k),(i.filter===!1||u>0)&&f.items.push({score:u,id:_})}):Re(n.items,(k,_)=>{f.items.push({score:1,id:_})});let b=n._getSortFunction(f);return b&&f.items.sort(b),f.total=f.items.length,typeof i.limit=="number"&&(f.items=f.items.slice(0,i.limit)),f}}let Dt=l=>typeof l>"u"||l===null?null:_o(l),_o=l=>typeof l=="boolean"?l?"1":"0":l+"",ko=l=>(l+"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"),An=(l,r)=>r>0?window.setTimeout(l,r):(l.call(null),null),En=(l,r)=>{var i;return function(n,u){var f=this;i&&(f.loading=Math.max(f.loading-1,0),clearTimeout(i)),i=setTimeout(function(){i=null,f.loadedSearches[n]=!0,l.call(f,n,u)},r)}},oi=(l,r,i)=>{var n,u=l.trigger,f={};l.trigger=function(){var p=arguments[0];if(r.indexOf(p)!==-1)f[p]=arguments;else return u.apply(l,arguments)},i.apply(l,[]),l.trigger=u;for(n of r)n in f&&u.apply(l,f[n])},On=l=>({start:l.selectionStart||0,length:(l.selectionEnd||0)-(l.selectionStart||0)}),G=(l,r=!1)=>{l&&(l.preventDefault(),r&&l.stopPropagation())},X=(l,r,i,n)=>{l.addEventListener(r,i,n)},ye=(l,r)=>{if(!r||!r[l])return!1;var i=(r.altKey?1:0)+(r.ctrlKey?1:0)+(r.shiftKey?1:0)+(r.metaKey?1:0);return i===1},hr=(l,r)=>{let i=l.getAttribute("id");return i||(l.setAttribute("id",r),r)},ri=l=>l.replace(/[\\"']/g,"\\$&"),xe=(l,r)=>{r&&l.append(r)},_t=(l,r)=>{if(Array.isArray(l))l.forEach(r);else for(var i in l)l.hasOwnProperty(i)&&r(l[i],i)},yt=l=>{if(l.jquery)return l[0];if(l instanceof HTMLElement)return l;if(ii(l)){var r=document.createElement("template");return r.innerHTML=l.trim(),r.content.firstChild}return document.querySelector(l)},ii=l=>typeof l=="string"&&l.indexOf("<")>-1,$n=l=>l.replace(/['"\\]/g,"\\$&"),fr=(l,r)=>{var i=document.createEvent("HTMLEvents");i.initEvent(r,!0,!1),l.dispatchEvent(i)},Lo=(l,r)=>{Object.assign(l.style,r)},Et=(l,...r)=>{var i=ai(r);l=ni(l),l.map(n=>{i.map(u=>{n.classList.add(u)})})},ce=(l,...r)=>{var i=ai(r);l=ni(l),l.map(n=>{i.map(u=>{n.classList.remove(u)})})},ai=l=>{var r=[];return _t(l,i=>{typeof i=="string"&&(i=i.trim().split(/[\t\n\f\r\s]/)),Array.isArray(i)&&(r=r.concat(i))}),r.filter(Boolean)},ni=l=>(Array.isArray(l)||(l=[l]),l),So=(l,r,i)=>{if(!(i&&!i.contains(l)))for(;l&&l.matches;){if(l.matches(r))return l;l=l.parentNode}},si=(l,r=0)=>r>0?l[l.length-1]:l[0],zn=l=>Object.keys(l).length===0,Ao=(l,r)=>{if(!l)return-1;r=r||l.nodeName;for(var i=0;l=l.previousElementSibling;)l.matches(r)&&i++;return i},at=(l,r)=>{_t(r,(i,n)=>{i==null?l.removeAttribute(n):l.setAttribute(n,""+i)})},mr=(l,r)=>{l.parentNode&&l.parentNode.replaceChild(r,l)},In=(l,r)=>{if(r===null)return;if(typeof r=="string"){if(!r.length)return;r=new RegExp(r,"i")}let i=f=>{var p=f.data.match(r);if(p&&f.data.length>0){var b=document.createElement("span");b.className="highlight";var k=f.splitText(p.index);k.splitText(p[0].length);var _=k.cloneNode(!0);return b.appendChild(_),mr(k,b),1}return 0},n=f=>{f.nodeType===1&&f.childNodes&&!/(script|style)/i.test(f.tagName)&&(f.className!=="highlight"||f.tagName!=="SPAN")&&Array.from(f.childNodes).forEach(p=>{u(p)})},u=f=>f.nodeType===3?i(f):(n(f),0);u(l)},Tn=l=>{var r=l.querySelectorAll("span.highlight");Array.prototype.forEach.call(r,function(i){var n=i.parentNode;n.replaceChild(i.firstChild,i),n.normalize()})},Fn=65,Mn=13,li=27,gr=37,Bn=38,ci=39,Dn=40,di=8,Pn=46,vr=9,Eo=(typeof navigator>"u"?!1:/Mac/.test(navigator.userAgent))?"metaKey":"ctrlKey";var ui={options:[],optgroups:[],plugins:[],delimiter:",",splitOn:null,persist:!0,diacritics:!0,create:null,createOnBlur:!1,createFilter:null,clearAfterSelect:!1,highlight:!0,openOnFocus:!0,shouldOpen:null,maxOptions:50,maxItems:null,hideSelected:null,duplicates:!1,addPrecedence:!1,selectOnTab:!1,preload:null,allowEmptyOption:!1,refreshThrottle:300,loadThrottle:300,loadingClass:"loading",dataAttr:null,optgroupField:"optgroup",valueField:"value",labelField:"text",disabledField:"disabled",optgroupLabelField:"label",optgroupValueField:"value",lockOptgroupOrder:!1,sortField:"$order",searchField:["text"],searchConjunction:"and",mode:null,wrapperClass:"ts-wrapper",controlClass:"ts-control",dropdownClass:"ts-dropdown",dropdownContentClass:"ts-dropdown-content",itemClass:"item",optionClass:"option",dropdownParent:null,controlInput:'<input type="text" autocomplete="off" size="1" />',copyClassesToDropdown:!1,placeholder:null,hidePlaceholder:null,shouldLoad:function(l){return l.length>0},render:{}};function pi(l,r){var i=Object.assign({},ui,r),n=i.dataAttr,u=i.labelField,f=i.valueField,p=i.disabledField,b=i.optgroupField,k=i.optgroupLabelField,_=i.optgroupValueField,O=l.tagName.toLowerCase(),T=l.getAttribute("placeholder")||l.getAttribute("data-placeholder");if(!T&&!i.allowEmptyOption){let F=l.querySelector('option[value=""]');F&&(T=F.textContent)}var D={placeholder:T,options:[],optgroups:[],items:[],maxItems:null},nt=()=>{var F,Y=D.options,Z={},ut=1;let M=0;var ot=pt=>{var j=Object.assign({},pt.dataset),P=n&&j[n];return typeof P=="string"&&P.length&&(j=Object.assign(j,JSON.parse(P))),j},ge=(pt,j)=>{var P=Dt(pt.value);if(P!=null&&!(!P&&!i.allowEmptyOption)){if(Z.hasOwnProperty(P)){if(j){var vt=Z[P][b];vt?Array.isArray(vt)?vt.push(j):Z[P][b]=[vt,j]:Z[P][b]=j}}else{var lt=ot(pt);lt[u]=lt[u]||pt.textContent,lt[f]=lt[f]||P,lt[p]=lt[p]||pt.disabled,lt[b]=lt[b]||j,lt.$option=pt,lt.$order=lt.$order||++M,Z[P]=lt,Y.push(lt)}pt.selected&&D.items.push(P)}},Oo=pt=>{var j,P;P=ot(pt),P[k]=P[k]||pt.getAttribute("label")||"",P[_]=P[_]||ut++,P[p]=P[p]||pt.disabled,P.$order=P.$order||++M,D.optgroups.push(P),j=P[_],_t(pt.children,vt=>{ge(vt,j)})};D.maxItems=l.hasAttribute("multiple")?null:1,_t(l.children,pt=>{F=pt.tagName.toLowerCase(),F==="optgroup"?Oo(pt):F==="option"&&ge(pt)})},S=()=>{let F=l.getAttribute(n);if(F)D.options=JSON.parse(F),_t(D.options,M=>{D.items.push(M[f])});else{var Y,Z,ut=(Y=l==null||(Z=l.value)==null?void 0:Z.trim())!=null?Y:"";if(!i.allowEmptyOption&&!ut.length)return;let M=ut.split(i.delimiter);_t(M,ot=>{let ge={};ge[u]=ot,ge[f]=ot,D.options.push(ge)}),D.items=M}};return O==="select"?nt():S(),Object.assign({},ui,D,r)}var hi=0;class Ot extends o(e){constructor(r,i){super(),this.order=0,this.isOpen=!1,this.isDisabled=!1,this.isReadOnly=!1,this.isInvalid=!1,this.isValid=!0,this.isLocked=!1,this.isFocused=!1,this.isInputHidden=!1,this.isSetup=!1,this.isDropdownContentStale=!0,this.ignoreFocus=!1,this.ignoreHover=!1,this.hasOptions=!1,this.lastValue="",this.caretPos=0,this.loading=0,this.loadedSearches={},this.activeOption=null,this.activeItems=[],this.optgroups={},this.options={},this.userOptions={},this.items=[],this.refreshTimeout=null,hi++;var n,u=yt(r);if(u.tomselect)throw new Error("Tom Select already initialized on this element");u.tomselect=this;var f=window.getComputedStyle&&window.getComputedStyle(u,null);n=f.getPropertyValue("direction");let p=pi(u,i);this.settings=p,this.input=u,this.tabIndex=u.tabIndex||0,this.is_select_tag=u.tagName.toLowerCase()==="select",this.rtl=/rtl/i.test(n),this.inputId=hr(u,"tomselect-"+hi),this.isRequired=u.required,this.sifter=new Sn(this.options,{diacritics:p.diacritics}),p.mode=p.mode||(p.maxItems===1?"single":"multi"),typeof p.hideSelected!="boolean"&&(p.hideSelected=p.mode==="multi"),typeof p.hidePlaceholder!="boolean"&&(p.hidePlaceholder=p.mode!=="multi");var b=p.createFilter;typeof b!="function"&&(typeof b=="string"&&(b=new RegExp(b)),b instanceof RegExp?p.createFilter=Y=>b.test(Y):p.createFilter=Y=>this.settings.duplicates||!this.options[Y]),this.initializePlugins(p.plugins),this.setupCallbacks(),this.setupTemplates();let k=yt("<div>"),_=yt("<div>"),O=this._render("dropdown"),T=yt('<div role="listbox" tabindex="-1">'),D=this.input.getAttribute("class")||"",nt=p.mode;var S;if(Et(k,p.wrapperClass,D,nt),Et(_,p.controlClass),xe(k,_),Et(O,p.dropdownClass,nt),p.copyClassesToDropdown&&Et(O,D),Et(T,p.dropdownContentClass),xe(O,T),yt(p.dropdownParent||k).appendChild(O),ii(p.controlInput)){S=yt(p.controlInput);var F=["autocorrect","autocapitalize","autocomplete","spellcheck","aria-label"];_t(F,Y=>{u.getAttribute(Y)&&at(S,{[Y]:u.getAttribute(Y)})}),S.tabIndex=-1,_.appendChild(S),this.focus_node=S}else p.controlInput?(S=yt(p.controlInput),this.focus_node=S):(S=yt("<input/>"),this.focus_node=_);this.wrapper=k,this.dropdown=O,this.dropdown_content=T,this.control=_,this.control_input=S,this.setup()}setup(){let r=this,i=r.settings,n=r.control_input,u=r.dropdown,f=r.dropdown_content,p=r.wrapper,b=r.control,k=r.input,_=r.focus_node,O={passive:!0},T=r.inputId+"-ts-dropdown";at(f,{id:T}),at(_,{role:"combobox","aria-haspopup":"listbox","aria-expanded":"false","aria-controls":T});let D=hr(_,r.inputId+"-ts-control"),nt="label[for='"+$n(r.inputId)+"']",S=document.querySelector(nt),F=r.focus.bind(r);if(S){X(S,"click",F),at(S,{for:D});let M=hr(S,r.inputId+"-ts-label");at(_,{"aria-labelledby":M}),at(f,{"aria-labelledby":M})}if(p.style.width=k.style.width,p.style.minWidth=k.style.minWidth,p.style.maxWidth=k.style.maxWidth,r.plugins.names.length){let M="plugin-"+r.plugins.names.join(" plugin-");Et([p,u],M)}(i.maxItems===null||i.maxItems>1)&&r.is_select_tag&&at(k,{multiple:"multiple"}),i.placeholder&&at(n,{placeholder:i.placeholder}),!i.splitOn&&i.delimiter&&(i.splitOn=new RegExp("\\s*"+m(i.delimiter)+"+\\s*")),i.load&&i.loadThrottle&&(i.load=En(i.load,i.loadThrottle)),X(u,"mousemove",()=>{r.ignoreHover=!1}),X(u,"mouseenter",M=>{var ot=So(M.target,"[data-selectable]",u);ot&&r.onOptionHover(M,ot)},{capture:!0}),X(u,"click",M=>{let ot=So(M.target,"[data-selectable]");ot&&(r.onOptionSelect(M,ot),G(M,!0))}),X(b,"click",M=>{var ot=So(M.target,"[data-ts-item]",b);if(ot&&r.onItemSelect(M,ot)){G(M,!0);return}n.value==""&&(r.onClick(),G(M,!0))}),X(_,"keydown",M=>r.onKeyDown(M)),X(n,"keypress",M=>r.onKeyPress(M)),X(n,"input",M=>r.onInput(M)),X(_,"blur",M=>r.onBlur(M)),X(_,"focus",M=>r.onFocus(M)),X(n,"paste",M=>r.onPaste(M));let Y=M=>{let ot=M.composedPath()[0];if(!p.contains(ot)&&!u.contains(ot)){r.isFocused&&r.blur(),r.inputState();return}ot==n&&r.isOpen?M.stopPropagation():G(M,!0)},Z=()=>{r.isOpen&&r.positionDropdown()},ut=()=>{r.isValid&&(r.isValid=!1,r.isInvalid=!0,r.refreshState())};X(k,"invalid",ut),X(document,"mousedown",Y),X(window,"scroll",Z,O),X(window,"resize",Z,O),this._destroy=()=>{k.removeEventListener("invalid",ut),document.removeEventListener("mousedown",Y),window.removeEventListener("scroll",Z),window.removeEventListener("resize",Z),S&&S.removeEventListener("click",F)},this.revertSettings={innerHTML:k.innerHTML,tabIndex:k.tabIndex},k.tabIndex=-1,k.insertAdjacentElement("afterend",r.wrapper),r.sync(!1),i.items=[],delete i.optgroups,delete i.options,r.refreshItems(),r.close(!1),r.inputState(),r.isSetup=!0,r.on("change",this.onChange),Et(k,"tomselected","ts-hidden-accessible"),r.trigger("initialize"),i.preload===!0&&r.preload()}setupOptions(r=[],i=[]){this.addOptions(r),_t(i,n=>{this.registerOptionGroup(n)})}setupTemplates(){var r=this,i=r.settings.labelField,n=r.settings.optgroupLabelField,u={optgroup:f=>{let p=document.createElement("div");return p.className="optgroup",p.appendChild(f.options),p},optgroup_header:(f,p)=>'<div class="optgroup-header">'+p(f[n])+"</div>",option:(f,p)=>"<div>"+p(f[i])+"</div>",item:(f,p)=>"<div>"+p(f[i])+"</div>",option_create:(f,p)=>'<div class="create">Add <strong>'+p(f.input)+"</strong>&hellip;</div>",no_results:()=>'<div class="no-results">No results found</div>',loading:()=>'<div class="spinner"></div>',not_loading:()=>{},dropdown:()=>"<div></div>"};r.settings.render=Object.assign({},u,r.settings.render)}setupCallbacks(){var r,i,n={initialize:"onInitialize",change:"onChange",item_add:"onItemAdd",item_remove:"onItemRemove",item_select:"onItemSelect",clear:"onClear",option_add:"onOptionAdd",option_remove:"onOptionRemove",option_clear:"onOptionClear",optgroup_add:"onOptionGroupAdd",optgroup_remove:"onOptionGroupRemove",optgroup_clear:"onOptionGroupClear",dropdown_open:"onDropdownOpen",dropdown_close:"onDropdownClose",type:"onType",load:"onLoad",focus:"onFocus",blur:"onBlur"};for(r in n)i=this.settings[n[r]],i&&this.on(r,i)}sync(r=!0){let i=this,n=r?pi(i.input,{delimiter:i.settings.delimiter,allowEmptyOption:i.settings.allowEmptyOption}):i.settings;i.setupOptions(n.options,n.optgroups),i.setValue(n.items||[],!0),i.input.disabled?i.disable():i.input.readOnly?i.setReadOnly(!0):i.enable(),i.lastQuery=null}onClick(){var r=this;if(r.activeItems.length>0){r.clearActiveItems(),r.focus();return}r.isFocused&&r.isOpen?r.blur():r.focus()}onMouseDown(){}onChange(){fr(this.input,"input"),fr(this.input,"change")}onPaste(r){var i=this;if(i.isInputHidden||i.isLocked){G(r);return}i.settings.splitOn&&setTimeout(()=>{var n=i.inputValue();if(n.match(i.settings.splitOn)){var u=n.trim().split(i.settings.splitOn);_t(u,f=>{Dt(f)&&(this.options[f]?i.addItem(f):i.createItem(f))})}},0)}onKeyPress(r){var i=this;if(i.isLocked){G(r);return}var n=String.fromCharCode(r.keyCode||r.which);if(i.settings.create&&i.settings.mode==="multi"&&n===i.settings.delimiter){i.createItem(),G(r);return}}onKeyDown(r){var i=this;if(i.ignoreHover=!0,i.isLocked){r.keyCode!==vr&&G(r);return}switch(r.keyCode){case Fn:if(ye(Eo,r)&&i.control_input.value==""){G(r),i.selectAll();return}break;case li:i.isOpen&&(G(r,!0),i.close()),i.clearActiveItems();return;case Dn:if(!i.isOpen&&i.hasOptions)i.open();else if(i.activeOption){let n=i.getAdjacent(i.activeOption,1);n&&i.setActiveOption(n)}G(r);return;case Bn:if(i.activeOption){let n=i.getAdjacent(i.activeOption,-1);n&&i.setActiveOption(n)}G(r);return;case Mn:i.canSelect(i.activeOption)?(i.onOptionSelect(r,i.activeOption),G(r)):(i.settings.create&&i.createItem()||document.activeElement==i.control_input&&i.isOpen)&&G(r);return;case gr:i.advanceSelection(-1,r);return;case ci:i.advanceSelection(1,r);return;case vr:i.settings.selectOnTab&&(i.canSelect(i.activeOption)?(i.onOptionSelect(r,i.activeOption),G(r)):i.settings.create&&i.createItem()&&G(r));return;case di:case Pn:i.deleteSelection(r);return}i.isInputHidden&&!ye(Eo,r)&&G(r)}onInput(r){if(this.isLocked)return;let i=this.inputValue();if(this.lastValue!==i){if(this.lastValue=i,i==""){this._onInput();return}this.refreshTimeout&&window.clearTimeout(this.refreshTimeout),this.refreshTimeout=An(()=>{this.refreshTimeout=null,this._onInput()},this.settings.refreshThrottle)}}_onInput(){let r=this.lastValue;this.settings.shouldLoad.call(this,r)&&this.load(r),this.refreshOptions(),this.trigger("type",r)}onOptionHover(r,i){this.ignoreHover||this.setActiveOption(i,!1)}onFocus(r){var i=this,n=i.isFocused;if(i.isDisabled||i.isReadOnly){i.blur(),G(r);return}i.ignoreFocus||(i.isFocused=!0,i.settings.preload==="focus"&&i.preload(),n||i.trigger("focus"),i.activeItems.length||(i.inputState(),i.refreshOptions(!!i.settings.openOnFocus)),i.refreshState())}onBlur(r){if(document.hasFocus()!==!1){var i=this;if(i.isFocused){i.isFocused=!1,i.ignoreFocus=!1;var n=()=>{i.close(),i.setActiveItem(),i.setCaret(i.items.length),i.trigger("blur")};i.settings.create&&i.settings.createOnBlur?i.createItem(null,n):n()}}}onOptionSelect(r,i){var n,u=this;i.parentElement&&i.parentElement.matches("[data-disabled]")||(i.classList.contains("create")?u.createItem(null,()=>{u.settings.closeAfterSelect?u.close():u.settings.clearAfterSelect&&u.setTextboxValue()}):(n=i.dataset.value,typeof n<"u"&&(u.isDropdownContentStale=u.settings.hideSelected,u.addItem(n),u.settings.closeAfterSelect?u.close():u.settings.clearAfterSelect&&u.setTextboxValue(),!u.settings.hideSelected&&r.type&&/click/.test(r.type)&&u.setActiveOption(i))))}canSelect(r){return!!(this.isOpen&&r&&this.dropdown_content.contains(r))}onItemSelect(r,i){var n=this;return!n.isLocked&&n.settings.mode==="multi"?(G(r),n.setActiveItem(i,r),!0):!1}canLoad(r){return!(!this.settings.load||this.loadedSearches.hasOwnProperty(r))}load(r){let i=this;if(!i.canLoad(r))return;Et(i.wrapper,i.settings.loadingClass),i.loading++;let n=i.loadCallback.bind(i);i.settings.load.call(i,r,n)}loadCallback(r,i){let n=this;n.loading=Math.max(n.loading-1,0),n.isDropdownContentStale=!0,n.clearActiveOption(),n.setupOptions(r,i),n.refreshOptions(n.isFocused&&!n.isInputHidden),n.loading||ce(n.wrapper,n.settings.loadingClass),n.trigger("load",r,i)}preload(){var r=this.wrapper.classList;r.contains("preloaded")||(r.add("preloaded"),this.load(""))}setTextboxValue(r=""){var i=this.control_input,n=i.value!==r;n&&(i.value=r,fr(i,"update"),this.lastValue=r)}getValue(){return this.is_select_tag&&this.input.hasAttribute("multiple")?this.items:this.items.join(this.settings.delimiter)}setValue(r,i){var n=i?[]:["change"];oi(this,n,()=>{this.clear(i),this.addItems(r,i)})}setMaxItems(r){r===0&&(r=null),this.settings.maxItems=r,this.refreshState()}setActiveItem(r,i){var n=this,u,f,p,b,k,_;if(n.settings.mode!=="single"){if(!r){n.clearActiveItems(),n.isFocused&&n.inputState();return}if(u=i&&i.type.toLowerCase(),u==="click"&&ye("shiftKey",i)&&n.activeItems.length){for(_=n.getLastActive(),p=Array.prototype.indexOf.call(n.control.children,_),b=Array.prototype.indexOf.call(n.control.children,r),p>b&&(k=p,p=b,b=k),f=p;f<=b;f++)r=n.control.children[f],n.activeItems.indexOf(r)===-1&&n.setActiveItemClass(r);G(i)}else u==="click"&&ye(Eo,i)||u==="keydown"&&ye("shiftKey",i)?r.classList.contains("active")?n.removeActiveItem(r):n.setActiveItemClass(r):(n.clearActiveItems(),n.setActiveItemClass(r));n.inputState(),n.isFocused||n.focus()}}setActiveItemClass(r){let i=this,n=i.control.querySelector(".last-active");n&&ce(n,"last-active"),Et(r,"active last-active"),i.trigger("item_select",r),i.activeItems.indexOf(r)==-1&&i.activeItems.push(r)}removeActiveItem(r){var i=this.activeItems.indexOf(r);this.activeItems.splice(i,1),ce(r,"active")}clearActiveItems(){ce(this.activeItems,"active"),this.activeItems=[]}setActiveOption(r,i=!0){r!==this.activeOption&&(this.clearActiveOption(),r&&(this.activeOption=r,at(this.focus_node,{"aria-activedescendant":r.getAttribute("id")}),at(r,{"aria-selected":"true"}),Et(r,"active"),i&&this.scrollToOption(r)))}scrollToOption(r,i){if(!r)return;let n=this.dropdown_content,u=n.clientHeight,f=n.scrollTop||0,p=r.offsetHeight,b=r.getBoundingClientRect().top-n.getBoundingClientRect().top+f;b+p>u+f?this.scroll(b-u+p,i):b<f&&this.scroll(b,i)}scroll(r,i){let n=this.dropdown_content;i&&(n.style.scrollBehavior=i),n.scrollTop=r,n.style.scrollBehavior=""}clearActiveOption(){this.activeOption&&(ce(this.activeOption,"active"),at(this.activeOption,{"aria-selected":null})),this.activeOption=null,at(this.focus_node,{"aria-activedescendant":null})}selectAll(){let r=this;if(r.settings.mode==="single")return;let i=r.controlChildren();i.length&&(r.inputState(),r.close(),r.activeItems=i,_t(i,n=>{r.setActiveItemClass(n)}))}inputState(){var r=this;r.control.contains(r.control_input)&&(at(r.control_input,{placeholder:r.settings.placeholder}),r.activeItems.length>0||!r.isFocused&&r.settings.hidePlaceholder&&r.items.length>0?(r.setTextboxValue(),r.isInputHidden=!0):(r.settings.hidePlaceholder&&r.items.length>0&&at(r.control_input,{placeholder:""}),r.isInputHidden=!1),r.wrapper.classList.toggle("input-hidden",r.isInputHidden))}inputValue(){return this.control_input.value.trim()}focus(){var r=this;if(r.isDisabled||r.isReadOnly)return;r.ignoreFocus=!0;let i=this.control_input.offsetWidth?this.control_input:this.focus_node;i.focus(),setTimeout(()=>{r.ignoreFocus=!1,i.getRootNode().activeElement===i&&this.onFocus()},0)}blur(){this.focus_node.blur(),this.onBlur()}getScoreFunction(r){return this.sifter.getScoreFunction(r,this.getSearchOptions())}getSearchOptions(){var r=this.settings,i=r.sortField;return typeof r.sortField=="string"&&(i=[{field:r.sortField}]),{fields:r.searchField,conjunction:r.searchConjunction,sort:i,nesting:r.nesting}}search(r){var i,n,u=this,f=this.getSearchOptions();if(u.settings.score&&(n=u.settings.score.call(u,r),typeof n!="function"))throw new Error('Tom Select "score" setting must be a function that returns a function');return u.isDropdownContentStale||r!==u.lastQuery?(u.lastQuery=r,/(.)\1{15,}/.test(r)&&(r=""),i=u.sifter.search(r,Object.assign(f,{score:n})),u.currentResults=i):i=Object.assign({},u.currentResults),u.settings.hideSelected&&(i.items=i.items.filter(p=>{let b=Dt(p.id);return!(b!==null&&u.items.indexOf(b)!==-1)})),i}refreshOptions(r=!0){var i,n,u,f,p,b,k,_,O,T;let D={},nt=[];var S=this,F=S.inputValue();let Y=F===S.lastQuery||F==""&&S.lastQuery==null;var Z=S.search(F),ut=null,M=S.settings.shouldOpen||!1,ot=S.dropdown_content;Y&&(ut=S.activeOption,ut&&(O=ut.closest("[data-group]"))),f=Z.items.length,typeof S.settings.maxOptions=="number"&&(f=Math.min(f,S.settings.maxOptions)),f>0&&(M=!0);let ge=(j,P)=>{let vt=D[j];if(vt!==void 0){let $t=nt[vt];if($t!==void 0)return[vt,$t.fragment]}let lt=document.createDocumentFragment();return vt=nt.length,nt.push({fragment:lt,order:P,optgroup:j}),[vt,lt]};for(i=0;i<f;i++){let j=Z.items[i];if(!j)continue;let P=j.id,vt=S.options[P];if(vt===void 0)continue;let lt=_o(P),$t=S.getOption(lt,!0);for(S.settings.hideSelected||$t.classList.toggle("selected",S.items.includes(lt)),p=vt[S.settings.optgroupField]||"",b=Array.isArray(p)?p:[p],n=0,u=b&&b.length;n<u;n++){p=b[n];let $o=vt.$order,qe=S.optgroups[p];if(qe===void 0&&typeof S.settings.optionGroupRegister=="function"){var Oo;(Oo=S.settings.optionGroupRegister.apply(S,[p]))&&S.registerOptionGroup(Oo)}qe=S.optgroups[p],qe===void 0?p="":$o=qe.$order;let[os,rs]=ge(p,$o);n>0&&($t=$t.cloneNode(!0),at($t,{id:vt.$id+"-clone-"+n,"aria-selected":null}),$t.classList.add("ts-cloned"),ce($t,"active"),S.activeOption&&S.activeOption.dataset.value==P&&O&&O.dataset.group===p.toString()&&(ut=$t)),rs.appendChild($t),p!=""&&(D[p]=os)}}S.settings.lockOptgroupOrder&&nt.sort((j,P)=>j.order-P.order),k=document.createDocumentFragment(),_t(nt,j=>{let P=j.fragment,vt=j.optgroup;if(!P||!P.children.length)return;let lt=S.optgroups[vt];if(lt!==void 0){let $t=document.createDocumentFragment(),$o=S.render("optgroup_header",lt);xe($t,$o),xe($t,P);let qe=S.render("optgroup",{group:lt,options:$t});xe(k,qe)}else xe(k,P)}),ot.innerHTML="",xe(ot,k),S.isDropdownContentStale=!1,S.settings.highlight&&(Tn(ot),Z.query.length&&Z.tokens.length&&_t(Z.tokens,j=>{In(ot,j.regex)}));var pt=j=>{let P=S.render(j,{input:F});return P&&(M=!0,ot.insertBefore(P,ot.firstChild)),P};if(S.loading?pt("loading"):S.settings.shouldLoad.call(S,F)?Z.items.length===0&&pt("no_results"):pt("not_loading"),_=S.canCreate(F),_&&(T=pt("option_create")),S.hasOptions=Z.items.length>0||_,M){if(Z.items.length>0){if(!ut&&S.settings.mode==="single"&&S.items[0]!=null&&(ut=S.getOption(S.items[0])),!ot.contains(ut)){let j=0;T&&!S.settings.addPrecedence&&(j=1),ut=S.selectable()[j]}}else T&&(ut=T);r&&!S.isOpen&&(S.open(),S.scrollToOption(ut,"auto")),S.setActiveOption(ut)}else S.clearActiveOption(),r&&S.isOpen&&S.close(!1)}selectable(){return this.dropdown_content.querySelectorAll("[data-selectable]")}addOption(r,i=!1){let n=this;if(Array.isArray(r))return n.addOptions(r,i),!1;let u=Dt(r[n.settings.valueField]);return u===null||n.options.hasOwnProperty(u)?(n.updateOption(r[n.settings.valueField],r),!1):(r.$order=r.$order||++n.order,r.$id=n.inputId+"-opt-"+r.$order,n.options[u]=r,n.isDropdownContentStale=!0,i&&(n.userOptions[u]=i,n.trigger("option_add",u,r)),u)}addOptions(r,i=!1){_t(r,n=>{this.addOption(n,i)})}registerOption(r){return this.addOption(r)}registerOptionGroup(r){var i=Dt(r[this.settings.optgroupValueField]);return i===null?!1:(r.$order=r.$order||++this.order,this.optgroups[i]=r,i)}addOptionGroup(r,i){var n;i[this.settings.optgroupValueField]=r,(n=this.registerOptionGroup(i))&&this.trigger("optgroup_add",n,i)}removeOptionGroup(r){this.optgroups.hasOwnProperty(r)&&(delete this.optgroups[r],this.clearCache(),this.trigger("optgroup_remove",r))}clearOptionGroups(){this.optgroups={},this.clearCache(),this.trigger("optgroup_clear")}updateOption(r,i){let n=this;var u,f;let p=Dt(r),b=Dt(i[n.settings.valueField]);if(p===null)return;let k=n.options[p];if(k==null)return;if(typeof b!="string")throw new Error("Value must be set in option data");let _=n.getOption(p),O=n.getItem(p);if(i.$order=i.$order||k.$order,delete n.options[p],n.uncacheValue(b),n.options[b]=i,_){if(n.dropdown_content.contains(_)){let T=n._render("option",i);mr(_,T),n.activeOption===_&&n.setActiveOption(T)}_.remove()}O&&(f=n.items.indexOf(p),f!==-1&&n.items.splice(f,1,b),u=n._render("item",i),O.classList.contains("active")&&Et(u,"active"),mr(O,u)),n.isDropdownContentStale=!0}removeOption(r,i){let n=this;r=_o(r),n.uncacheValue(r),delete n.userOptions[r],delete n.options[r],n.isDropdownContentStale=!0,n.trigger("option_remove",r),n.removeItem(r,i)}clearOptions(r){let i=(r||this.clearFilter).bind(this);this.loadedSearches={},this.userOptions={},this.clearCache();let n={};_t(this.options,(u,f)=>{i(u,f)&&(n[f]=u)}),this.options=this.sifter.items=n,this.isDropdownContentStale=!0,this.trigger("option_clear")}clearFilter(r,i){return this.items.indexOf(i)>=0}getOption(r,i=!1){let n=Dt(r);if(n===null)return null;let u=this.options[n];if(u!=null){if(u.$div)return u.$div;if(i)return this._render("option",u)}return null}getAdjacent(r,i,n="option"){var u=this,f;if(!r)return null;n=="item"?f=u.controlChildren():f=u.dropdown_content.querySelectorAll("[data-selectable]");for(let p=0;p<f.length;p++)if(f[p]==r)return i>0?f[p+1]:f[p-1];return null}getItem(r){if(typeof r=="object")return r;var i=Dt(r);return i!==null?this.control.querySelector(`[data-value="${ri(i)}"]`):null}addItems(r,i){var n=this,u=Array.isArray(r)?r:[r];u=u.filter(p=>n.items.indexOf(p)===-1);let f=u[u.length-1];u.forEach(p=>{n.isPending=p!==f,n.addItem(p,i)})}addItem(r,i){var n=i?[]:["change","dropdown_close"];oi(this,n,()=>{var u,f;let p=this,b=p.settings.mode,k=Dt(r);if(!(k&&p.items.indexOf(k)!==-1&&(b==="single"&&p.close(),b==="single"||!p.settings.duplicates))&&!(k===null||!p.options.hasOwnProperty(k))&&(b==="single"&&p.clear(i),!(b==="multi"&&p.isFull()))){if(u=p._render("item",p.options[k]),p.control.contains(u)&&(u=u.cloneNode(!0)),f=p.isFull(),p.items.splice(p.caretPos,0,k),p.insertAtCaret(u),p.isSetup){if(!p.isPending&&p.settings.hideSelected){let _=p.getOption(k),O=p.getAdjacent(_,1);O&&p.setActiveOption(O)}p.settings.clearAfterSelect&&p.setTextboxValue(),!p.isPending&&!p.settings.closeAfterSelect&&p.refreshOptions(p.isFocused&&b!=="single"),p.settings.closeAfterSelect!=!1&&p.isFull()?p.close():p.isPending||p.positionDropdown(),p.trigger("item_add",k,u),p.isPending||p.updateOriginalInput({silent:i})}(!p.isPending||!f&&p.isFull())&&(p.inputState(),p.refreshState())}})}removeItem(r=null,i){let n=this;if(r=n.getItem(r),!r)return;var u,f;let p=r.dataset.value;u=Ao(r),r.remove(),r.classList.contains("active")&&(f=n.activeItems.indexOf(r),n.activeItems.splice(f,1),ce(r,"active")),n.items.splice(u,1),n.isDropdownContentStale=!0,!n.settings.persist&&n.userOptions.hasOwnProperty(p)&&n.removeOption(p,i),u<n.caretPos&&n.setCaret(n.caretPos-1),n.updateOriginalInput({silent:i}),n.refreshState(),n.positionDropdown(),n.trigger("item_remove",p,r)}createItem(r=null,i=()=>{}){arguments.length===3&&(i=arguments[2]),typeof i!="function"&&(i=()=>{});var n=this,u=n.caretPos,f;if(r=r||n.inputValue(),!n.canCreate(r))return Dt(r)&&this.options[r]&&n.addItem(r),i(),!1;n.lock();var p=!1,b=k=>{if(n.unlock(),!k||typeof k!="object")return i();var _=Dt(k[n.settings.valueField]);if(typeof _!="string")return i();n.setTextboxValue(),n.addOption(k,!0),n.setCaret(u),n.addItem(_),i(k),p=!0};return typeof n.settings.create=="function"?f=n.settings.create.call(this,r,b):f={[n.settings.labelField]:r,[n.settings.valueField]:r},p||b(f),!0}refreshItems(){var r=this;r.isDropdownContentStale=!0,r.isSetup&&r.addItems(r.items),r.updateOriginalInput(),r.refreshState()}refreshState(){let r=this;r.refreshValidityState();let i=r.isFull(),n=r.isLocked;r.wrapper.classList.toggle("rtl",r.rtl);let u=r.wrapper.classList;u.toggle("focus",r.isFocused),u.toggle("disabled",r.isDisabled),u.toggle("readonly",r.isReadOnly),u.toggle("required",r.isRequired),u.toggle("invalid",!r.isValid),u.toggle("locked",n),u.toggle("full",i),u.toggle("input-active",r.isFocused&&!r.isInputHidden),u.toggle("dropdown-active",r.isOpen),u.toggle("has-options",zn(r.options)),u.toggle("has-items",r.items.length>0)}refreshValidityState(){var r=this;r.input.validity&&(r.isValid=r.input.validity.valid,r.isInvalid=!r.isValid)}isFull(){return this.settings.maxItems!==null&&this.items.length>=this.settings.maxItems}updateOriginalInput(r={}){let i=this;var n,u;let f=i.input.querySelector('option[value=""]');if(i.is_select_tag){let k=function(_,O,T){return _||(_=yt('<option value="'+ko(O)+'">'+ko(T)+"</option>")),_!=f&&i.input.append(_),p.push(_),(_!=f||b>0)&&(_.selected=!0),_},p=[],b=i.input.querySelectorAll("option:checked").length;i.input.querySelectorAll("option:checked").forEach(_=>{_.selected=!1}),i.items.length==0&&i.settings.mode=="single"?k(f,"",""):i.items.forEach(_=>{if(n=i.options[_],u=n[i.settings.labelField]||"",p.includes(n.$option)){let O=i.input.querySelector(`option[value="${ri(_)}"]:not(:checked)`);k(O,_,u)}else n.$option=k(n.$option,_,u)})}else i.input.value=i.getValue();i.isSetup&&(r.silent||i.trigger("change",i.getValue()))}open(){var r=this;r.isLocked||r.isOpen||r.settings.mode==="multi"&&r.isFull()||(r.isOpen=!0,at(r.focus_node,{"aria-expanded":"true"}),r.refreshState(),Lo(r.dropdown,{visibility:"hidden",display:"block"}),r.positionDropdown(),Lo(r.dropdown,{visibility:"visible",display:"block"}),r.focus(),r.trigger("dropdown_open",r.dropdown))}close(r=!0){var i=this,n=i.isOpen;r&&(i.setTextboxValue(),i.settings.mode==="single"&&i.items.length&&i.inputState()),i.isOpen=!1,at(i.focus_node,{"aria-expanded":"false"}),Lo(i.dropdown,{display:"none"}),i.settings.hideSelected&&i.clearActiveOption(),i.refreshState(),n&&i.trigger("dropdown_close",i.dropdown)}positionDropdown(){if(this.settings.dropdownParent==="body"){var r=this.control,i=r.getBoundingClientRect(),n=r.offsetHeight+i.top+window.scrollY,u=i.left+window.scrollX;Lo(this.dropdown,{width:i.width+"px",top:n+"px",left:u+"px"})}}clear(r){var i=this;if(i.items.length){var n=i.controlChildren();_t(n,u=>{i.removeItem(u,!0)}),i.inputState(),r||i.updateOriginalInput(),i.trigger("clear")}}insertAtCaret(r){let i=this,n=i.caretPos,u=i.control;u.insertBefore(r,u.children[n]||null),i.setCaret(n+1)}deleteSelection(r){var i,n,u,f,p=this;i=r&&r.keyCode===di?-1:1,n=On(p.control_input);let b=[];if(p.activeItems.length)f=si(p.activeItems,i),u=Ao(f),i>0&&u++,_t(p.activeItems,k=>b.push(k));else if((p.isFocused||p.settings.mode==="single")&&p.items.length){let k=p.controlChildren(),_;i<0&&n.start===0&&n.length===0?_=k[p.caretPos-1]:i>0&&n.start===p.inputValue().length&&(_=k[p.caretPos]),_!==void 0&&b.push(_)}if(!p.shouldDelete(b,r))return!1;for(G(r,!0),typeof u<"u"&&p.setCaret(u);b.length;)p.removeItem(b.pop());return p.inputState(),p.positionDropdown(),p.refreshOptions(!1),!0}shouldDelete(r,i){let n=r.map(u=>u.dataset.value);return!(!n.length||typeof this.settings.onDelete=="function"&&this.settings.onDelete.call(this,n,i)===!1)}advanceSelection(r,i){var n,u,f=this;f.rtl&&(r*=-1),!f.inputValue().length&&(ye(Eo,i)||ye("shiftKey",i)?(n=f.getLastActive(r),n?n.classList.contains("active")?u=f.getAdjacent(n,r,"item"):u=n:r>0?u=f.control_input.nextElementSibling:u=f.control_input.previousElementSibling,u&&(u.classList.contains("active")&&f.removeActiveItem(n),f.setActiveItemClass(u))):f.moveCaret(r))}moveCaret(r){}getLastActive(r){let i=this.control.querySelector(".last-active");if(i)return i;var n=this.control.querySelectorAll(".active");if(n)return si(n,r)}setCaret(r){this.caretPos=this.items.length}controlChildren(){return Array.from(this.control.querySelectorAll("[data-ts-item]"))}lock(){this.setLocked(!0)}unlock(){this.setLocked(!1)}setLocked(r=this.isReadOnly||this.isDisabled){this.isLocked=r,this.refreshState()}disable(){this.setDisabled(!0),this.close()}enable(){this.setDisabled(!1)}setDisabled(r){this.focus_node.tabIndex=r?-1:this.tabIndex,this.isDisabled=r,this.input.disabled=r,this.control_input.disabled=r,this.setLocked()}setReadOnly(r){this.isReadOnly=r,this.input.readOnly=r,this.control_input.readOnly=r,this.setLocked()}destroy(){var r=this,i=r.revertSettings;r.trigger("destroy"),r.off(),r.wrapper.remove(),r.dropdown.remove(),r.input.innerHTML=i.innerHTML,r.input.tabIndex=i.tabIndex,ce(r.input,"tomselected","ts-hidden-accessible"),r._destroy(),delete r.input.tomselect}render(r,i){var n,u;let f=this;if(typeof this.settings.render[r]!="function"||(u=f.settings.render[r].call(this,i,ko),!u))return null;if(u=yt(u),r==="option"||r==="option_create"?i[f.settings.disabledField]?at(u,{"aria-disabled":"true"}):at(u,{"data-selectable":""}):r==="optgroup"&&(n=i.group[f.settings.optgroupValueField],at(u,{"data-group":n}),i.group[f.settings.disabledField]&&at(u,{"data-disabled":""})),r==="option"||r==="item"){let p=_o(i[f.settings.valueField]);at(u,{"data-value":p}),r==="item"?(Et(u,f.settings.itemClass),at(u,{"data-ts-item":""})):(Et(u,f.settings.optionClass),at(u,{role:"option",id:i.$id}),i.$div=u,f.options[p]=i)}return u}_render(r,i){let n=this.render(r,i);if(n==null)throw"HTMLElement expected";return n}clearCache(){_t(this.options,r=>{r.$div&&(r.$div.remove(),delete r.$div)})}uncacheValue(r){let i=this.getOption(r);i&&i.remove()}canCreate(r){return this.settings.create&&r.length>0&&this.settings.createFilter.call(this,r)}hook(r,i,n){var u=this,f=u[i];u[i]=function(){var p,b;return r==="after"&&(p=f.apply(u,arguments)),b=n.apply(u,arguments),r==="instead"?b:(r==="before"&&(p=f.apply(u,arguments)),p)}}}function Rn(){X(this.input,"change",()=>{this.sync()})}function qn(l){var r=this,i=r.onOptionSelect;r.settings.hideSelected=!1;let n=Object.assign({className:"tomselect-checkbox",checkedClassNames:void 0,uncheckedClassNames:void 0},l);var u=function(b,k){k?(b.checked=!0,n.uncheckedClassNames&&b.classList.remove(...n.uncheckedClassNames),n.checkedClassNames&&b.classList.add(...n.checkedClassNames)):(b.checked=!1,n.checkedClassNames&&b.classList.remove(...n.checkedClassNames),n.uncheckedClassNames&&b.classList.add(...n.uncheckedClassNames))},f=function(b){setTimeout(()=>{var k=b.querySelector("input."+n.className);k instanceof HTMLInputElement&&u(k,b.classList.contains("selected"))},1)};r.hook("after","setupTemplates",()=>{var p=r.settings.render.option;r.settings.render.option=(b,k)=>{var _=yt(p.call(r,b,k)),O=document.createElement("input");n.className&&O.classList.add(n.className),O.addEventListener("click",function(D){G(D)}),O.type="checkbox";let T=Dt(b[r.settings.valueField]);return u(O,!!(T&&r.items.indexOf(T)>-1)),_.prepend(O),_}}),r.on("item_remove",p=>{var b=r.getOption(p);b&&(b.classList.remove("selected"),f(b))}),r.on("item_add",p=>{var b=r.getOption(p);b&&f(b)}),r.hook("instead","onOptionSelect",(p,b)=>{if(b.classList.contains("selected")){b.classList.remove("selected"),r.removeItem(b.dataset.value),r.refreshOptions(),G(p,!0);return}i.call(r,p,b),f(b)})}function Nn(l){let r=this,i=Object.assign({className:"clear-button",title:"Clear All",role:"button",tabindex:0,html:n=>`<div class="${n.className}" title="${n.title}" role="${n.role}" tabindex="${n.tabindex}">&times;</div>`},l);r.on("initialize",()=>{var n=yt(i.html(i));n.addEventListener("click",u=>{r.isLocked||(r.clear(),r.settings.mode==="single"&&r.settings.allowEmptyOption&&r.addItem(""),r.refreshOptions(!1),u.preventDefault(),u.stopPropagation())}),r.control.appendChild(n)})}let Vn=(l,r)=>{var i;(i=l.parentNode)==null||i.insertBefore(r,l.nextSibling)},Hn=(l,r)=>{var i;(i=l.parentNode)==null||i.insertBefore(r,l)},Un=(l,r)=>{do{var i;if(r=(i=r)==null?void 0:i.previousElementSibling,l==r)return!0}while(r&&r.previousElementSibling);return!1};function Wn(){var l=this;if(l.settings.mode!=="multi")return;var r=l.lock,i=l.unlock;let n=!0,u;l.hook("after","setupTemplates",()=>{var f=l.settings.render.item;l.settings.render.item=(p,b)=>{let k=yt(f.call(l,p,b));at(k,{draggable:"true"});let _=F=>{n||G(F),F.stopPropagation()},O=F=>{u=k,setTimeout(()=>{k.classList.add("ts-dragging")},0)},T=F=>{F.preventDefault(),k.classList.add("ts-drag-over"),nt(k,u)},D=()=>{k.classList.remove("ts-drag-over")},nt=(F,Y)=>{Y!==void 0&&(Un(Y,k)?Vn(F,Y):Hn(F,Y))},S=()=>{var F;document.querySelectorAll(".ts-drag-over").forEach(Z=>Z.classList.remove("ts-drag-over")),(F=u)==null||F.classList.remove("ts-dragging"),u=void 0;var Y=[];l.control.querySelectorAll("[data-value]").forEach(Z=>{if(Z.dataset.value){let ut=Z.dataset.value;ut&&Y.push(ut)}}),l.setValue(Y)};return X(k,"mousedown",_),X(k,"dragstart",O),X(k,"dragenter",T),X(k,"dragover",T),X(k,"dragleave",D),X(k,"dragend",S),k}}),l.hook("instead","lock",()=>(n=!1,r.call(l))),l.hook("instead","unlock",()=>(n=!0,i.call(l)))}function jn(l){let r=this,i=Object.assign({title:"Untitled",headerClass:"dropdown-header",titleRowClass:"dropdown-header-title",labelClass:"dropdown-header-label",closeClass:"dropdown-header-close",html:n=>'<div class="'+n.headerClass+'"><div class="'+n.titleRowClass+'"><span class="'+n.labelClass+'">'+n.title+'</span><a class="'+n.closeClass+'">&times;</a></div></div>'},l);r.on("initialize",()=>{var n=yt(i.html(i)),u=n.querySelector("."+i.closeClass);u&&u.addEventListener("click",f=>{G(f,!0),r.close()}),r.dropdown.insertBefore(n,r.dropdown.firstChild)})}function Kn(){var l=this;l.hook("instead","setCaret",r=>{l.settings.mode==="single"||!l.control.contains(l.control_input)?r=l.items.length:(r=Math.max(0,Math.min(l.items.length,r)),r!=l.caretPos&&!l.isPending&&l.controlChildren().forEach((i,n)=>{n<r?l.control_input.insertAdjacentElement("beforebegin",i):l.control.appendChild(i)})),l.caretPos=r}),l.hook("instead","moveCaret",r=>{if(!l.isFocused)return;let i=l.getLastActive(r);if(i){let n=Ao(i);l.setCaret(r>0?n+1:n),l.setActiveItem(),ce(i,"last-active")}else l.setCaret(l.caretPos+r)})}function Yn(){let l=this;l.settings.shouldOpen=!0,l.hook("before","setup",()=>{var r;l.focus_node=l.control,Et(l.control_input,"dropdown-input");let i=yt('<div class="dropdown-input-wrap">');i.append(l.control_input),l.dropdown.insertBefore(i,l.dropdown.firstChild);let n=yt('<input class="items-placeholder" tabindex="-1" />');n.placeholder=l.settings.placeholder||"",l.control.append(n);let u=(r=l.input)==null?void 0:r.getAttribute("aria-label");u&&n.setAttribute("aria-label",u)}),l.on("initialize",()=>{l.control_input.addEventListener("keydown",i=>{switch(i.keyCode){case li:l.isOpen&&(G(i,!0),l.close()),l.clearActiveItems();return;case vr:l.focus_node.tabIndex=-1;break}return l.onKeyDown.call(l,i)}),l.on("blur",()=>{l.focus_node.tabIndex=l.isDisabled?-1:l.tabIndex}),l.on("dropdown_open",()=>{l.control_input.focus()});let r=l.onBlur;l.hook("instead","onBlur",i=>{if(!(i&&i.relatedTarget==l.control_input))return r.call(l)}),X(l.control_input,"blur",()=>l.onBlur()),l.hook("before","close",()=>{l.isOpen&&l.focus_node.focus({preventScroll:!0})})})}function Gn(){var l=this;l.on("initialize",()=>{var r=document.createElement("span"),i=l.control_input;r.style.cssText="position:absolute; top:-99999px; left:-99999px; width:auto; padding:0; white-space:pre; ",l.wrapper.appendChild(r);var n=["letterSpacing","fontSize","fontFamily","fontWeight","textTransform"];for(let f of n)r.style[f]=i.style[f];var u=()=>{r.textContent=i.value,i.style.width=r.clientWidth+"px"};u(),l.on("update item_add item_remove",u),X(i,"input",u),X(i,"keyup",u),X(i,"blur",u),X(i,"update",u)})}function Xn(){var l=this,r=l.deleteSelection;this.hook("instead","deleteSelection",i=>l.activeItems.length?r.call(l,i):!1)}function Jn(){this.hook("instead","setActiveItem",()=>{}),this.hook("instead","selectAll",()=>{})}function Qn(){var l=this,r=l.onKeyDown;l.hook("instead","onKeyDown",i=>{var n,u,f,p;if(!l.isOpen||!(i.keyCode===gr||i.keyCode===ci))return r.call(l,i);l.ignoreHover=!0,p=So(l.activeOption,"[data-group]"),n=Ao(l.activeOption,"[data-selectable]"),p&&(i.keyCode===gr?p=p.previousSibling:p=p.nextSibling,p&&(f=p.querySelectorAll("[data-selectable]"),u=f[Math.min(f.length-1,n)],u&&l.setActiveOption(u)))})}function Zn(l){let r=Object.assign({label:"&times;",title:"Remove",className:"remove",append:!0},l);var i=this;if(r.append){var n='<a href="javascript:void(0)" class="'+r.className+'" tabindex="-1" title="'+ko(r.title)+'">'+r.label+"</a>";i.hook("after","setupTemplates",()=>{var u=i.settings.render.item;i.settings.render.item=(f,p)=>{var b=yt(u.call(i,f,p)),k=yt(n);return b.appendChild(k),X(k,"mousedown",_=>{G(_,!0)}),X(k,"click",_=>{i.isLocked||(G(_,!0),!i.isLocked&&i.shouldDelete([b],_)&&(i.removeItem(b),i.refreshOptions(!1),i.inputState()))}),b}})}}function ts(l){let r=this,i=Object.assign({text:n=>n[r.settings.labelField]},l);r.on("item_remove",function(n){if(r.isFocused&&r.control_input.value.trim()===""){var u=r.options[n];u&&r.setTextboxValue(i.text.call(r,u))}})}function es(){let l=this,r=l.canLoad,i=l.clearActiveOption,n=l.loadCallback;var u={},f,p=!1,b,k=[],_=!1,O;if(l.settings.shouldLoadMore||(l.settings.shouldLoadMore=()=>{if(f.clientHeight/(f.scrollHeight-f.scrollTop)>.9)return!0;if(l.activeOption){var F=l.selectable(),Y=Array.from(F).indexOf(l.activeOption);if(Y>=F.length-2)return!0}return!1}),!l.settings.firstUrl)throw"virtual_scroll plugin requires a firstUrl() method";l.settings.sortField=[{field:"$order"},{field:"$score"}];let T=S=>typeof l.settings.maxOptions=="number"&&f.children.length>=l.settings.maxOptions?!1:!!(S in u&&u[S]),D=(S,F)=>l.items.indexOf(F)>=0||k.indexOf(F)>=0;l.setNextUrl=(S,F)=>{u[S]=F},l.getUrl=S=>{if(S in u){let F=u[S];return u[S]=!1,F}return l.clearPagination(),l.settings.firstUrl.call(l,S)},l.clearPagination=()=>{u={}},l.hook("instead","clearActiveOption",()=>{if(!p)return i.call(l)}),l.hook("instead","canLoad",S=>S in u?T(S):r.call(l,S)),l.hook("instead","loadCallback",(S,F)=>{if(!p)l.clearOptions(D);else if(b){let Y=S[0];Y!==void 0&&(b.dataset.value=Y[l.settings.valueField])}n.call(l,S,F),!p&&!_&&(_=!0,l.lastValue===""&&(k=Object.keys(l.options),O=u[""])),p=!1}),l.hook("before","refreshOptions",()=>{l.activeOption&&l.activeOption.getAttribute("role")!=="option"&&l.setActiveOption(l.activeOption.previousElementSibling)}),l.hook("after","refreshOptions",()=>{let S=l.lastValue;var F;T(S)?(F=l.render("loading_more",{query:S}),F&&(F.setAttribute("data-selectable",""),b=F)):S in u&&!f.querySelector(".no-results")&&(F=l.render("no_more_results",{query:S})),F&&(Et(F,l.settings.optionClass),f.append(F))});let nt=()=>{_&&(l.clearOptions(D),O&&(u[""]=O))};l.on("type",S=>{S===""&&(nt(),l.refreshOptions(!1))}),l.on("dropdown_close",nt),l.on("initialize",()=>{k=Object.keys(l.options),f=l.dropdown_content,l.settings.render=Object.assign({},{loading_more:()=>'<div class="loading-more-results">Loading more results ... </div>',no_more_results:()=>'<div class="no-more-results">No more results</div>'},l.settings.render),f.addEventListener("scroll",()=>{l.settings.shouldLoadMore.call(l)&&T(l.lastValue)&&(p||(p=!0,l.load.call(l,l.lastValue)))})})}return Ot.define("change_listener",Rn),Ot.define("checkbox_options",qn),Ot.define("clear_button",Nn),Ot.define("drag_drop",Wn),Ot.define("dropdown_header",jn),Ot.define("caret_position",Kn),Ot.define("dropdown_input",Yn),Ot.define("input_autogrow",Gn),Ot.define("no_backspace_delete",Xn),Ot.define("no_active_items",Jn),Ot.define("optgroup_columns",Qn),Ot.define("remove_button",Zn),Ot.define("restore_on_backspace",ts),Ot.define("virtual_scroll",es),Ot}))});var zo=()=>({checkValidity(t){let e=t.input,o={message:"",isValid:!0,invalidKeys:[]};if(!e)return o;let a=!0;if("checkValidity"in e&&(a=e.checkValidity()),a)return o;if(o.isValid=!1,"validationMessage"in e&&(o.message=e.validationMessage),!("validity"in e))return o.invalidKeys.push("customError"),o;for(let s in e.validity){if(s==="valid")continue;let c=s;e.validity[c]&&o.invalidKeys.push(c)}return o}});var Io=class extends Event{constructor(){super("wa-invalid",{bubbles:!0,cancelable:!1,composed:!0})}};var ps=Object.defineProperty,hs=Object.getOwnPropertyDescriptor,mi=t=>{throw TypeError(t)},h=(t,e,o,a)=>{for(var s=a>1?void 0:a?hs(e,o):e,c=t.length-1,d;c>=0;c--)(d=t[c])&&(s=(a?d(e,o,s):d(s))||s);return a&&s&&ps(e,o,s),s},gi=(t,e,o)=>e.has(t)||mi("Cannot "+o),vi=(t,e,o)=>(gi(t,e,"read from private field"),o?o.call(t):e.get(t)),wi=(t,e,o)=>e.has(t)?mi("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,o),bi=(t,e,o,a)=>(gi(t,e,"write to private field"),a?a.call(t,o):e.set(t,o),o);var To=globalThis,Fo=To.ShadowRoot&&(To.ShadyCSS===void 0||To.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,wr=Symbol(),yi=new WeakMap,ro=class{constructor(e,o,a){if(this._$cssResult$=!0,a!==wr)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=o}get styleSheet(){let e=this.o,o=this.t;if(Fo&&e===void 0){let a=o!==void 0&&o.length===1;a&&(e=yi.get(o)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),a&&yi.set(o,e))}return e}toString(){return this.cssText}},xi=t=>new ro(typeof t=="string"?t:t+"",void 0,wr),H=(t,...e)=>{let o=t.length===1?t[0]:e.reduce((a,s,c)=>a+(d=>{if(d._$cssResult$===!0)return d.cssText;if(typeof d=="number")return d;throw Error("Value passed to 'css' function must be a 'css' function result: "+d+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[c+1],t[0]);return new ro(o,t,wr)},Ci=(t,e)=>{if(Fo)t.adoptedStyleSheets=e.map(o=>o instanceof CSSStyleSheet?o:o.styleSheet);else for(let o of e){let a=document.createElement("style"),s=To.litNonce;s!==void 0&&a.setAttribute("nonce",s),a.textContent=o.cssText,t.appendChild(a)}},br=Fo?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let o="";for(let a of e.cssRules)o+=a.cssText;return xi(o)})(t):t;var{is:fs,defineProperty:ms,getOwnPropertyDescriptor:gs,getOwnPropertyNames:vs,getOwnPropertySymbols:ws,getPrototypeOf:bs}=Object,Mo=globalThis,_i=Mo.trustedTypes,ys=_i?_i.emptyScript:"",xs=Mo.reactiveElementPolyfillSupport,io=(t,e)=>t,ao={toAttribute(t,e){switch(e){case Boolean:t=t?ys:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let o=t;switch(e){case Boolean:o=t!==null;break;case Number:o=t===null?null:Number(t);break;case Object:case Array:try{o=JSON.parse(t)}catch{o=null}}return o}},Bo=(t,e)=>!fs(t,e),ki={attribute:!0,type:String,converter:ao,reflect:!1,useDefault:!1,hasChanged:Bo};Symbol.metadata??=Symbol("metadata"),Mo.litPropertyMetadata??=new WeakMap;var de=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,o=ki){if(o.state&&(o.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((o=Object.create(o)).wrapped=!0),this.elementProperties.set(e,o),!o.noAccessor){let a=Symbol(),s=this.getPropertyDescriptor(e,a,o);s!==void 0&&ms(this.prototype,e,s)}}static getPropertyDescriptor(e,o,a){let{get:s,set:c}=gs(this.prototype,e)??{get(){return this[o]},set(d){this[o]=d}};return{get:s,set(d){let m=s?.call(this);c?.call(this,d),this.requestUpdate(e,m,a)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ki}static _$Ei(){if(this.hasOwnProperty(io("elementProperties")))return;let e=bs(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(io("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(io("properties"))){let o=this.properties,a=[...vs(o),...ws(o)];for(let s of a)this.createProperty(s,o[s])}let e=this[Symbol.metadata];if(e!==null){let o=litPropertyMetadata.get(e);if(o!==void 0)for(let[a,s]of o)this.elementProperties.set(a,s)}this._$Eh=new Map;for(let[o,a]of this.elementProperties){let s=this._$Eu(o,a);s!==void 0&&this._$Eh.set(s,o)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let o=[];if(Array.isArray(e)){let a=new Set(e.flat(1/0).reverse());for(let s of a)o.unshift(br(s))}else e!==void 0&&o.push(br(e));return o}static _$Eu(e,o){let a=o.attribute;return a===!1?void 0:typeof a=="string"?a:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,o=this.constructor.elementProperties;for(let a of o.keys())this.hasOwnProperty(a)&&(e.set(a,this[a]),delete this[a]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ci(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,o,a){this._$AK(e,a)}_$ET(e,o){let a=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,a);if(s!==void 0&&a.reflect===!0){let c=(a.converter?.toAttribute!==void 0?a.converter:ao).toAttribute(o,a.type);this._$Em=e,c==null?this.removeAttribute(s):this.setAttribute(s,c),this._$Em=null}}_$AK(e,o){let a=this.constructor,s=a._$Eh.get(e);if(s!==void 0&&this._$Em!==s){let c=a.getPropertyOptions(s),d=typeof c.converter=="function"?{fromAttribute:c.converter}:c.converter?.fromAttribute!==void 0?c.converter:ao;this._$Em=s;let m=d.fromAttribute(o,c.type);this[s]=m??this._$Ej?.get(s)??m,this._$Em=null}}requestUpdate(e,o,a,s=!1,c){if(e!==void 0){let d=this.constructor;if(s===!1&&(c=this[e]),a??=d.getPropertyOptions(e),!((a.hasChanged??Bo)(c,o)||a.useDefault&&a.reflect&&c===this._$Ej?.get(e)&&!this.hasAttribute(d._$Eu(e,a))))return;this.C(e,o,a)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,o,{useDefault:a,reflect:s,wrapped:c},d){a&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,d??o??this[e]),c!==!0||d!==void 0)||(this._$AL.has(e)||(this.hasUpdated||a||(o=void 0),this._$AL.set(e,o)),s===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(o){Promise.reject(o)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,c]of this._$Ep)this[s]=c;this._$Ep=void 0}let a=this.constructor.elementProperties;if(a.size>0)for(let[s,c]of a){let{wrapped:d}=c,m=this[s];d!==!0||this._$AL.has(s)||m===void 0||this.C(s,void 0,c,m)}}let e=!1,o=this._$AL;try{e=this.shouldUpdate(o),e?(this.willUpdate(o),this._$EO?.forEach(a=>a.hostUpdate?.()),this.update(o)):this._$EM()}catch(a){throw e=!1,this._$EM(),a}e&&this._$AE(o)}willUpdate(e){}_$AE(e){this._$EO?.forEach(o=>o.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(o=>this._$ET(o,this[o])),this._$EM()}updated(e){}firstUpdated(e){}};de.elementStyles=[],de.shadowRootOptions={mode:"open"},de[io("elementProperties")]=new Map,de[io("finalized")]=new Map,xs?.({ReactiveElement:de}),(Mo.reactiveElementVersions??=[]).push("2.1.2");var xr=globalThis,Li=t=>t,Do=xr.trustedTypes,Si=Do?Do.createPolicy("lit-html",{createHTML:t=>t}):void 0,Cr="$lit$",ue=`lit$${Math.random().toFixed(9).slice(2)}$`,_r="?"+ue,Cs=`<${_r}>`,ke=document,so=()=>ke.createComment(""),lo=t=>t===null||typeof t!="object"&&typeof t!="function",kr=Array.isArray,Ii=t=>kr(t)||typeof t?.[Symbol.iterator]=="function",yr=`[ 	
\f\r]`,no=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ai=/-->/g,Ei=/>/g,Ce=RegExp(`>|${yr}(?:([^\\s"'>=/]+)(${yr}*=${yr}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Oi=/'/g,$i=/"/g,Ti=/^(?:script|style|textarea|title)$/i,Lr=t=>(e,...o)=>({_$litType$:t,strings:e,values:o}),z=Lr(1),Fi=Lr(2),Mi=Lr(3),xt=Symbol.for("lit-noChange"),J=Symbol.for("lit-nothing"),zi=new WeakMap,_e=ke.createTreeWalker(ke,129);function Bi(t,e){if(!kr(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return Si!==void 0?Si.createHTML(e):e}var Di=(t,e)=>{let o=t.length-1,a=[],s,c=e===2?"<svg>":e===3?"<math>":"",d=no;for(let m=0;m<o;m++){let g=t[m],y,C,x=-1,A=0;for(;A<g.length&&(d.lastIndex=A,C=d.exec(g),C!==null);)A=d.lastIndex,d===no?C[1]==="!--"?d=Ai:C[1]!==void 0?d=Ei:C[2]!==void 0?(Ti.test(C[2])&&(s=RegExp("</"+C[2],"g")),d=Ce):C[3]!==void 0&&(d=Ce):d===Ce?C[0]===">"?(d=s??no,x=-1):C[1]===void 0?x=-2:(x=d.lastIndex-C[2].length,y=C[1],d=C[3]===void 0?Ce:C[3]==='"'?$i:Oi):d===$i||d===Oi?d=Ce:d===Ai||d===Ei?d=no:(d=Ce,s=void 0);let L=d===Ce&&t[m+1].startsWith("/>")?" ":"";c+=d===no?g+Cs:x>=0?(a.push(y),g.slice(0,x)+Cr+g.slice(x)+ue+L):g+ue+(x===-2?m:L)}return[Bi(t,c+(t[o]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),a]},co=class t{constructor({strings:e,_$litType$:o},a){let s;this.parts=[];let c=0,d=0,m=e.length-1,g=this.parts,[y,C]=Di(e,o);if(this.el=t.createElement(y,a),_e.currentNode=this.el.content,o===2||o===3){let x=this.el.content.firstChild;x.replaceWith(...x.childNodes)}for(;(s=_e.nextNode())!==null&&g.length<m;){if(s.nodeType===1){if(s.hasAttributes())for(let x of s.getAttributeNames())if(x.endsWith(Cr)){let A=C[d++],L=s.getAttribute(x).split(ue),E=/([.?@])?(.*)/.exec(A);g.push({type:1,index:c,name:E[2],strings:L,ctor:E[1]==="."?Ro:E[1]==="?"?qo:E[1]==="@"?No:Se}),s.removeAttribute(x)}else x.startsWith(ue)&&(g.push({type:6,index:c}),s.removeAttribute(x));if(Ti.test(s.tagName)){let x=s.textContent.split(ue),A=x.length-1;if(A>0){s.textContent=Do?Do.emptyScript:"";for(let L=0;L<A;L++)s.append(x[L],so()),_e.nextNode(),g.push({type:2,index:++c});s.append(x[A],so())}}}else if(s.nodeType===8)if(s.data===_r)g.push({type:2,index:c});else{let x=-1;for(;(x=s.data.indexOf(ue,x+1))!==-1;)g.push({type:7,index:c}),x+=ue.length-1}c++}}static createElement(e,o){let a=ke.createElement("template");return a.innerHTML=e,a}};function Le(t,e,o=t,a){if(e===xt)return e;let s=a!==void 0?o._$Co?.[a]:o._$Cl,c=lo(e)?void 0:e._$litDirective$;return s?.constructor!==c&&(s?._$AO?.(!1),c===void 0?s=void 0:(s=new c(t),s._$AT(t,o,a)),a!==void 0?(o._$Co??=[])[a]=s:o._$Cl=s),s!==void 0&&(e=Le(t,s._$AS(t,e.values),s,a)),e}var Po=class{constructor(e,o){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=o}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:o},parts:a}=this._$AD,s=(e?.creationScope??ke).importNode(o,!0);_e.currentNode=s;let c=_e.nextNode(),d=0,m=0,g=a[0];for(;g!==void 0;){if(d===g.index){let y;g.type===2?y=new Ne(c,c.nextSibling,this,e):g.type===1?y=new g.ctor(c,g.name,g.strings,this,e):g.type===6&&(y=new Vo(c,this,e)),this._$AV.push(y),g=a[++m]}d!==g?.index&&(c=_e.nextNode(),d++)}return _e.currentNode=ke,s}p(e){let o=0;for(let a of this._$AV)a!==void 0&&(a.strings!==void 0?(a._$AI(e,a,o),o+=a.strings.length-2):a._$AI(e[o])),o++}},Ne=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,o,a,s){this.type=2,this._$AH=J,this._$AN=void 0,this._$AA=e,this._$AB=o,this._$AM=a,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,o=this._$AM;return o!==void 0&&e?.nodeType===11&&(e=o.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,o=this){e=Le(this,e,o),lo(e)?e===J||e==null||e===""?(this._$AH!==J&&this._$AR(),this._$AH=J):e!==this._$AH&&e!==xt&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Ii(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==J&&lo(this._$AH)?this._$AA.nextSibling.data=e:this.T(ke.createTextNode(e)),this._$AH=e}$(e){let{values:o,_$litType$:a}=e,s=typeof a=="number"?this._$AC(e):(a.el===void 0&&(a.el=co.createElement(Bi(a.h,a.h[0]),this.options)),a);if(this._$AH?._$AD===s)this._$AH.p(o);else{let c=new Po(s,this),d=c.u(this.options);c.p(o),this.T(d),this._$AH=c}}_$AC(e){let o=zi.get(e.strings);return o===void 0&&zi.set(e.strings,o=new co(e)),o}k(e){kr(this._$AH)||(this._$AH=[],this._$AR());let o=this._$AH,a,s=0;for(let c of e)s===o.length?o.push(a=new t(this.O(so()),this.O(so()),this,this.options)):a=o[s],a._$AI(c),s++;s<o.length&&(this._$AR(a&&a._$AB.nextSibling,s),o.length=s)}_$AR(e=this._$AA.nextSibling,o){for(this._$AP?.(!1,!0,o);e!==this._$AB;){let a=Li(e).nextSibling;Li(e).remove(),e=a}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},Se=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,o,a,s,c){this.type=1,this._$AH=J,this._$AN=void 0,this.element=e,this.name=o,this._$AM=s,this.options=c,a.length>2||a[0]!==""||a[1]!==""?(this._$AH=Array(a.length-1).fill(new String),this.strings=a):this._$AH=J}_$AI(e,o=this,a,s){let c=this.strings,d=!1;if(c===void 0)e=Le(this,e,o,0),d=!lo(e)||e!==this._$AH&&e!==xt,d&&(this._$AH=e);else{let m=e,g,y;for(e=c[0],g=0;g<c.length-1;g++)y=Le(this,m[a+g],o,g),y===xt&&(y=this._$AH[g]),d||=!lo(y)||y!==this._$AH[g],y===J?e=J:e!==J&&(e+=(y??"")+c[g+1]),this._$AH[g]=y}d&&!s&&this.j(e)}j(e){e===J?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Ro=class extends Se{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===J?void 0:e}},qo=class extends Se{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==J)}},No=class extends Se{constructor(e,o,a,s,c){super(e,o,a,s,c),this.type=5}_$AI(e,o=this){if((e=Le(this,e,o,0)??J)===xt)return;let a=this._$AH,s=e===J&&a!==J||e.capture!==a.capture||e.once!==a.once||e.passive!==a.passive,c=e!==J&&(a===J||s);s&&this.element.removeEventListener(this.name,this,a),c&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Vo=class{constructor(e,o,a){this.element=e,this.type=6,this._$AN=void 0,this._$AM=o,this.options=a}get _$AU(){return this._$AM._$AU}_$AI(e){Le(this,e)}},Pi={M:Cr,P:ue,A:_r,C:1,L:Di,R:Po,D:Ii,V:Le,I:Ne,H:Se,N:qo,U:No,B:Ro,F:Vo},_s=xr.litHtmlPolyfillSupport;_s?.(co,Ne),(xr.litHtmlVersions??=[]).push("3.3.3");var Ri=(t,e,o)=>{let a=o?.renderBefore??e,s=a._$litPart$;if(s===void 0){let c=o?.renderBefore??null;a._$litPart$=s=new Ne(e.insertBefore(so(),c),c,void 0,o??{})}return s._$AI(t),s};var Sr=globalThis,Vt=class extends de{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let o=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Ri(o,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return xt}};Vt._$litElement$=!0,Vt.finalized=!0,Sr.litElementHydrateSupport?.({LitElement:Vt});var ks=Sr.litElementPolyfillSupport;ks?.({LitElement:Vt});(Sr.litElementVersions??=[]).push("4.2.2");var rt=t=>(e,o)=>{o!==void 0?o.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};var Ls={attribute:!0,type:String,converter:ao,reflect:!1,hasChanged:Bo},Ss=(t=Ls,e,o)=>{let{kind:a,metadata:s}=o,c=globalThis.litPropertyMetadata.get(s);if(c===void 0&&globalThis.litPropertyMetadata.set(s,c=new Map),a==="setter"&&((t=Object.create(t)).wrapped=!0),c.set(o.name,t),a==="accessor"){let{name:d}=o;return{set(m){let g=e.get.call(this);e.set.call(this,m),this.requestUpdate(d,g,t,!0,m)},init(m){return m!==void 0&&this.C(d,void 0,t,m),m}}}if(a==="setter"){let{name:d}=o;return function(m){let g=this[d];e.call(this,m),this.requestUpdate(d,g,t,!0,m)}}throw Error("Unsupported decorator location: "+a)};function v(t){return(e,o)=>typeof o=="object"?Ss(t,e,o):((a,s,c)=>{let d=s.hasOwnProperty(c);return s.constructor.createProperty(c,a),d?Object.getOwnPropertyDescriptor(s,c):void 0})(t,e,o)}function zt(t){return v({...t,state:!0,attribute:!1})}var Ae=(t,e,o)=>(o.configurable=!0,o.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(t,e,o),o);function st(t,e){return(o,a,s)=>{let c=d=>d.renderRoot?.querySelector(t)??null;if(e){let{get:d,set:m}=typeof a=="object"?o:s??(()=>{let g=Symbol();return{get(){return this[g]},set(y){this[g]=y}}})();return Ae(o,a,{get(){let g=d.call(this);return g===void 0&&(g=c(this),(g!==null||this.hasUpdated)&&m.call(this,g)),g}})}return Ae(o,a,{get(){return c(this)}})}}var As=H`
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
`,Ho,ct=class extends Vt{constructor(){super(),wi(this,Ho,!1),this.initialReflectedProperties=new Map,this.didSSR=!!this.shadowRoot,this.customStates={set:(e,o)=>{if(this.internals?.states)try{o?this.internals.states.add(e):this.internals.states.delete(e)}catch(a){if(String(a).includes("must start with '--'"))console.error("Your browser implements an outdated version of CustomStateSet. Consider using a polyfill");else throw a}},has:e=>{if(!this.internals?.states)return!1;try{return this.internals.states.has(e)}catch{return!1}}};try{this.internals=this.attachInternals()}catch{console.error("Element internals are not supported in your browser. Consider using a polyfill")}this.customStates.set("wa-defined",!0);let t=this.constructor;for(let[e,o]of t.elementProperties)o.default==="inherit"&&o.initial!==void 0&&typeof e=="string"&&this.customStates.set(`initial-${e}-${o.initial}`,!0)}static get styles(){let t=Array.isArray(this.css)?this.css:this.css?[this.css]:[];return[As,...t]}connectedCallback(){super.connectedCallback(),this.shadowRoot?.prepend(document.createComment(` Web Awesome: https://webawesome.com/docs/components/${this.localName.replace("wa-","")} `))}attributeChangedCallback(t,e,o){vi(this,Ho)||(this.constructor.elementProperties.forEach((a,s)=>{a.reflect&&this[s]!=null&&this.initialReflectedProperties.set(s,this[s])}),bi(this,Ho,!0)),super.attributeChangedCallback(t,e,o)}willUpdate(t){super.willUpdate(t),this.initialReflectedProperties.forEach((e,o)=>{t.has(o)&&this[o]==null&&(this[o]=e)})}firstUpdated(t){super.firstUpdated(t),this.didSSR&&this.shadowRoot?.querySelectorAll("slot").forEach(e=>{e.dispatchEvent(new Event("slotchange",{bubbles:!0,composed:!1,cancelable:!1}))})}update(t){try{super.update(t)}catch(e){if(this.didSSR&&!this.hasUpdated){let o=new Event("lit-hydration-error",{bubbles:!0,composed:!0,cancelable:!1});o.error=e,this.dispatchEvent(o)}throw e}}relayNativeEvent(t,e){t.stopImmediatePropagation(),this.dispatchEvent(new t.constructor(t.type,{...t,...e}))}};Ho=new WeakMap;h([v()],ct.prototype,"dir",2);h([v()],ct.prototype,"lang",2);h([v({type:Boolean,reflect:!0,attribute:"did-ssr"})],ct.prototype,"didSSR",2);var Es=()=>({observedAttributes:["custom-error"],checkValidity(t){let e={message:"",isValid:!0,invalidKeys:[]};return t.customError&&(e.message=t.customError,e.isValid=!1,e.invalidKeys=["customError"]),e}}),Ct=class extends ct{constructor(){super(),this.name=null,this.disabled=!1,this.required=!1,this.assumeInteractionOn=["input"],this.validators=[],this.valueHasChanged=!1,this.hasInteracted=!1,this.customError=null,this.emittedEvents=[],this.emitInvalid=t=>{t.target===this&&(this.hasInteracted=!0,this.dispatchEvent(new Io))},this.handleInteraction=t=>{let e=this.emittedEvents;e.includes(t.type)||e.push(t.type),e.length===this.assumeInteractionOn?.length&&(this.hasInteracted=!0)},this.addEventListener("invalid",this.emitInvalid)}static get validators(){return[Es()]}static get observedAttributes(){let t=new Set(super.observedAttributes||[]);for(let e of this.validators)if(e.observedAttributes)for(let o of e.observedAttributes)t.add(o);return[...t]}connectedCallback(){super.connectedCallback(),this.updateValidity(),this.assumeInteractionOn.forEach(t=>{this.addEventListener(t,this.handleInteraction)})}firstUpdated(...t){super.firstUpdated(...t),this.updateValidity()}willUpdate(t){if(!!1&&t.has("customError")&&(this.customError||(this.customError=null),this.setCustomValidity(this.customError||"")),t.has("value")||t.has("disabled")||t.has("defaultValue")){let e=this.value;if(Array.isArray(e)){if(this.name){let o=new FormData;for(let a of e)o.append(this.name,a);this.setValue(o,o)}}else this.setValue(e,e)}t.has("disabled")&&(this.customStates.set("disabled",this.disabled),(this.hasAttribute("disabled")||!!1&&!this.matches(":disabled"))&&this.toggleAttribute("disabled",this.disabled)),super.willUpdate(t),this.updateValidity()}get labels(){return this.internals.labels}getForm(){return this.internals.form}set form(t){t?this.setAttribute("form",t):this.removeAttribute("form")}get form(){return this.internals.form}get validity(){return this.internals.validity}get willValidate(){return this.internals.willValidate}get validationMessage(){return this.internals.validationMessage}checkValidity(){return this.updateValidity(),this.internals.checkValidity()}reportValidity(){return this.updateValidity(),this.hasInteracted=!0,this.internals.reportValidity()}get validationTarget(){return this.input||void 0}setValidity(...t){let e=t[0],o=t[1],a=t[2];a||(a=this.validationTarget),this.internals.setValidity(e,o,a||void 0),this.requestUpdate("validity"),this.setCustomStates()}setCustomStates(){let t=!!this.required,e=this.internals.validity.valid,o=this.hasInteracted;this.customStates.set("required",t),this.customStates.set("optional",!t),this.customStates.set("invalid",!e),this.customStates.set("valid",e),this.customStates.set("user-invalid",!e&&o),this.customStates.set("user-valid",e&&o)}setCustomValidity(t){if(!t){this.customError=null,this.setValidity({});return}this.customError=t,this.setValidity({customError:!0},t,this.validationTarget)}formResetCallback(){this.resetValidity(),this.hasInteracted=!1,this.valueHasChanged=!1,this.emittedEvents=[],this.updateValidity()}formDisabledCallback(t){this.disabled=t,this.updateValidity()}formStateRestoreCallback(t,e){this.value=t,e==="restore"&&this.resetValidity(),this.updateValidity()}setValue(...t){let[e,o]=t;this.internals.setFormValue(e,o)}get allValidators(){let t=this.constructor.validators||[],e=this.validators||[];return[...t,...e]}resetValidity(){this.setCustomValidity(""),this.setValidity({})}updateValidity(){if(this.disabled||this.hasAttribute("disabled")||!this.willValidate){this.resetValidity();return}let t=this.allValidators;if(!t?.length)return;let e={customError:!!this.customError},o=this.validationTarget||this.input||void 0,a="";for(let s of t){let{isValid:c,message:d,invalidKeys:m}=s.checkValidity(this);c||(a||(a=d),m?.length>=0&&m.forEach(g=>e[g]=!0))}a||(a=this.validationMessage),this.setValidity(e,a,o)}};Ct.formAssociated=!0;h([v({reflect:!0})],Ct.prototype,"name",2);h([v({type:Boolean})],Ct.prototype,"disabled",2);h([v({state:!0,attribute:!1})],Ct.prototype,"valueHasChanged",2);h([v({state:!0,attribute:!1})],Ct.prototype,"hasInteracted",2);h([v({attribute:"custom-error",reflect:!0})],Ct.prototype,"customError",2);h([v({attribute:!1,state:!0,type:Object})],Ct.prototype,"validity",1);var qi={small:"s",medium:"m",large:"l"},Ni=new Set;function Ht(t,e){e in qi&&!Ni.has(`${t}:${e}`)&&(Ni.add(`${t}:${e}`),console.warn(`[${t}] size="${e}" is deprecated. Use size="${qi[e]}" instead. The long-form value will be removed in the next major version.`))}var oe=class{constructor(t,...e){this.slotNames=[],this.handleSlotChange=o=>{let a=o.target;(this.slotNames.includes("[default]")&&!a.name||a.name&&this.slotNames.includes(a.name))&&this.host.requestUpdate()},(this.host=t).addController(this),this.slotNames=e}hasDefaultSlot(){return this.host.childNodes?[...this.host.childNodes].some(t=>{if(t.nodeType===Node.TEXT_NODE&&t.textContent.trim()!=="")return!0;if(t.nodeType===Node.ELEMENT_NODE){let e=t;if(e.tagName.toLowerCase()==="wa-visually-hidden")return!1;if(!e.hasAttribute("slot"))return!0}return!1}):!1}hasNamedSlot(t){return this.host.querySelector?.(`:scope > [slot="${t}"]`)!==null}test(t){return t==="[default]"?this.hasDefaultSlot():this.hasNamedSlot(t)}hostConnected(){this.host.shadowRoot?.addEventListener?.("slotchange",this.handleSlotChange)}hostDisconnected(){this.host.shadowRoot?.removeEventListener?.("slotchange",this.handleSlotChange)}};var Ut=H`
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
`;var Ve=H`
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
`;var Vi=H`
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
`;var Ar=new Set,He=new Map,Ee,Er="ltr",Or="en",Hi=typeof MutationObserver<"u"&&typeof document<"u"&&typeof document.documentElement<"u";if(Hi){let t=new MutationObserver(Ui);Er=document.documentElement.dir||"ltr",Or=document.documentElement.lang||navigator.language,t.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]})}function uo(...t){t.map(e=>{let o=e.$code.toLowerCase();He.has(o)?He.set(o,Object.assign(Object.assign({},He.get(o)),e)):He.set(o,e),Ee||(Ee=e)}),Ui()}function Ui(){Hi&&(Er=document.documentElement.dir||"ltr",Or=document.documentElement.lang||navigator.language),[...Ar.keys()].map(t=>{typeof t.requestUpdate=="function"&&t.requestUpdate()})}var Uo=class{constructor(e){this.host=e,this.host.addController(this)}hostConnected(){Ar.add(this.host)}hostDisconnected(){Ar.delete(this.host)}dir(){return`${this.host.dir||Er}`.toLowerCase()}lang(){return`${this.host.lang||Or}`.toLowerCase()}getTranslationData(e){var o,a;let s;try{s=new Intl.Locale(e.replace(/_/g,"-"))}catch{return{locale:void 0,language:"",region:"",primary:void 0,secondary:void 0}}let c=s.language.toLowerCase(),d=(a=(o=s.region)===null||o===void 0?void 0:o.toLowerCase())!==null&&a!==void 0?a:"",m=He.get(`${c}-${d}`),g=He.get(c);return{locale:s,language:c,region:d,primary:m,secondary:g}}exists(e,o){var a;let{primary:s,secondary:c}=this.getTranslationData((a=o.lang)!==null&&a!==void 0?a:this.lang());return o=Object.assign({includeFallback:!1},o),!!(s&&s[e]||c&&c[e]||o.includeFallback&&Ee&&Ee[e])}term(e,...o){let{primary:a,secondary:s}=this.getTranslationData(this.lang()),c;if(a&&a[e])c=a[e];else if(s&&s[e])c=s[e];else if(Ee&&Ee[e])c=Ee[e];else return console.error(`No translation found for: ${String(e)}`),String(e);return typeof c=="function"?c(...o):c}date(e,o){return e=new Date(e),new Intl.DateTimeFormat(this.lang(),o).format(e)}number(e,o){return e=Number(e),isNaN(e)?"":new Intl.NumberFormat(this.lang(),o).format(e)}relativeTime(e,o,a){return new Intl.RelativeTimeFormat(this.lang(),a).format(e,o)}};var Wi={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",captions:"Captions",clearEntry:"Clear entry",close:"Close",createOption:t=>`Create "${t}"`,copied:"Copied",copy:"Copy",currentValue:"Current value",dropFileHere:"Drop file here or click to browse",decrement:"Decrement",dropFilesHere:"Drop files here or click to browse",error:"Error",enterFullscreen:"Enter fullscreen",exitFullscreen:"Exit fullscreen",goToSlide:(t,e)=>`Go to slide ${t} of ${e}`,hidePassword:"Hide password",increment:"Increment",loading:"Loading",moreOptions:"More Options",mute:"Mute",nextSlide:"Next slide",nextVideo:"Next Video",numCharacters:t=>t===1?"1 character":`${t} characters`,numCharactersRemaining:t=>t===1?"1 character remaining":`${t} characters remaining`,numOptionsSelected:t=>t===0?"No options selected":t===1?"1 option selected":`${t} options selected`,pause:"Pause",pauseAnimation:"Pause animation",pictureInPicture:"Picture in picture",play:"Play",playbackSpeed:"Playback speed",playlist:"Playlist",playAnimation:"Play animation",previousSlide:"Previous slide",previousVideo:"Previous video",progress:"Progress",remove:"Remove",resize:"Resize",scrollableRegion:"Scrollable region",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:t=>`Slide ${t}`,toggleColorFormat:"Toggle color format",seek:"Seek",seekProgress:(t,e)=>`${t} of ${e}`,currentlyPlaying:"currently playing",unmute:"Unmute",videoPlayer:"Video player",volume:"Volume",zoomIn:"Zoom in",zoomOut:"Zoom out"};uo(Wi);var ji=Wi;var St=class extends Uo{};uo(ji);function U(t,e){let o={waitUntilFirstUpdate:!1,...e};return(a,s)=>{let{update:c}=a,d=Array.isArray(t)?t:[t];a.update=function(m){d.forEach(g=>{let y=g;if(m.has(y)){let C=m.get(y),x=this[y];C!==x&&(!o.waitUntilFirstUpdate||this.hasUpdated)&&this[s](C,x)}}),c.call(this,m)}}}var Pt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},ve=t=>(...e)=>({_$litDirective$:t,values:e}),re=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,o,a){this._$Ct=e,this._$AM=o,this._$Ci=a}_$AS(e,o){return this.update(e,o)}update(e,o){return this.render(...o)}};var wt=ve(class extends re{constructor(t){if(super(t),t.type!==Pt.ATTRIBUTE||t.name!=="class"||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){if(this.st===void 0){this.st=new Set,t.strings!==void 0&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(a=>a!=="")));for(let a in e)e[a]&&!this.nt?.has(a)&&this.st.add(a);return this.render(e)}let o=t.element.classList;for(let a of this.st)a in e||(o.remove(a),this.st.delete(a));for(let a in e){let s=!!e[a];s===this.st.has(a)||this.nt?.has(a)||(s?(o.add(a),this.st.add(a)):(o.remove(a),this.st.delete(a)))}return xt}});var tt=t=>t??J;var Yi=Symbol.for(""),Os=t=>{if(t?.r===Yi)return t?._$litStatic$};var $r=(t,...e)=>({_$litStatic$:e.reduce((o,a,s)=>o+(c=>{if(c._$litStatic$!==void 0)return c._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${c}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)})(a)+t[s+1],t[0]),r:Yi}),Ki=new Map,zr=t=>(e,...o)=>{let a=o.length,s,c,d=[],m=[],g,y=0,C=!1;for(;y<a;){for(g=e[y];y<a&&(c=o[y],(s=Os(c))!==void 0);)g+=s+e[++y],C=!0;y!==a&&m.push(c),d.push(g),y++}if(y===a&&d.push(e[a]),C){let x=d.join("$$lit$$");(e=Ki.get(x))===void 0&&(d.raw=d,Ki.set(x,e=d)),o=m}return t(e,...o)},Wo=zr(z),_d=zr(Fi),kd=zr(Mi);var N=class extends Ct{constructor(){super(...arguments),this.assumeInteractionOn=["click"],this.hasSlotController=new oe(this,"[default]","start","end"),this.localize=new St(this),this.invalid=!1,this.isIconButton=!1,this.title="",this.variant="neutral",this.appearance="accent",this.size="m",this.withCaret=!1,this.withStart=!1,this.withEnd=!1,this.disabled=!1,this.loading=!1,this.pill=!1,this.type="button"}static get validators(){return[...super.validators,zo()]}handleSizeChange(){Ht(this.localName,this.size)}constructLightDOMButton(){let t=document.createElement("button");for(let e of this.attributes)e.name!=="style"&&t.setAttribute(e.name,e.value);return t.type=this.type,t.style.position="absolute !important",t.style.width="0 !important",t.style.height="0 !important",t.style.clipPath="inset(50%) !important",t.style.overflow="hidden !important",t.style.whiteSpace="nowrap !important",this.name&&(t.name=this.name),t.value=this.value||"",t}handleClick(t){if(this.disabled||this.loading){t.preventDefault(),t.stopImmediatePropagation();return}if(this.type!=="submit"&&this.type!=="reset"||!this.getForm())return;let o=this.constructLightDOMButton();this.parentElement?.append(o),o.click(),o.remove()}handleInvalid(){this.dispatchEvent(new Io)}handleLabelSlotChange(){let t=this.labelSlot.assignedNodes({flatten:!0}),e=!1,o=!1,a=!1,s=!1;[...t].forEach(c=>{if(c.nodeType===Node.ELEMENT_NODE){let d=c;d.localName==="wa-icon"?(o=!0,e||(e=d.label!==void 0)):s=!0}else c.nodeType===Node.TEXT_NODE&&(c.textContent?.trim()||"").length>0&&(a=!0)}),this.isIconButton=o&&!a&&!s,this.customStates.set("icon-button",this.isIconButton),this.isIconButton&&!e&&console.warn('Icon buttons must have a label for screen readers. Add <wa-icon label="..."> to remove this warning.',this)}isButton(){return!this.href}isLink(){return!!this.href}handleDisabledChange(){this.customStates.set("disabled",this.disabled),this.updateValidity()}handleHrefChange(){this.customStates.set("link",this.isLink())}handleLoadingChange(){this.customStates.set("loading",this.loading)}setValue(...t){}click(){this.button.click()}focus(t){this.button.focus(t)}blur(){this.button.blur()}render(){let t=this.isLink(),e=t?$r`a`:$r`button`;return Wo`
      <${e}
        part="base"
        class=${wt({button:!0,caret:this.withCaret,disabled:this.disabled,loading:this.loading,rtl:this.localize.dir()==="rtl","has-label":this.hasSlotController.test("[default]"),"has-start":this.hasUpdated?this.hasSlotController.test("start"):this.withStart,"has-end":this.hasUpdated?this.hasSlotController.test("end"):this.withEnd,"is-icon-button":this.isIconButton})}
        ?disabled=${tt(t?void 0:this.disabled)}
        type=${tt(t?void 0:this.type)}
        title=${this.title}
        name=${tt(t?void 0:this.name)}
        value=${tt(t?void 0:this.value)}
        href=${tt(t?this.href:void 0)}
        target=${tt(t?this.target:void 0)}
        download=${tt(t?this.download:void 0)}
        rel=${tt(t&&this.rel?this.rel:void 0)}
        role=${tt(t?void 0:"button")}
        aria-disabled=${tt(t&&this.disabled?"true":void 0)}
        tabindex=${this.disabled?"-1":"0"}
        @invalid=${this.isButton()?this.handleInvalid:null}
        @click=${this.handleClick}
      >
        <slot name="start" part="start" class="start"></slot>
        <slot part="label" class="label" @slotchange=${this.handleLabelSlotChange}></slot>
        <slot name="end" part="end" class="end"></slot>
        ${this.withCaret?Wo`
                <wa-icon part="caret" class="caret" library="system" name="chevron-down" variant="solid"></wa-icon>
              `:""}
        ${this.loading?Wo`<wa-spinner part="spinner"></wa-spinner>`:""}
      </${e}>
    `}};N.shadowRootOptions={...Ct.shadowRootOptions,delegatesFocus:!0};N.css=[Vi,Ve,Ut];h([st(".button")],N.prototype,"button",2);h([st("slot:not([name])")],N.prototype,"labelSlot",2);h([zt()],N.prototype,"invalid",2);h([zt()],N.prototype,"isIconButton",2);h([v()],N.prototype,"title",2);h([v({reflect:!0})],N.prototype,"variant",2);h([v({reflect:!0})],N.prototype,"appearance",2);h([v({reflect:!0})],N.prototype,"size",2);h([U("size")],N.prototype,"handleSizeChange",1);h([v({attribute:"with-caret",type:Boolean,reflect:!0})],N.prototype,"withCaret",2);h([v({attribute:"with-start",type:Boolean})],N.prototype,"withStart",2);h([v({attribute:"with-end",type:Boolean})],N.prototype,"withEnd",2);h([v({type:Boolean})],N.prototype,"disabled",2);h([v({type:Boolean,reflect:!0})],N.prototype,"loading",2);h([v({type:Boolean,reflect:!0})],N.prototype,"pill",2);h([v()],N.prototype,"type",2);h([v({reflect:!0})],N.prototype,"name",2);h([v({reflect:!0})],N.prototype,"value",2);h([v({reflect:!0})],N.prototype,"href",2);h([v()],N.prototype,"target",2);h([v()],N.prototype,"rel",2);h([v()],N.prototype,"download",2);h([v({attribute:"formaction"})],N.prototype,"formAction",2);h([v({attribute:"formenctype"})],N.prototype,"formEnctype",2);h([v({attribute:"formmethod"})],N.prototype,"formMethod",2);h([v({attribute:"formnovalidate",type:Boolean})],N.prototype,"formNoValidate",2);h([v({attribute:"formtarget"})],N.prototype,"formTarget",2);h([U("disabled",{waitUntilFirstUpdate:!0})],N.prototype,"handleDisabledChange",1);h([U("href")],N.prototype,"handleHrefChange",1);h([U("loading",{waitUntilFirstUpdate:!0})],N.prototype,"handleLoadingChange",1);N=h([rt("wa-button")],N);N.disableWarning?.("change-in-update");var Gi=H`
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
`;var Ir=class extends ct{constructor(){super(...arguments),this.localize=new St(this)}render(){return z`
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
    `}};Ir.css=Gi;Ir=h([rt("wa-spinner")],Ir);var Xi=class extends Event{constructor(){super("wa-error",{bubbles:!0,cancelable:!1,composed:!0})}};var Ji=class extends Event{constructor(){super("wa-load",{bubbles:!0,cancelable:!1,composed:!0})}};var Qi=H`
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
`;function $s(t){return`data:image/svg+xml,${encodeURIComponent(t)}`}var Tr={solid:{backward:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M236.3 107.1C247.9 96 265 92.9 279.7 99.2C294.4 105.5 304 120 304 136L304 272.3L476.3 107.2C487.9 96 505 92.9 519.7 99.2C534.4 105.5 544 120 544 136L544 504C544 520 534.4 534.5 519.7 540.8C505 547.1 487.9 544 476.3 532.9L304 367.7L304 504C304 520 294.4 534.5 279.7 540.8C265 547.1 247.9 544 236.3 532.9L44.3 348.9C36.5 341.3 32 330.9 32 320C32 309.1 36.5 298.7 44.3 291.1L236.3 107.1z"/></svg>',"backward-step":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M491 100.8C478.1 93.8 462.3 94.5 450 102.6L192 272.1L192 128C192 110.3 177.7 96 160 96C142.3 96 128 110.3 128 128L128 512C128 529.7 142.3 544 160 544C177.7 544 192 529.7 192 512L192 367.9L450 537.5C462.3 545.6 478 546.3 491 539.3C504 532.3 512 518.8 512 504.1L512 136.1C512 121.4 503.9 107.9 491 100.9z"/></svg>',check:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"/></svg>',"chevron-down":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>',"chevron-left":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>',"chevron-right":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M311.1 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L243.2 256 73.9 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>',circle:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0z"/></svg>',"closed-captioning":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M64 192C64 156.7 92.7 128 128 128L512 128C547.3 128 576 156.7 576 192L576 448C576 483.3 547.3 512 512 512L128 512C92.7 512 64 483.3 64 448L64 192zM216 272L248 272C252.4 272 256 275.6 256 280C256 293.3 266.7 304 280 304C293.3 304 304 293.3 304 280C304 249.1 278.9 224 248 224L216 224C185.1 224 160 249.1 160 280L160 360C160 390.9 185.1 416 216 416L248 416C278.9 416 304 390.9 304 360C304 346.7 293.3 336 280 336C266.7 336 256 346.7 256 360C256 364.4 252.4 368 248 368L216 368C211.6 368 208 364.4 208 360L208 280C208 275.6 211.6 272 216 272zM384 280C384 275.6 387.6 272 392 272L424 272C428.4 272 432 275.6 432 280C432 293.3 442.7 304 456 304C469.3 304 480 293.3 480 280C480 249.1 454.9 224 424 224L392 224C361.1 224 336 249.1 336 280L336 360C336 390.9 361.1 416 392 416L424 416C454.9 416 480 390.9 480 360C480 346.7 469.3 336 456 336C442.7 336 432 346.7 432 360C432 364.4 428.4 368 424 368L392 368C387.6 368 384 364.4 384 360L384 280z"/></svg>',"closed-captioning-slash":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M39 39.1C48.4 29.7 63.6 29.7 72.9 39.1L161.8 128L512 128C547.3 128 576 156.7 576 192L576 448C576 473.5 561.1 495.4 539.6 505.8L601 567.1C610.4 576.5 610.4 591.7 601 601C591.6 610.3 576.4 610.4 567.1 601L39 73.1C29.7 63.7 29.7 48.5 39 39.1zM384 350.1L384 279.9C384 275.5 387.6 271.9 392 271.9L424 271.9C428.4 271.9 432 275.5 432 279.9C432 293.2 442.7 303.9 456 303.9C469.3 303.9 480 293.2 480 279.9C480 249 454.9 223.9 424 223.9L392 223.9C361.1 223.9 336 249 336 279.9L336 302.1L384 350.1zM445.5 411.6C465.7 403.2 480 383.2 480 359.9C480 346.6 469.3 335.9 456 335.9C442.7 335.9 432 346.6 432 359.9C432 364.3 428.4 367.9 424 367.9L401.8 367.9L445.5 411.6zM162.3 264.1C160.8 269.1 160 274.5 160 280L160 360C160 390.9 185.1 416 216 416L248 416C266.1 416 282.1 407.5 292.4 394.2L410.2 512L128 512C92.7 512 64 483.3 64 448L64 192C64 184.2 65.4 176.7 68 169.8L162.3 264.1zM256.1 357.9C256 358.6 256 359.3 256 360C256 364.4 252.4 368 248 368L216 368C211.6 368 208 364.4 208 360L208 309.8L256.1 357.9z"/></svg>',compress:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M160 64c0-17.7-14.3-32-32-32S96 46.3 96 64l0 64-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c17.7 0 32-14.3 32-32l0-96zM32 320c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0 0 64c0 17.7 14.3 32 32 32s32-14.3 32-32l0-96c0-17.7-14.3-32-32-32l-96 0zM352 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7 14.3 32 32 32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0 0-64zM320 320c-17.7 0-32 14.3-32 32l0 96c0 17.7 14.3 32 32 32s32-14.3 32-32l0-64 64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0z"/></svg>',"ellipsis-vertical":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M320 208C289.1 208 264 182.9 264 152C264 121.1 289.1 96 320 96C350.9 96 376 121.1 376 152C376 182.9 350.9 208 320 208zM320 432C350.9 432 376 457.1 376 488C376 518.9 350.9 544 320 544C289.1 544 264 518.9 264 488C264 457.1 289.1 432 320 432zM376 320C376 350.9 350.9 376 320 376C289.1 376 264 350.9 264 320C264 289.1 289.1 264 320 264C350.9 264 376 289.1 376 320z"/></svg>',expand:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 96C110.3 96 96 110.3 96 128L96 224C96 241.7 110.3 256 128 256C145.7 256 160 241.7 160 224L160 160L224 160C241.7 160 256 145.7 256 128C256 110.3 241.7 96 224 96L128 96zM160 416C160 398.3 145.7 384 128 384C110.3 384 96 398.3 96 416L96 512C96 529.7 110.3 544 128 544L224 544C241.7 544 256 529.7 256 512C256 494.3 241.7 480 224 480L160 480L160 416zM416 96C398.3 96 384 110.3 384 128C384 145.7 398.3 160 416 160L480 160L480 224C480 241.7 494.3 256 512 256C529.7 256 544 241.7 544 224L544 128C544 110.3 529.7 96 512 96L416 96zM544 416C544 398.3 529.7 384 512 384C494.3 384 480 398.3 480 416L480 480L416 480C398.3 480 384 494.3 384 512C384 529.7 398.3 544 416 544L512 544C529.7 544 544 529.7 544 512L544 416z"/></svg>',eyedropper:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M341.6 29.2l-101.6 101.6-9.4-9.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-9.4-9.4 101.6-101.6c39-39 39-102.2 0-141.1s-102.2-39-141.1 0zM55.4 323.3c-15 15-23.4 35.4-23.4 56.6l0 42.4-26.6 39.9c-8.5 12.7-6.8 29.6 4 40.4s27.7 12.5 40.4 4l39.9-26.6 42.4 0c21.2 0 41.6-8.4 56.6-23.4l109.4-109.4-45.3-45.3-109.4 109.4c-3 3-7.1 4.7-11.3 4.7l-36.1 0 0-36.1c0-4.2 1.7-8.3 4.7-11.3l109.4-109.4-45.3-45.3-109.4 109.4z"/></svg>',forward:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M403.7 107.1C392.1 96 375 92.9 360.3 99.2C345.6 105.5 336 120 336 136L336 272.3L163.7 107.2C152.1 96 135 92.9 120.3 99.2C105.6 105.5 96 120 96 136L96 504C96 520 105.6 534.5 120.3 540.8C135 547.1 152.1 544 163.7 532.9L336 367.7L336 504C336 520 345.6 534.5 360.3 540.8C375 547.1 392.1 544 403.7 532.9L595.7 348.9C603.6 341.4 608 330.9 608 320C608 309.1 603.5 298.7 595.7 291.1L403.7 107.1z"/></svg>',file:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M192 64C156.7 64 128 92.7 128 128L128 512C128 547.3 156.7 576 192 576L448 576C483.3 576 512 547.3 512 512L512 234.5C512 217.5 505.3 201.2 493.3 189.2L386.7 82.7C374.7 70.7 358.5 64 341.5 64L192 64zM453.5 240L360 240C346.7 240 336 229.3 336 216L336 122.5L453.5 240z"/></svg>',"file-audio":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM389.8 307.7C380.7 301.4 368.3 303.6 362 312.7C355.7 321.8 357.9 334.2 367 340.5C390.9 357.2 406.4 384.8 406.4 416C406.4 447.2 390.8 474.9 367 491.5C357.9 497.8 355.7 510.3 362 519.3C368.3 528.3 380.8 530.6 389.8 524.3C423.9 500.5 446.4 460.8 446.4 416C446.4 371.2 424 331.5 389.8 307.7zM208 376C199.2 376 192 383.2 192 392L192 440C192 448.8 199.2 456 208 456L232 456L259.2 490C262.2 493.8 266.8 496 271.7 496L272 496C280.8 496 288 488.8 288 480L288 352C288 343.2 280.8 336 272 336L271.7 336C266.8 336 262.2 338.2 259.2 342L232 376L208 376zM336 448.2C336 458.9 346.5 466.4 354.9 459.8C367.8 449.5 376 433.7 376 416C376 398.3 367.8 382.5 354.9 372.2C346.5 365.5 336 373.1 336 383.8L336 448.3z"/></svg>',"file-code":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM282.2 359.6C290.8 349.5 289.7 334.4 279.6 325.8C269.5 317.2 254.4 318.3 245.8 328.4L197.8 384.4C190.1 393.4 190.1 406.6 197.8 415.6L245.8 471.6C254.4 481.7 269.6 482.8 279.6 474.2C289.6 465.6 290.8 450.4 282.2 440.4L247.6 400L282.2 359.6zM394.2 328.4C385.6 318.3 370.4 317.2 360.4 325.8C350.4 334.4 349.2 349.6 357.8 359.6L392.4 400L357.8 440.4C349.2 450.5 350.3 465.6 360.4 474.2C370.5 482.8 385.6 481.7 394.2 471.6L442.2 415.6C449.9 406.6 449.9 393.4 442.2 384.4L394.2 328.4z"/></svg>',"file-excel":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM292 330.7C284.6 319.7 269.7 316.7 258.7 324C247.7 331.3 244.7 346.3 252 357.3L291.2 416L252 474.7C244.6 485.7 247.6 500.6 258.7 508C269.8 515.4 284.6 512.4 292 501.3L320 459.3L348 501.3C355.4 512.3 370.3 515.3 381.3 508C392.3 500.7 395.3 485.7 388 474.7L348.8 416L388 357.3C395.4 346.3 392.4 331.4 381.3 324C370.2 316.6 355.4 319.6 348 330.7L320 372.7L292 330.7z"/></svg>',"file-image":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM256 320C256 302.3 241.7 288 224 288C206.3 288 192 302.3 192 320C192 337.7 206.3 352 224 352C241.7 352 256 337.7 256 320zM220.6 512L419.4 512C435.2 512 448 499.2 448 483.4C448 476.1 445.2 469 440.1 463.7L343.3 361.9C337.3 355.6 328.9 352 320.1 352L319.8 352C311 352 302.7 355.6 296.6 361.9L199.9 463.7C194.8 469 192 476.1 192 483.4C192 499.2 204.8 512 220.6 512z"/></svg>',"file-pdf":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 64C92.7 64 64 92.7 64 128L64 512C64 547.3 92.7 576 128 576L208 576L208 464C208 428.7 236.7 400 272 400L448 400L448 234.5C448 217.5 441.3 201.2 429.3 189.2L322.7 82.7C310.7 70.7 294.5 64 277.5 64L128 64zM389.5 240L296 240C282.7 240 272 229.3 272 216L272 122.5L389.5 240zM272 444C261 444 252 453 252 464L252 592C252 603 261 612 272 612C283 612 292 603 292 592L292 564L304 564C337.1 564 364 537.1 364 504C364 470.9 337.1 444 304 444L272 444zM304 524L292 524L292 484L304 484C315 484 324 493 324 504C324 515 315 524 304 524zM400 444C389 444 380 453 380 464L380 592C380 603 389 612 400 612L432 612C460.7 612 484 588.7 484 560L484 496C484 467.3 460.7 444 432 444L400 444zM420 572L420 484L432 484C438.6 484 444 489.4 444 496L444 560C444 566.6 438.6 572 432 572L420 572zM508 464L508 592C508 603 517 612 528 612C539 612 548 603 548 592L548 548L576 548C587 548 596 539 596 528C596 517 587 508 576 508L548 508L548 484L576 484C587 484 596 475 596 464C596 453 587 444 576 444L528 444C517 444 508 453 508 464z"/></svg>',"file-powerpoint":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM280 320C266.7 320 256 330.7 256 344L256 488C256 501.3 266.7 512 280 512C293.3 512 304 501.3 304 488L304 464L328 464C367.8 464 400 431.8 400 392C400 352.2 367.8 320 328 320L280 320zM328 416L304 416L304 368L328 368C341.3 368 352 378.7 352 392C352 405.3 341.3 416 328 416z"/></svg>',"file-video":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM208 368L208 464C208 481.7 222.3 496 240 496L336 496C353.7 496 368 481.7 368 464L368 440L403 475C406.2 478.2 410.5 480 415 480C424.4 480 432 472.4 432 463L432 368.9C432 359.5 424.4 351.9 415 351.9C410.5 351.9 406.2 353.7 403 356.9L368 391.9L368 367.9C368 350.2 353.7 335.9 336 335.9L240 335.9C222.3 335.9 208 350.2 208 367.9z"/></svg>',"file-word":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM263.4 338.8C260.5 325.9 247.7 317.7 234.8 320.6C221.9 323.5 213.7 336.3 216.6 349.2L248.6 493.2C250.9 503.7 260 511.4 270.8 512C281.6 512.6 291.4 505.9 294.8 495.6L320 419.9L345.2 495.6C348.6 505.8 358.4 512.5 369.2 512C380 511.5 389.1 503.8 391.4 493.2L423.4 349.2C426.3 336.3 418.1 323.4 405.2 320.6C392.3 317.8 379.4 325.9 376.6 338.8L363.4 398.2L342.8 336.4C339.5 326.6 330.4 320 320 320C309.6 320 300.5 326.6 297.2 336.4L276.6 398.2L263.4 338.8z"/></svg>',"file-zipper":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM192 136C192 149.3 202.7 160 216 160L264 160C277.3 160 288 149.3 288 136C288 122.7 277.3 112 264 112L216 112C202.7 112 192 122.7 192 136zM192 232C192 245.3 202.7 256 216 256L264 256C277.3 256 288 245.3 288 232C288 218.7 277.3 208 264 208L216 208C202.7 208 192 218.7 192 232zM256 304L224 304C206.3 304 192 318.3 192 336L192 384C192 410.5 213.5 432 240 432C266.5 432 288 410.5 288 384L288 336C288 318.3 273.7 304 256 304zM240 368C248.8 368 256 375.2 256 384C256 392.8 248.8 400 240 400C231.2 400 224 392.8 224 384C224 375.2 231.2 368 240 368z"/></svg>',"forward-step":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M21 36.8c12.9-7 28.7-6.3 41 1.8L320 208.1 320 64c0-17.7 14.3-32 32-32s32 14.3 32 32l0 384c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-144.1-258 169.6c-12.3 8.1-28 8.8-41 1.8S0 454.7 0 440L0 72C0 57.3 8.1 43.8 21 36.8z"/></svg>',gauge:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zm320 96c0-26.9-16.5-49.9-40-59.3L280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 172.7c-23.5 9.5-40 32.5-40 59.3 0 35.3 28.7 64 64 64s64-28.7 64-64zM144 176a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm-16 80a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM400 144a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>',gear:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M259.1 73.5C262.1 58.7 275.2 48 290.4 48L350.2 48C365.4 48 378.5 58.7 381.5 73.5L396 143.5C410.1 149.5 423.3 157.2 435.3 166.3L503.1 143.8C517.5 139 533.3 145 540.9 158.2L570.8 210C578.4 223.2 575.7 239.8 564.3 249.9L511 297.3C511.9 304.7 512.3 312.3 512.3 320C512.3 327.7 511.8 335.3 511 342.7L564.4 390.2C575.8 400.3 578.4 417 570.9 430.1L541 481.9C533.4 495 517.6 501.1 503.2 496.3L435.4 473.8C423.3 482.9 410.1 490.5 396.1 496.6L381.7 566.5C378.6 581.4 365.5 592 350.4 592L290.6 592C275.4 592 262.3 581.3 259.3 566.5L244.9 496.6C230.8 490.6 217.7 482.9 205.6 473.8L137.5 496.3C123.1 501.1 107.3 495.1 99.7 481.9L69.8 430.1C62.2 416.9 64.9 400.3 76.3 390.2L129.7 342.7C128.8 335.3 128.4 327.7 128.4 320C128.4 312.3 128.9 304.7 129.7 297.3L76.3 249.8C64.9 239.7 62.3 223 69.8 209.9L99.7 158.1C107.3 144.9 123.1 138.9 137.5 143.7L205.3 166.2C217.4 157.1 230.6 149.5 244.6 143.4L259.1 73.5zM320.3 400C364.5 399.8 400.2 363.9 400 319.7C399.8 275.5 363.9 239.8 319.7 240C275.5 240.2 239.8 276.1 240 320.3C240.2 364.5 276.1 400.2 320.3 400z"/></svg>',"grip-vertical":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M128 40c0-22.1-17.9-40-40-40L40 0C17.9 0 0 17.9 0 40L0 88c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zM0 424l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM320 40c0-22.1-17.9-40-40-40L232 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zM192 232l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM320 424c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z"/></svg>',indeterminate:'<svg part="indeterminate-icon" class="icon" viewBox="0 0 16 16"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round"><g stroke="currentColor" stroke-width="2"><g transform="translate(2.285714 6.857143)"><path d="M10.2857143,1.14285714 L1.14285714,1.14285714"/></g></g></g></svg>',minus:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32z"/></svg>',pause:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M48 32C21.5 32 0 53.5 0 80L0 432c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48L48 32zm224 0c-26.5 0-48 21.5-48 48l0 352c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48l-64 0z"/></svg>',"picture-in-picture":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M448 32c35.3 0 64 28.7 64 64l0 112-64 0 0-112-384 0 0 320 144 0 0 64-144 0-6.5-.3c-30.1-3.1-54.1-27-57.1-57.1L0 416 0 96C0 62.9 25.2 35.6 57.5 32.3L64 32 448 32zm16 224c26.5 0 48 21.5 48 48l0 128c0 26.5-21.5 48-48 48l-160 0c-26.5 0-48-21.5-48-48l0-128c0-26.5 21.5-48 48-48l160 0z"/></svg>',play:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M91.2 36.9c-12.4-6.8-27.4-6.5-39.6 .7S32 57.9 32 72l0 368c0 14.1 7.5 27.2 19.6 34.4s27.2 7.5 39.6 .7l336-184c12.8-7 20.8-20.5 20.8-35.1s-8-28.1-20.8-35.1l-336-184z"/></svg>',"play-circle":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9l0 176c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z"/></svg>',plus:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"/></svg>',star:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M309.5-18.9c-4.1-8-12.4-13.1-21.4-13.1s-17.3 5.1-21.4 13.1L193.1 125.3 33.2 150.7c-8.9 1.4-16.3 7.7-19.1 16.3s-.5 18 5.8 24.4l114.4 114.5-25.2 159.9c-1.4 8.9 2.3 17.9 9.6 23.2s16.9 6.1 25 2L288.1 417.6 432.4 491c8 4.1 17.7 3.3 25-2s11-14.2 9.6-23.2L441.7 305.9 556.1 191.4c6.4-6.4 8.6-15.8 5.8-24.4s-10.1-14.9-19.1-16.3L383 125.3 309.5-18.9z"/></svg>',upload:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M352 173.3L352 384C352 401.7 337.7 416 320 416C302.3 416 288 401.7 288 384L288 173.3L246.6 214.7C234.1 227.2 213.8 227.2 201.3 214.7C188.8 202.2 188.8 181.9 201.3 169.4L297.3 73.4C309.8 60.9 330.1 60.9 342.6 73.4L438.6 169.4C451.1 181.9 451.1 202.2 438.6 214.7C426.1 227.2 405.8 227.2 393.3 214.7L352 173.3zM320 464C364.2 464 400 428.2 400 384L480 384C515.3 384 544 412.7 544 448L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 448C96 412.7 124.7 384 160 384L240 384C240 428.2 275.8 464 320 464zM464 488C477.3 488 488 477.3 488 464C488 450.7 477.3 440 464 440C450.7 440 440 450.7 440 464C440 477.3 450.7 488 464 488z"/></svg>',user:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M224 248a120 120 0 1 0 0-240 120 120 0 1 0 0 240zm-29.7 56C95.8 304 16 383.8 16 482.3 16 498.7 29.3 512 45.7 512l356.6 0c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3l-59.4 0z"/></svg>',volume:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M48 352l48 0 134.1 119.2c6.4 5.7 14.6 8.8 23.1 8.8 19.2 0 34.8-15.6 34.8-34.8l0-378.4c0-19.2-15.6-34.8-34.8-34.8-8.5 0-16.7 3.1-23.1 8.8L96 160 48 160c-26.5 0-48 21.5-48 48l0 96c0 26.5 21.5 48 48 48zM441.1 107c-10.3-8.4-25.4-6.8-33.8 3.5s-6.8 25.4 3.5 33.8C443.3 170.7 464 210.9 464 256s-20.7 85.3-53.2 111.8c-10.3 8.4-11.8 23.5-3.5 33.8s23.5 11.8 33.8 3.5c43.2-35.2 70.9-88.9 70.9-149s-27.7-113.8-70.9-149zm-60.5 74.5c-10.3-8.4-25.4-6.8-33.8 3.5s-6.8 25.4 3.5 33.8C361.1 227.6 368 241 368 256s-6.9 28.4-17.7 37.3c-10.3 8.4-11.8 23.5-3.5 33.8s23.5 11.8 33.8 3.5C402.1 312.9 416 286.1 416 256s-13.9-56.9-35.5-74.5z"/></svg>',"volume-low":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M48 352l48 0 134.1 119.2c6.4 5.7 14.6 8.8 23.1 8.8 19.2 0 34.8-15.6 34.8-34.8l0-378.4c0-19.2-15.6-34.8-34.8-34.8-8.5 0-16.7 3.1-23.1 8.8L96 160 48 160c-26.5 0-48 21.5-48 48l0 96c0 26.5 21.5 48 48 48zM380.6 181.5c-10.3-8.4-25.4-6.8-33.8 3.5s-6.8 25.4 3.5 33.8C361.1 227.6 368 241 368 256s-6.9 28.4-17.7 37.3c-10.3 8.4-11.8 23.5-3.5 33.8s23.5 11.8 33.8 3.5C402.1 312.9 416 286.1 416 256s-13.9-56.9-35.5-74.5z"/></svg>',"volume-xmark":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M48 352l48 0 134.1 119.2c6.4 5.7 14.6 8.8 23.1 8.8 19.2 0 34.8-15.6 34.8-34.8l0-378.4c0-19.2-15.6-34.8-34.8-34.8-8.5 0-16.7 3.1-23.1 8.8L96 160 48 160c-26.5 0-48 21.5-48 48l0 96c0 26.5 21.5 48 48 48zM367 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>',xmark:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z"/></svg>'},regular:{"circle-question":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M464 256a208 208 0 1 0 -416 0 208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zm256-80c-17.7 0-32 14.3-32 32 0 13.3-10.7 24-24 24s-24-10.7-24-24c0-44.2 35.8-80 80-80s80 35.8 80 80c0 47.2-36 67.2-56 74.5l0 3.8c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-8.1c0-20.5 14.8-35.2 30.1-40.2 6.4-2.1 13.2-5.5 18.2-10.3 4.3-4.2 7.7-10 7.7-19.6 0-17.7-14.3-32-32-32zM224 368a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>',"circle-xmark":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464a256 256 0 1 0 0-512 256 256 0 1 0 0 512zM167 167c-9.4 9.4-9.4 24.6 0 33.9l55 55-55 55c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l55-55 55 55c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-55-55 55-55c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-55 55-55-55c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>',copy:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M384 336l-192 0c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l133.5 0c4.2 0 8.3 1.7 11.3 4.7l58.5 58.5c3 3 4.7 7.1 4.7 11.3L400 320c0 8.8-7.2 16-16 16zM192 384l192 0c35.3 0 64-28.7 64-64l0-197.5c0-17-6.7-33.3-18.7-45.3L370.7 18.7C358.7 6.7 342.5 0 325.5 0L192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-16-48 0 0 16c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l16 0 0-48-16 0z"/></svg>',eye:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M288 80C222.8 80 169.2 109.6 128.1 147.7 89.6 183.5 63 226 49.4 256 63 286 89.6 328.5 128.1 364.3 169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256 513 226 486.4 183.5 447.9 147.7 406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1 3.3 7.9 3.3 16.7 0 24.6-14.9 35.7-46.2 87.7-93 131.1-47.1 43.7-111.8 80.6-192.6 80.6S142.5 443.2 95.4 399.4c-46.8-43.5-78.1-95.4-93-131.1-3.3-7.9-3.3-16.7 0-24.6 14.9-35.7 46.2-87.7 93-131.1zM288 336c44.2 0 80-35.8 80-80 0-29.6-16.1-55.5-40-69.3-1.4 59.7-49.6 107.9-109.3 109.3 13.8 23.9 39.7 40 69.3 40zm-79.6-88.4c2.5 .3 5 .4 7.6 .4 35.3 0 64-28.7 64-64 0-2.6-.2-5.1-.4-7.6-37.4 3.9-67.2 33.7-71.1 71.1zm45.6-115c10.8-3 22.2-4.5 33.9-4.5 8.8 0 17.5 .9 25.8 2.6 .3 .1 .5 .1 .8 .2 57.9 12.2 101.4 63.7 101.4 125.2 0 70.7-57.3 128-128 128-61.6 0-113-43.5-125.2-101.4-1.8-8.6-2.8-17.5-2.8-26.6 0-11 1.4-21.8 4-32 .2-.7 .3-1.3 .5-1.9 11.9-43.4 46.1-77.6 89.5-89.5z"/></svg>',"eye-slash":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M41-24.9c-9.4-9.4-24.6-9.4-33.9 0S-2.3-.3 7 9.1l528 528c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-96.4-96.4c2.7-2.4 5.4-4.8 8-7.2 46.8-43.5 78.1-95.4 93-131.1 3.3-7.9 3.3-16.7 0-24.6-14.9-35.7-46.2-87.7-93-131.1-47.1-43.7-111.8-80.6-192.6-80.6-56.8 0-105.6 18.2-146 44.2L41-24.9zM176.9 111.1c32.1-18.9 69.2-31.1 111.1-31.1 65.2 0 118.8 29.6 159.9 67.7 38.5 35.7 65.1 78.3 78.6 108.3-13.6 30-40.2 72.5-78.6 108.3-3.1 2.8-6.2 5.6-9.4 8.4L393.8 328c14-20.5 22.2-45.3 22.2-72 0-70.7-57.3-128-128-128-26.7 0-51.5 8.2-72 22.2l-39.1-39.1zm182 182l-108-108c11.1-5.8 23.7-9.1 37.1-9.1 44.2 0 80 35.8 80 80 0 13.4-3.3 26-9.1 37.1zM103.4 173.2l-34-34c-32.6 36.8-55 75.8-66.9 104.5-3.3 7.9-3.3 16.7 0 24.6 14.9 35.7 46.2 87.7 93 131.1 47.1 43.7 111.8 80.6 192.6 80.6 37.3 0 71.2-7.9 101.5-20.6L352.2 422c-20 6.4-41.4 10-64.2 10-65.2 0-118.8-29.6-159.9-67.7-38.5-35.7-65.1-78.3-78.6-108.3 10.4-23.1 28.6-53.6 54-82.8z"/></svg>',star:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M288.1-32c9 0 17.3 5.1 21.4 13.1L383 125.3 542.9 150.7c8.9 1.4 16.3 7.7 19.1 16.3s.5 18-5.8 24.4L441.7 305.9 467 465.8c1.4 8.9-2.3 17.9-9.6 23.2s-17 6.1-25 2L288.1 417.6 143.8 491c-8 4.1-17.7 3.3-25-2s-11-14.2-9.6-23.2L134.4 305.9 20 191.4c-6.4-6.4-8.6-15.8-5.8-24.4s10.1-14.9 19.1-16.3l159.9-25.4 73.6-144.2c4.1-8 12.4-13.1 21.4-13.1zm0 76.8L230.3 158c-3.5 6.8-10 11.6-17.6 12.8l-125.5 20 89.8 89.9c5.4 5.4 7.9 13.1 6.7 20.7l-19.8 125.5 113.3-57.6c6.8-3.5 14.9-3.5 21.8 0l113.3 57.6-19.8-125.5c-1.2-7.6 1.3-15.3 6.7-20.7l89.8-89.9-125.5-20c-7.6-1.2-14.1-6-17.6-12.8L288.1 44.8z"/></svg>'}},zs={name:"system",resolver:(t,e="classic",o="solid")=>{let s=Tr[o][t]??Tr.regular[t]??Tr.regular["circle-question"];return s?$s(s):""}},Zi=zs;var Is="",Fr="";function ta(){return Is.replace(/\/$/,"")}function Ts(t){Fr=t}function ea(){if(!Fr){let t=document.querySelector("[data-fa-kit-code]");t&&Ts(t.getAttribute("data-fa-kit-code")||"")}return Fr}var oa="7.2.0";function Fs(t,e,o){let a="solid";return e==="chisel"&&(a="chisel-regular"),e==="etch"&&(a="etch-solid"),e==="graphite"&&(a="graphite-thin"),e==="jelly"&&(a="jelly-regular",o==="duo-regular"&&(a="jelly-duo-regular"),o==="fill-regular"&&(a="jelly-fill-regular")),e==="jelly-duo"&&(a="jelly-duo-regular"),e==="jelly-fill"&&(a="jelly-fill-regular"),e==="notdog"&&(o==="solid"&&(a="notdog-solid"),o==="duo-solid"&&(a="notdog-duo-solid")),e==="notdog-duo"&&(a="notdog-duo-solid"),e==="slab"&&((o==="solid"||o==="regular")&&(a="slab-regular"),o==="press-regular"&&(a="slab-press-regular")),e==="slab-press"&&(a="slab-press-regular"),e==="thumbprint"&&(a="thumbprint-light"),e==="utility"&&(a="utility-semibold"),e==="utility-duo"&&(a="utility-duo-semibold"),e==="utility-fill"&&(a="utility-fill-semibold"),e==="whiteboard"&&(a="whiteboard-semibold"),e==="classic"&&(o==="thin"&&(a="thin"),o==="light"&&(a="light"),o==="regular"&&(a="regular"),o==="solid"&&(a="solid")),e==="duotone"&&(o==="thin"&&(a="duotone-thin"),o==="light"&&(a="duotone-light"),o==="regular"&&(a="duotone-regular"),o==="solid"&&(a="duotone")),e==="sharp"&&(o==="thin"&&(a="sharp-thin"),o==="light"&&(a="sharp-light"),o==="regular"&&(a="sharp-regular"),o==="solid"&&(a="sharp-solid")),e==="sharp-duotone"&&(o==="thin"&&(a="sharp-duotone-thin"),o==="light"&&(a="sharp-duotone-light"),o==="regular"&&(a="sharp-duotone-regular"),o==="solid"&&(a="sharp-duotone-solid")),e==="brands"&&(a="brands"),a}function Ms(t,e,o){let a=Fs(t,e,o),s=ta();if(s)return`${s}/${a}/${t}.svg`;let c=ea();return c.length>0?`https://ka-p.fontawesome.com/releases/v${oa}/svgs/${a}/${t}.svg?token=${encodeURIComponent(c)}`:`https://ka-f.fontawesome.com/releases/v${oa}/svgs/${a}/${t}.svg`}var Bs={name:"default",resolver:(t,e="classic",o="solid")=>Ms(t,e,o),mutator:(t,e)=>{if(e?.family&&!t.hasAttribute("data-duotone-initialized")){let{family:o,variant:a}=e;if(o==="duotone"||o==="sharp-duotone"||o==="notdog-duo"||o==="notdog"&&a==="duo-solid"||o==="jelly-duo"||o==="jelly"&&a==="duo-regular"||o==="utility-duo"||o==="thumbprint"){let s=[...t.querySelectorAll("path")],c=s.find(m=>!m.hasAttribute("opacity")),d=s.find(m=>m.hasAttribute("opacity"));if(!c||!d)return;if(c.setAttribute("data-duotone-primary",""),d.setAttribute("data-duotone-secondary",""),e.swapOpacity&&c&&d){let m=d.getAttribute("opacity")||"0.4";c.style.setProperty("--path-opacity",m),d.style.setProperty("--path-opacity","1")}t.setAttribute("data-duotone-initialized","")}}}},ra=Bs;var Ds="classic",Ps=[ra,Zi],Mr=[];function ia(t){Mr.push(t)}function aa(t){Mr=Mr.filter(e=>e!==t)}function jo(t){return Ps.find(e=>e.name===t)}function na(){return Ds}var{I:Rs}=Pi,sa=t=>t;var ca=(t,e)=>e===void 0?t?._$litType$!==void 0:t?._$litType$===e;var da=t=>t.strings===void 0,la=()=>document.createComment(""),Ue=(t,e,o)=>{let a=t._$AA.parentNode,s=e===void 0?t._$AB:e._$AA;if(o===void 0){let c=a.insertBefore(la(),s),d=a.insertBefore(la(),s);o=new Rs(c,d,t,t.options)}else{let c=o._$AB.nextSibling,d=o._$AM,m=d!==t;if(m){let g;o._$AQ?.(t),o._$AM=t,o._$AP!==void 0&&(g=t._$AU)!==d._$AU&&o._$AP(g)}if(c!==s||m){let g=o._$AA;for(;g!==c;){let y=sa(g).nextSibling;sa(a).insertBefore(g,s),g=y}}}return o},we=(t,e,o=t)=>(t._$AI(e,o),t),qs={},Ko=(t,e=qs)=>t._$AH=e,ua=t=>t._$AH,Yo=t=>{t._$AR(),t._$AA.remove()};var po=Symbol(),Go=Symbol(),Br,Dr=new Map,kt=class extends ct{constructor(){super(...arguments),this.svg=null,this.autoWidth=!1,this.swapOpacity=!1,this.label="",this.library="default",this.rotate=0,this.resolveIcon=async(t,e)=>{let o;if(e?.spriteSheet){this.hasUpdated||await this.updateComplete,this.svg=z`<svg part="svg">
        <use part="use" href="${t}"></use>
      </svg>`,await this.updateComplete;let a=this.shadowRoot.querySelector("[part='svg']");return typeof e.mutator=="function"&&e.mutator(a,this),this.svg}try{if(o=await fetch(t,{mode:"cors"}),!o.ok)return o.status===410?po:Go}catch{return Go}try{let a=document.createElement("div");a.innerHTML=await o.text();let s=a.firstElementChild;if(s?.tagName?.toLowerCase()!=="svg")return po;Br||(Br=new DOMParser);let d=Br.parseFromString(s.outerHTML,"text/html").body.querySelector("svg");return d?(d.part.add("svg"),document.adoptNode(d)):po}catch{return po}}}connectedCallback(){super.connectedCallback(),ia(this)}firstUpdated(t){super.firstUpdated(t),this.hasAttribute("rotate")&&this.style.setProperty("--rotate-angle",`${this.rotate}deg`),this.setIcon()}disconnectedCallback(){super.disconnectedCallback(),aa(this)}async getIconSource(){let t=jo(this.library),e=this.family||na();if(this.name&&t){let o;try{o=await t.resolver(this.name,e,this.variant,this.autoWidth)}catch{o=void 0}return{url:o,fromLibrary:!0}}return{url:this.src,fromLibrary:!1}}handleLabelChange(){typeof this.label=="string"&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"))}async setIcon(){let{url:t,fromLibrary:e}=await this.getIconSource(),o=e?jo(this.library):void 0;if(!t){this.svg=null;return}let a=Dr.get(t);a||(a=this.resolveIcon(t,o),Dr.set(t,a));let s=await a;s===Go&&Dr.delete(t);let c=await this.getIconSource();if(t===c.url){if(ca(s)){this.svg=s;return}switch(s){case Go:case po:this.svg=null,this.dispatchEvent(new Xi);break;default:this.svg=s.cloneNode(!0),o?.mutator?.(this.svg,this),this.dispatchEvent(new Ji)}}}updated(t){super.updated(t);let e=jo(this.library);this.hasAttribute("rotate")&&this.style.setProperty("--rotate-angle",`${this.rotate}deg`);let o=this.shadowRoot?.querySelector("svg");o&&e?.mutator?.(o,this)}render(){return this.hasUpdated?this.svg:z`<svg part="svg" width="16" height="16"></svg>`}};kt.css=Qi;h([zt()],kt.prototype,"svg",2);h([v({reflect:!0})],kt.prototype,"name",2);h([v({reflect:!0})],kt.prototype,"family",2);h([v({reflect:!0})],kt.prototype,"variant",2);h([v({attribute:"auto-width",type:Boolean,reflect:!0})],kt.prototype,"autoWidth",2);h([v({attribute:"swap-opacity",type:Boolean,reflect:!0})],kt.prototype,"swapOpacity",2);h([v()],kt.prototype,"src",2);h([v()],kt.prototype,"label",2);h([v({reflect:!0})],kt.prototype,"library",2);h([v({type:Number,reflect:!0})],kt.prototype,"rotate",2);h([v({type:String,reflect:!0})],kt.prototype,"flip",2);h([v({type:String,reflect:!0})],kt.prototype,"animation",2);h([U("label")],kt.prototype,"handleLabelChange",1);h([U(["family","name","library","variant","src","autoWidth","swapOpacity"],{waitUntilFirstUpdate:!0})],kt.prototype,"setIcon",1);kt=h([rt("wa-icon")],kt);var pa=H`
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
`;function Ns(t,e){return{top:Math.round(t.getBoundingClientRect().top-e.getBoundingClientRect().top),left:Math.round(t.getBoundingClientRect().left-e.getBoundingClientRect().left)}}var Pr=new Set;function Vs(){let t=document.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}function Hs(){let t=Number(getComputedStyle(document.body).paddingRight.replace(/px/,""));return isNaN(t)||!t?0:t}function Rr(t){if(Pr.add(t),!document.documentElement.classList.contains("wa-scroll-lock")){let e=Vs()+Hs(),o=getComputedStyle(document.documentElement).scrollbarGutter;(!o||o==="auto")&&(o="stable"),e<2&&(o=""),document.documentElement.style.setProperty("--wa-scroll-lock-gutter",o),document.documentElement.classList.add("wa-scroll-lock"),document.documentElement.style.setProperty("--wa-scroll-lock-size",`${e}px`)}}function qr(t){Pr.delete(t),Pr.size===0&&(document.documentElement.classList.remove("wa-scroll-lock"),document.documentElement.style.removeProperty("--wa-scroll-lock-size"))}function ha(t,e,o="vertical",a="smooth"){let s=Ns(t,e),c=s.top+e.scrollTop,d=s.left+e.scrollLeft,m=e.scrollLeft,g=e.scrollLeft+e.offsetWidth,y=e.scrollTop,C=e.scrollTop+e.offsetHeight;(o==="horizontal"||o==="both")&&(d<m?e.scrollTo({left:d,behavior:a}):d+t.clientWidth>g&&e.scrollTo({left:d-e.offsetWidth+t.clientWidth,behavior:a})),(o==="vertical"||o==="both")&&(c<y?e.scrollTo({top:c,behavior:a}):c+t.clientHeight>C&&e.scrollTo({top:c-e.offsetHeight+t.clientHeight,behavior:a}))}var Xo=class extends Event{constructor(){super("wa-clear",{bubbles:!0,cancelable:!1,composed:!0})}};var Oe=[];function We(t){Oe.push(t)}function $e(t){for(let e=Oe.length-1;e>=0;e--)if(Oe[e]===t){Oe.splice(e,1);break}}function ze(t){return Oe.length>0&&Oe[Oe.length-1]===t}var je=class extends Event{constructor(){super("wa-show",{bubbles:!0,cancelable:!0,composed:!0})}};var Ke=class extends Event{constructor(t){super("wa-hide",{bubbles:!0,cancelable:!0,composed:!0}),this.detail=t}};var Ye=class extends Event{constructor(){super("wa-after-hide",{bubbles:!0,cancelable:!1,composed:!0})}};var Ge=class extends Event{constructor(){super("wa-after-show",{bubbles:!0,cancelable:!1,composed:!0})}};function Xe(t,e){return new Promise(o=>{function a(s){s.target===t&&(t.removeEventListener(e,a),o())}t.addEventListener(e,a)})}function Gt(t,e){return new Promise(o=>{let a=new AbortController,{signal:s}=a;if(t.classList.contains(e))return;t.classList.add(e);let c=!1,d=()=>{c||(c=!0,t.classList.remove(e),o(),a.abort())};t.addEventListener("animationend",d,{once:!0,signal:s}),t.addEventListener("animationcancel",d,{once:!0,signal:s}),requestAnimationFrame(()=>{!c&&t.getAnimations().length===0&&d()})})}var Jo=(t={})=>{let{validationElement:e,validationProperty:o}=t;e||(e=Object.assign(document.createElement("input"),{required:!0})),o||(o="value");let a={observedAttributes:["required"],message:e.validationMessage,checkValidity(s){let c={message:"",isValid:!0,invalidKeys:[]};return(s.required??s.hasAttribute("required"))&&!s[o]&&(c.message=typeof a.message=="function"?a.message(s):a.message||"",c.isValid=!1,c.invalidKeys.push("valueMissing")),c}};return a};var Je=H`
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
`;var ho=class extends re{constructor(e){if(super(e),this.it=J,e.type!==Pt.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===J||e==null)return this._t=void 0,this.it=e;if(e===xt)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let o=[e];return o.raw=o,this._t={_$litType$:this.constructor.resultType,strings:o,values:[]}}};ho.directiveName="unsafeHTML",ho.resultType=1;var fa=ve(ho);var V=class extends Ct{constructor(){super(...arguments),this.assumeInteractionOn=["blur","input"],this.cachedOptions=null,this.hasSlotController=new oe(this,"hint","label"),this.localize=new St(this),this.selectionOrder=new Map,this.typeToSelectString="",this.slotChangePending=!1,this.displayLabel="",this.selectedOptions=[],this.name="",this._defaultValue=null,this.size="m",this.placeholder="",this.multiple=!1,this.maxOptionsVisible=3,this.disabled=!1,this.withClear=!1,this.open=!1,this.appearance="outlined",this.pill=!1,this.label="",this.placement="bottom",this.hint="",this.withLabel=!1,this.withHint=!1,this.required=!1,this.getTag=t=>z`
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
      `,this.handleDocumentFocusIn=t=>{let e=t.composedPath();this&&!e.includes(this)&&this.hide()},this.handleDocumentKeyDown=t=>{let e=t.target,o=e.closest('[part~="clear-button"]')!==null,a=e.closest("wa-button")!==null;if(!(o||a)){if(t.key==="Escape"&&this.open&&ze(this)&&(t.preventDefault(),t.stopPropagation(),this.hide(),this.displayInput.focus({preventScroll:!0})),t.key==="Enter"||t.key===" "&&this.typeToSelectString===""){if(t.preventDefault(),t.stopImmediatePropagation(),!this.open){this.show();return}this.currentOption&&!this.currentOption.disabled&&(this.valueHasChanged=!0,this.hasInteracted=!0,this.multiple?this.toggleOptionSelection(this.currentOption):this.setSelectedOptions(this.currentOption),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:!0})));return}if(["ArrowUp","ArrowDown","Home","End"].includes(t.key)){let s=this.getAllOptions(),c=s.indexOf(this.currentOption),d=Math.max(0,c);if(t.preventDefault(),!this.open&&(this.show(),this.currentOption))return;t.key==="ArrowDown"?(d=c+1,d>s.length-1&&(d=0)):t.key==="ArrowUp"?(d=c-1,d<0&&(d=s.length-1)):t.key==="Home"?d=0:t.key==="End"&&(d=s.length-1),this.setCurrentOption(s[d])}if(t.key?.length===1||t.key==="Backspace"){let s=this.getAllOptions();if(t.metaKey||t.ctrlKey||t.altKey)return;if(!this.open){if(t.key==="Backspace")return;this.show()}t.stopPropagation(),t.preventDefault(),clearTimeout(this.typeToSelectTimeout),this.typeToSelectTimeout=window.setTimeout(()=>this.typeToSelectString="",1e3),t.key==="Backspace"?this.typeToSelectString=this.typeToSelectString.slice(0,-1):this.typeToSelectString+=t.key.toLowerCase();for(let c of s)if(c.label.toLowerCase().startsWith(this.typeToSelectString)){this.setCurrentOption(c);break}}}},this.handleDocumentMouseDown=t=>{let e=t.composedPath();this&&!e.includes(this)&&this.hide()}}static get validators(){let t=[Jo({validationElement:Object.assign(document.createElement("select"),{required:!0})})];return[...super.validators,...t]}get validationTarget(){return this.valueInput}set defaultValue(t){this._defaultValue=this.convertDefaultValue(t)}get defaultValue(){return this.convertDefaultValue(this._defaultValue)}rawValuesEqual(t,e){return t==null&&e==null?!0:t==null||e==null||t.length!==e.length?!1:t.every((o,a)=>o===e[a])}convertDefaultValue(t){return!(this.multiple||this.hasAttribute("multiple"))&&Array.isArray(t)&&(t=t[0]),t}set value(t){let e=this.value;t instanceof FormData&&(t=t.getAll(this.name)),t!=null&&!Array.isArray(t)&&(t=[t]);let o=this._value;this._value=t??null,this.rawValuesEqual(o,this._value)||(this.valueHasChanged=!0,this.requestUpdate("value",e))}get value(){let t=this._value??this.defaultValue??null;t!=null&&(t=Array.isArray(t)?t:[t]),this.optionValues=new Set(this.getAllOptions().filter(o=>!o.disabled).map(o=>o.value));let e=t;return t!=null&&(e=t.filter(o=>this.optionValues.has(o)),e=this.multiple?e:e[0],e=e??null),e}handleSizeChange(){Ht(this.localName,this.size)}connectedCallback(){super.connectedCallback(),this.processSlotChange(),this.open=!1}disconnectedCallback(){super.disconnectedCallback(),this.removeOpenListeners(),this.cachedOptions=null}updateDefaultValue(){let e=this.getAllOptions().filter(o=>o.hasAttribute("selected")||o.defaultSelected);if(e.length>0){let o=e.map(a=>a.value);this._defaultValue=this.multiple?o:o[0]}this.hasAttribute("value")&&(this._defaultValue=this.getAttribute("value")||null)}addOpenListeners(){document.addEventListener("focusin",this.handleDocumentFocusIn),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown),We(this),this.getRootNode()!==document&&this.getRootNode().addEventListener("focusin",this.handleDocumentFocusIn)}removeOpenListeners(){document.removeEventListener("focusin",this.handleDocumentFocusIn),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),$e(this),this.getRootNode()!==document&&this.getRootNode().removeEventListener("focusin",this.handleDocumentFocusIn)}handleFocus(){this.displayInput.setSelectionRange(0,0)}handleLabelClick(){this.displayInput.focus()}handleComboboxClick(t){t.preventDefault()}handleComboboxMouseDown(t){let o=t.composedPath().some(a=>a instanceof Element&&a.tagName.toLowerCase()==="wa-button");this.disabled||o||(t.preventDefault(),this.displayInput.focus({preventScroll:!0}),this.open=!this.open)}handleComboboxKeyDown(t){t.stopPropagation(),this.handleDocumentKeyDown(t)}handleClearClick(t){t.stopPropagation(),this.hasInteracted=!0,this.valueHasChanged=!0,this.value!==null&&(this.displayLabel="",this.selectionOrder.clear(),this.setSelectedOptions([]),this.displayInput.focus({preventScroll:!0}),this.updateComplete.then(()=>{this.dispatchEvent(new Xo),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}))}handleClearMouseDown(t){t.stopPropagation(),t.preventDefault()}handleOptionClick(t){let o=t.target.closest("wa-option");o&&!o.disabled&&(this.hasInteracted=!0,this.valueHasChanged=!0,this.multiple?this.toggleOptionSelection(o):this.setSelectedOptions(o),this.updateComplete.then(()=>this.displayInput.focus({preventScroll:!0})),this.requestUpdate("value"),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:!0})))}handleDefaultSlotChange(){this.slotChangePending||(this.slotChangePending=!0,queueMicrotask(()=>{this.slotChangePending=!1,this.processSlotChange()}))}processSlotChange(){customElements.get("wa-option")||customElements.whenDefined("wa-option").then(()=>this.handleDefaultSlotChange()),this.cachedOptions=null;let t=this.getAllOptions();this.updateDefaultValue();let e=this.value;if(e==null||!this.valueHasChanged&&!this.hasInteracted){this.selectionChanged();return}Array.isArray(e)||(e=[e]);let o=t.filter(a=>e.includes(a.value));this.setSelectedOptions(o)}handleTagRemove(t,e){if(t.stopPropagation(),this.disabled)return;this.hasInteracted=!0,this.valueHasChanged=!0;let o=e;if(!o){let a=t.target.closest("wa-tag[data-value]");if(a){let s=a.dataset.value;o=this.selectedOptions.find(c=>c.value===s)}}o&&(this.toggleOptionSelection(o,!1),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}))}getAllOptions(){return this.cachedOptions?this.cachedOptions:this?.querySelectorAll?(this.cachedOptions=[...this.querySelectorAll("wa-option")],this.cachedOptions):[]}getFirstOption(){return this.querySelector("wa-option")}setCurrentOption(t){this.getAllOptions().forEach(o=>{o.current=!1,o.tabIndex=-1}),t&&(this.currentOption=t,t.current=!0,t.tabIndex=0,t.focus({preventScroll:!0}))}setSelectedOptions(t){let e=this.getAllOptions(),o=Array.isArray(t)?t:[t];e.forEach(a=>{o.includes(a)||(a.selected=!1)}),o.length&&o.forEach(a=>a.selected=!0),this.selectionChanged()}toggleOptionSelection(t,e){e===!0||e===!1?t.selected=e:t.selected=!t.selected,this.selectionChanged()}selectionChanged(){let e=this.getAllOptions().filter(d=>{if(!this.hasInteracted&&!this.valueHasChanged){let m=this.defaultValue,g=Array.isArray(m)?m:[m];return d.hasAttribute("selected")||d.defaultSelected||d.selected||g?.includes(d.value)}return d.selected}),o=new Set(e.map(d=>d.value));for(let d of this.selectionOrder.keys())o.has(d)||this.selectionOrder.delete(d);let s=(this.selectionOrder.size>0?Math.max(...this.selectionOrder.values()):-1)+1;for(let d of e)this.selectionOrder.has(d.value)||this.selectionOrder.set(d.value,s++);this.selectedOptions=e.sort((d,m)=>{let g=this.selectionOrder.get(d.value)??0,y=this.selectionOrder.get(m.value)??0;return g-y});let c=new Set(this.selectedOptions.map(d=>d.value));if(c.size>0||this._value){let d=this._value;if(this._value==null){let m=this.defaultValue??[];this._value=Array.isArray(m)?m:[m]}this._value=this._value?.filter(m=>!this.optionValues?.has(m))??null,this._value?.unshift(...c),this.requestUpdate("value",d)}if(this.multiple)this.placeholder&&!this.value?.length?this.displayLabel="":this.displayLabel=this.localize.term("numOptionsSelected",this.selectedOptions.length);else{let d=this.selectedOptions[0];this.displayLabel=d?.label??""}this.updateComplete.then(()=>{this.updateValidity()})}get tags(){return this.selectedOptions.map((t,e)=>{if(e<this.maxOptionsVisible||this.maxOptionsVisible<=0){let o=this.getTag(t,e);return o?typeof o=="string"?fa(o):o:null}else if(e===this.maxOptionsVisible)return z`
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
        `;return null})}updated(t){super.updated(t),(t.has("value")||t.has("displayLabel"))&&this.customStates.set("blank",!this.value&&!this.displayLabel)}handleDisabledChange(){this.disabled&&this.open&&(this.open=!1)}handleValueChange(){let t=this.getAllOptions(),e=Array.isArray(this.value)?this.value:[this.value],o=t.filter(a=>e.includes(a.value));this.setSelectedOptions(o),this.updateValidity()}async handleOpenChange(){if(this.open&&!this.disabled){this.setCurrentOption(this.selectedOptions[0]||this.getFirstOption());let t=new je;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1;return}this.addOpenListeners(),this.listbox.hidden=!1,this.popup.active=!0,requestAnimationFrame(()=>{this.setCurrentOption(this.currentOption)}),await Gt(this.popup.popup,"show"),this.currentOption&&ha(this.currentOption,this.listbox,"vertical","auto"),this.dispatchEvent(new Ge)}else{let t=new Ke;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1;return}this.removeOpenListeners(),await Gt(this.popup.popup,"hide"),this.listbox.hidden=!0,this.popup.active=!1,this.dispatchEvent(new Ye)}}async show(){if(this.open||this.disabled){this.open=!1;return}return this.open=!0,Xe(this,"wa-after-show")}async hide(){if(!this.open||this.disabled){this.open=!1;return}return this.open=!1,Xe(this,"wa-after-hide")}focus(t){this.displayInput.focus(t)}blur(){this.displayInput.blur()}formResetCallback(){this.selectionOrder.clear(),this.value=this.defaultValue,super.formResetCallback(),this.handleValueChange(),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}render(){let t=this.hasUpdated?this.hasSlotController.test("label"):this.withLabel,e=this.hasUpdated?this.hasSlotController.test("hint"):this.withHint,o=this.label?!0:!!t,a=this.hint?!0:!!e,s=(this.hasUpdated||!1)&&this.withClear&&!this.disabled&&(this.displayLabel||this.value&&this.value.length>0);return z`
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
              ${this.multiple&&this.hasUpdated?z`<div part="tags" class="tags" @wa-remove=${this.handleTagRemove}>${this.tags}</div>`:""}

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

              ${s?z`
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
          class=${wt({"has-slotted":a})}
          aria-hidden=${a?"false":"true"}
          >${this.hint}</slot
        >
      </div>
    `}};V.css=[pa,Je,Ut];h([st(".select")],V.prototype,"popup",2);h([st(".combobox")],V.prototype,"combobox",2);h([st(".display-input")],V.prototype,"displayInput",2);h([st(".value-input")],V.prototype,"valueInput",2);h([st(".listbox")],V.prototype,"listbox",2);h([zt()],V.prototype,"displayLabel",2);h([zt()],V.prototype,"currentOption",2);h([zt()],V.prototype,"selectedOptions",2);h([v({reflect:!0})],V.prototype,"name",2);h([v({attribute:!1})],V.prototype,"defaultValue",1);h([v({attribute:"value",reflect:!1})],V.prototype,"value",1);h([v({reflect:!0})],V.prototype,"size",2);h([U("size")],V.prototype,"handleSizeChange",1);h([v()],V.prototype,"placeholder",2);h([v({type:Boolean,reflect:!0})],V.prototype,"multiple",2);h([v({attribute:"max-options-visible",type:Number})],V.prototype,"maxOptionsVisible",2);h([v({type:Boolean})],V.prototype,"disabled",2);h([v({attribute:"with-clear",type:Boolean})],V.prototype,"withClear",2);h([v({type:Boolean,reflect:!0})],V.prototype,"open",2);h([v({reflect:!0})],V.prototype,"appearance",2);h([v({type:Boolean,reflect:!0})],V.prototype,"pill",2);h([v()],V.prototype,"label",2);h([v({reflect:!0})],V.prototype,"placement",2);h([v({attribute:"hint"})],V.prototype,"hint",2);h([v({attribute:"with-label",type:Boolean})],V.prototype,"withLabel",2);h([v({attribute:"with-hint",type:Boolean})],V.prototype,"withHint",2);h([v({type:Boolean,reflect:!0})],V.prototype,"required",2);h([v({attribute:!1})],V.prototype,"getTag",2);h([U("disabled",{waitUntilFirstUpdate:!0})],V.prototype,"handleDisabledChange",1);h([U("value",{waitUntilFirstUpdate:!0})],V.prototype,"handleValueChange",1);h([U("open",{waitUntilFirstUpdate:!0})],V.prototype,"handleOpenChange",1);V=h([rt("wa-select")],V);V.disableWarning?.("change-in-update");var ma=class extends Event{constructor(){super("wa-remove",{bubbles:!0,cancelable:!1,composed:!0})}};var ga=H`
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
`;var pe=class extends ct{constructor(){super(...arguments),this.localize=new St(this),this.variant="neutral",this.appearance="filled-outlined",this.size="m",this.pill=!1,this.withRemove=!1}handleSizeChange(){Ht(this.localName,this.size)}handleRemoveClick(){this.dispatchEvent(new ma)}render(){return z`
      <slot part="content" class="content"></slot>

      ${this.withRemove?z`
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
    `}};pe.css=[ga,Ve,Ut];h([v({reflect:!0})],pe.prototype,"variant",2);h([v({reflect:!0})],pe.prototype,"appearance",2);h([v({reflect:!0})],pe.prototype,"size",2);h([U("size")],pe.prototype,"handleSizeChange",1);h([v({type:Boolean,reflect:!0})],pe.prototype,"pill",2);h([v({attribute:"with-remove",type:Boolean})],pe.prototype,"withRemove",2);pe=h([rt("wa-tag")],pe);var va=H`
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
`;function fo(t,e=0){if(!t||!globalThis.Node)return"";if(typeof t[Symbol.iterator]=="function")return(Array.isArray(t)?t:[...t]).map(s=>fo(s,--e)).join("");let o=t;if(o.nodeType===Node.TEXT_NODE)return o.textContent??"";if(o.nodeType===Node.ELEMENT_NODE){let a=o;if(a.hasAttribute("slot")||a.matches("style, script"))return"";if(a instanceof HTMLSlotElement){let s=a.assignedNodes({flatten:!0});if(s.length>0)return fo(s,--e)}return e>-1?fo(a,--e):a.textContent??""}return o.hasChildNodes()?fo(o.childNodes,--e):""}var Xt=class extends ct{constructor(){super(...arguments),this.localize=new St(this),this.cachedDefaultLabel="",this.isInitialized=!1,this.isDefaultLabelDirty=!0,this.current=!1,this.value="",this.disabled=!1,this.selected=!1,this.defaultSelected=!1,this._label="",this.handleHover=t=>{t.type==="mouseenter"?this.customStates.set("hover",!0):t.type==="mouseleave"&&this.customStates.set("hover",!1)}}set label(t){let e=this._label;this._label=t||"",this._label!==e&&this.requestUpdate("label",e)}get label(){return this._label?this._label:this.defaultLabel}get defaultLabel(){return(this.isDefaultLabelDirty||!this.cachedDefaultLabel)&&this.updateDefaultLabel(),this.cachedDefaultLabel}connectedCallback(){super.connectedCallback(),this.setAttribute("role","option"),this.setAttribute("aria-selected","false"),this.addEventListener("mouseenter",this.handleHover),this.addEventListener("mouseleave",this.handleHover)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("mouseenter",this.handleHover),this.removeEventListener("mouseleave",this.handleHover)}handleDefaultSlotChange(){this.isDefaultLabelDirty=!0,this.isInitialized?(customElements.whenDefined("wa-select").then(()=>{let t=this.closest("wa-select");t&&t.handleDefaultSlotChange()}),customElements.whenDefined("wa-combobox").then(()=>{let t=this.closest("wa-combobox");t&&t.handleDefaultSlotChange()})):this.isInitialized=!0}willUpdate(t){if(t.has("defaultSelected")&&!this.closest("wa-combobox, wa-select")?.hasInteracted&&this.defaultSelected){let e=this.selected;this.selected=this.defaultSelected,this.requestUpdate("selected",e)}super.willUpdate(t)}updated(t){super.updated(t),t.has("disabled")&&(this.setAttribute("aria-disabled",this.disabled?"true":"false"),this.customStates.set("disabled",this.disabled)),t.has("selected")&&(this.setAttribute("aria-selected",this.selected?"true":"false"),this.customStates.set("selected",this.selected)),t.has("value")&&(typeof this.value!="string"&&(this.value=String(this.value)),this.handleDefaultSlotChange()),t.has("current")&&this.customStates.set("current",this.current)}firstUpdated(t){if(super.firstUpdated(t),this.selected&&!this.defaultSelected){let e=this.closest("wa-select, wa-combobox");e&&!e.hasInteracted&&e.selectionChanged?.()}}updateDefaultLabel(){let t=this.cachedDefaultLabel;this.cachedDefaultLabel=fo(this).trim(),this.isDefaultLabelDirty=!1;let e=this.cachedDefaultLabel!==t;return!this._label&&e&&this.requestUpdate("label",t),e}render(){return z`
      ${this.selected?z`<wa-icon
            part="checked-icon"
            class="check"
            name="check"
            library="system"
            variant="solid"
            aria-hidden="true"
          ></wa-icon>`:z`<span part="checked-icon" class="check" aria-hidden="true"></span>`}
      <slot part="start" name="start" class="start"></slot>
      <slot part="label" class="label" @slotchange=${this.handleDefaultSlotChange}></slot>
      <slot part="end" name="end" class="end"></slot>
    `}};Xt.css=va;h([st(".label")],Xt.prototype,"defaultSlot",2);h([zt()],Xt.prototype,"current",2);h([v({reflect:!0})],Xt.prototype,"value",2);h([v({type:Boolean})],Xt.prototype,"disabled",2);h([v({type:Boolean,attribute:!1})],Xt.prototype,"selected",2);h([v({type:Boolean,attribute:"selected"})],Xt.prototype,"defaultSelected",2);h([v()],Xt.prototype,"label",1);Xt=h([rt("wa-option")],Xt);var wa=class extends Event{constructor(){super("wa-reposition",{bubbles:!0,cancelable:!1,composed:!0})}};var ba=H`
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
`;var ie=Math.min,It=Math.max,go=Math.round,vo=Math.floor,Jt=t=>({x:t,y:t}),Us={left:"right",right:"left",bottom:"top",top:"bottom"};function Zo(t,e,o){return It(t,ie(e,o))}function Ie(t,e){return typeof t=="function"?t(e):t}function he(t){return t.split("-")[0]}function Te(t){return t.split("-")[1]}function Nr(t){return t==="x"?"y":"x"}function tr(t){return t==="y"?"height":"width"}function ae(t){let e=t[0];return e==="t"||e==="b"?"y":"x"}function er(t){return Nr(ae(t))}function Ca(t,e,o){o===void 0&&(o=!1);let a=Te(t),s=er(t),c=tr(s),d=s==="x"?a===(o?"end":"start")?"right":"left":a==="start"?"bottom":"top";return e.reference[c]>e.floating[c]&&(d=mo(d)),[d,mo(d)]}function _a(t){let e=mo(t);return[Qo(t),e,Qo(e)]}function Qo(t){return t.includes("start")?t.replace("start","end"):t.replace("end","start")}var ya=["left","right"],xa=["right","left"],Ws=["top","bottom"],js=["bottom","top"];function Ks(t,e,o){switch(t){case"top":case"bottom":return o?e?xa:ya:e?ya:xa;case"left":case"right":return e?Ws:js;default:return[]}}function ka(t,e,o,a){let s=Te(t),c=Ks(he(t),o==="start",a);return s&&(c=c.map(d=>d+"-"+s),e&&(c=c.concat(c.map(Qo)))),c}function mo(t){let e=he(t);return Us[e]+t.slice(e.length)}function Ys(t){return{top:0,right:0,bottom:0,left:0,...t}}function Vr(t){return typeof t!="number"?Ys(t):{top:t,right:t,bottom:t,left:t}}function Fe(t){let{x:e,y:o,width:a,height:s}=t;return{width:a,height:s,top:o,left:e,right:e+a,bottom:o+s,x:e,y:o}}function La(t,e,o){let{reference:a,floating:s}=t,c=ae(e),d=er(e),m=tr(d),g=he(e),y=c==="y",C=a.x+a.width/2-s.width/2,x=a.y+a.height/2-s.height/2,A=a[m]/2-s[m]/2,L;switch(g){case"top":L={x:C,y:a.y-s.height};break;case"bottom":L={x:C,y:a.y+a.height};break;case"right":L={x:a.x+a.width,y:x};break;case"left":L={x:a.x-s.width,y:x};break;default:L={x:a.x,y:a.y}}switch(Te(e)){case"start":L[d]-=A*(o&&y?-1:1);break;case"end":L[d]+=A*(o&&y?-1:1);break}return L}async function Sa(t,e){var o;e===void 0&&(e={});let{x:a,y:s,platform:c,rects:d,elements:m,strategy:g}=t,{boundary:y="clippingAncestors",rootBoundary:C="viewport",elementContext:x="floating",altBoundary:A=!1,padding:L=0}=Ie(e,t),E=Vr(L),R=m[A?x==="floating"?"reference":"floating":x],B=Fe(await c.getClippingRect({element:(o=await(c.isElement==null?void 0:c.isElement(R)))==null||o?R:R.contextElement||await(c.getDocumentElement==null?void 0:c.getDocumentElement(m.floating)),boundary:y,rootBoundary:C,strategy:g})),W=x==="floating"?{x:a,y:s,width:d.floating.width,height:d.floating.height}:d.reference,K=await(c.getOffsetParent==null?void 0:c.getOffsetParent(m.floating)),et=await(c.isElement==null?void 0:c.isElement(K))?await(c.getScale==null?void 0:c.getScale(K))||{x:1,y:1}:{x:1,y:1},ht=Fe(c.convertOffsetParentRelativeRectToViewportRelativeRect?await c.convertOffsetParentRelativeRectToViewportRelativeRect({elements:m,rect:W,offsetParent:K,strategy:g}):W);return{top:(B.top-ht.top+E.top)/et.y,bottom:(ht.bottom-B.bottom+E.bottom)/et.y,left:(B.left-ht.left+E.left)/et.x,right:(ht.right-B.right+E.right)/et.x}}var Gs=50,Aa=async(t,e,o)=>{let{placement:a="bottom",strategy:s="absolute",middleware:c=[],platform:d}=o,m=d.detectOverflow?d:{...d,detectOverflow:Sa},g=await(d.isRTL==null?void 0:d.isRTL(e)),y=await d.getElementRects({reference:t,floating:e,strategy:s}),{x:C,y:x}=La(y,a,g),A=a,L=0,E={};for(let I=0;I<c.length;I++){let R=c[I];if(!R)continue;let{name:B,fn:W}=R,{x:K,y:et,data:ht,reset:ft}=await W({x:C,y:x,initialPlacement:a,placement:A,strategy:s,middlewareData:E,rects:y,platform:m,elements:{reference:t,floating:e}});C=K??C,x=et??x,E[B]={...E[B],...ht},ft&&L<Gs&&(L++,typeof ft=="object"&&(ft.placement&&(A=ft.placement),ft.rects&&(y=ft.rects===!0?await d.getElementRects({reference:t,floating:e,strategy:s}):ft.rects),{x:C,y:x}=La(y,A,g)),I=-1)}return{x:C,y:x,placement:A,strategy:s,middlewareData:E}},Ea=t=>({name:"arrow",options:t,async fn(e){let{x:o,y:a,placement:s,rects:c,platform:d,elements:m,middlewareData:g}=e,{element:y,padding:C=0}=Ie(t,e)||{};if(y==null)return{};let x=Vr(C),A={x:o,y:a},L=er(s),E=tr(L),I=await d.getDimensions(y),R=L==="y",B=R?"top":"left",W=R?"bottom":"right",K=R?"clientHeight":"clientWidth",et=c.reference[E]+c.reference[L]-A[L]-c.floating[E],ht=A[L]-c.reference[L],ft=await(d.getOffsetParent==null?void 0:d.getOffsetParent(y)),bt=ft?ft[K]:0;(!bt||!await(d.isElement==null?void 0:d.isElement(ft)))&&(bt=m.floating[K]||c.floating[E]);let Kt=et/2-ht/2,qt=bt/2-I[E]/2-1,Tt=ie(x[B],qt),te=ie(x[W],qt),Mt=Tt,ee=bt-I[E]-te,gt=bt/2-I[E]/2+Kt,le=Zo(Mt,gt,ee),Yt=!g.arrow&&Te(s)!=null&&gt!==le&&c.reference[E]/2-(gt<Mt?Tt:te)-I[E]/2<0,Bt=Yt?gt<Mt?gt-Mt:gt-ee:0;return{[L]:A[L]+Bt,data:{[L]:le,centerOffset:gt-le-Bt,...Yt&&{alignmentOffset:Bt}},reset:Yt}}});var Oa=function(t){return t===void 0&&(t={}),{name:"flip",options:t,async fn(e){var o,a;let{placement:s,middlewareData:c,rects:d,initialPlacement:m,platform:g,elements:y}=e,{mainAxis:C=!0,crossAxis:x=!0,fallbackPlacements:A,fallbackStrategy:L="bestFit",fallbackAxisSideDirection:E="none",flipAlignment:I=!0,...R}=Ie(t,e);if((o=c.arrow)!=null&&o.alignmentOffset)return{};let B=he(s),W=ae(m),K=he(m)===m,et=await(g.isRTL==null?void 0:g.isRTL(y.floating)),ht=A||(K||!I?[mo(m)]:_a(m)),ft=E!=="none";!A&&ft&&ht.push(...ka(m,I,E,et));let bt=[m,...ht],Kt=await g.detectOverflow(e,R),qt=[],Tt=((a=c.flip)==null?void 0:a.overflows)||[];if(C&&qt.push(Kt[B]),x){let gt=Ca(s,d,et);qt.push(Kt[gt[0]],Kt[gt[1]])}if(Tt=[...Tt,{placement:s,overflows:qt}],!qt.every(gt=>gt<=0)){var te,Mt;let gt=(((te=c.flip)==null?void 0:te.index)||0)+1,le=bt[gt];if(le&&(!(x==="alignment"?W!==ae(le):!1)||Tt.every(At=>ae(At.placement)===W?At.overflows[0]>0:!0)))return{data:{index:gt,overflows:Tt},reset:{placement:le}};let Yt=(Mt=Tt.filter(Bt=>Bt.overflows[0]<=0).sort((Bt,At)=>Bt.overflows[1]-At.overflows[1])[0])==null?void 0:Mt.placement;if(!Yt)switch(L){case"bestFit":{var ee;let Bt=(ee=Tt.filter(At=>{if(ft){let Nt=ae(At.placement);return Nt===W||Nt==="y"}return!0}).map(At=>[At.placement,At.overflows.filter(Nt=>Nt>0).reduce((Nt,Re)=>Nt+Re,0)]).sort((At,Nt)=>At[1]-Nt[1])[0])==null?void 0:ee[0];Bt&&(Yt=Bt);break}case"initialPlacement":Yt=m;break}if(s!==Yt)return{reset:{placement:Yt}}}return{}}}};var Xs=new Set(["left","top"]);async function Js(t,e){let{placement:o,platform:a,elements:s}=t,c=await(a.isRTL==null?void 0:a.isRTL(s.floating)),d=he(o),m=Te(o),g=ae(o)==="y",y=Xs.has(d)?-1:1,C=c&&g?-1:1,x=Ie(e,t),{mainAxis:A,crossAxis:L,alignmentAxis:E}=typeof x=="number"?{mainAxis:x,crossAxis:0,alignmentAxis:null}:{mainAxis:x.mainAxis||0,crossAxis:x.crossAxis||0,alignmentAxis:x.alignmentAxis};return m&&typeof E=="number"&&(L=m==="end"?E*-1:E),g?{x:L*C,y:A*y}:{x:A*y,y:L*C}}var $a=function(t){return t===void 0&&(t=0),{name:"offset",options:t,async fn(e){var o,a;let{x:s,y:c,placement:d,middlewareData:m}=e,g=await Js(e,t);return d===((o=m.offset)==null?void 0:o.placement)&&(a=m.arrow)!=null&&a.alignmentOffset?{}:{x:s+g.x,y:c+g.y,data:{...g,placement:d}}}}},za=function(t){return t===void 0&&(t={}),{name:"shift",options:t,async fn(e){let{x:o,y:a,placement:s,platform:c}=e,{mainAxis:d=!0,crossAxis:m=!1,limiter:g={fn:B=>{let{x:W,y:K}=B;return{x:W,y:K}}},...y}=Ie(t,e),C={x:o,y:a},x=await c.detectOverflow(e,y),A=ae(he(s)),L=Nr(A),E=C[L],I=C[A];if(d){let B=L==="y"?"top":"left",W=L==="y"?"bottom":"right",K=E+x[B],et=E-x[W];E=Zo(K,E,et)}if(m){let B=A==="y"?"top":"left",W=A==="y"?"bottom":"right",K=I+x[B],et=I-x[W];I=Zo(K,I,et)}let R=g.fn({...e,[L]:E,[A]:I});return{...R,data:{x:R.x-o,y:R.y-a,enabled:{[L]:d,[A]:m}}}}}};var Ia=function(t){return t===void 0&&(t={}),{name:"size",options:t,async fn(e){var o,a;let{placement:s,rects:c,platform:d,elements:m}=e,{apply:g=()=>{},...y}=Ie(t,e),C=await d.detectOverflow(e,y),x=he(s),A=Te(s),L=ae(s)==="y",{width:E,height:I}=c.floating,R,B;x==="top"||x==="bottom"?(R=x,B=A===(await(d.isRTL==null?void 0:d.isRTL(m.floating))?"start":"end")?"left":"right"):(B=x,R=A==="end"?"top":"bottom");let W=I-C.top-C.bottom,K=E-C.left-C.right,et=ie(I-C[R],W),ht=ie(E-C[B],K),ft=!e.middlewareData.shift,bt=et,Kt=ht;if((o=e.middlewareData.shift)!=null&&o.enabled.x&&(Kt=K),(a=e.middlewareData.shift)!=null&&a.enabled.y&&(bt=W),ft&&!A){let Tt=It(C.left,0),te=It(C.right,0),Mt=It(C.top,0),ee=It(C.bottom,0);L?Kt=E-2*(Tt!==0||te!==0?Tt+te:It(C.left,C.right)):bt=I-2*(Mt!==0||ee!==0?Mt+ee:It(C.top,C.bottom))}await g({...e,availableWidth:Kt,availableHeight:bt});let qt=await d.getDimensions(m.floating);return E!==qt.width||I!==qt.height?{reset:{rects:!0}}:{}}}};function or(){return typeof window<"u"}function Be(t){return Fa(t)?(t.nodeName||"").toLowerCase():"#document"}function Ft(t){var e;return(t==null||(e=t.ownerDocument)==null?void 0:e.defaultView)||window}function Qt(t){var e;return(e=(Fa(t)?t.ownerDocument:t.document)||window.document)==null?void 0:e.documentElement}function Fa(t){return or()?t instanceof Node||t instanceof Ft(t).Node:!1}function Wt(t){return or()?t instanceof Element||t instanceof Ft(t).Element:!1}function ne(t){return or()?t instanceof HTMLElement||t instanceof Ft(t).HTMLElement:!1}function Ta(t){return!or()||typeof ShadowRoot>"u"?!1:t instanceof ShadowRoot||t instanceof Ft(t).ShadowRoot}function Qe(t){let{overflow:e,overflowX:o,overflowY:a,display:s}=jt(t);return/auto|scroll|overlay|hidden|clip/.test(e+a+o)&&s!=="inline"&&s!=="contents"}function Ma(t){return/^(table|td|th)$/.test(Be(t))}function wo(t){try{if(t.matches(":popover-open"))return!0}catch{}try{return t.matches(":modal")}catch{return!1}}var Qs=/transform|translate|scale|rotate|perspective|filter/,Zs=/paint|layout|strict|content/,Me=t=>!!t&&t!=="none",Hr;function Ze(t){let e=Wt(t)?jt(t):t;return Me(e.transform)||Me(e.translate)||Me(e.scale)||Me(e.rotate)||Me(e.perspective)||!rr()&&(Me(e.backdropFilter)||Me(e.filter))||Qs.test(e.willChange||"")||Zs.test(e.contain||"")}function Ba(t){let e=fe(t);for(;ne(e)&&!De(e);){if(Ze(e))return e;if(wo(e))return null;e=fe(e)}return null}function rr(){return Hr==null&&(Hr=typeof CSS<"u"&&CSS.supports&&CSS.supports("-webkit-backdrop-filter","none")),Hr}function De(t){return/^(html|body|#document)$/.test(Be(t))}function jt(t){return Ft(t).getComputedStyle(t)}function bo(t){return Wt(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.scrollX,scrollTop:t.scrollY}}function fe(t){if(Be(t)==="html")return t;let e=t.assignedSlot||t.parentNode||Ta(t)&&t.host||Qt(t);return Ta(e)?e.host:e}function Da(t){let e=fe(t);return De(e)?t.ownerDocument?t.ownerDocument.body:t.body:ne(e)&&Qe(e)?e:Da(e)}function me(t,e,o){var a;e===void 0&&(e=[]),o===void 0&&(o=!0);let s=Da(t),c=s===((a=t.ownerDocument)==null?void 0:a.body),d=Ft(s);if(c){let m=ir(d);return e.concat(d,d.visualViewport||[],Qe(s)?s:[],m&&o?me(m):[])}else return e.concat(s,me(s,[],o))}function ir(t){return t.parent&&Object.getPrototypeOf(t.parent)?t.frameElement:null}function Na(t){let e=jt(t),o=parseFloat(e.width)||0,a=parseFloat(e.height)||0,s=ne(t),c=s?t.offsetWidth:o,d=s?t.offsetHeight:a,m=go(o)!==c||go(a)!==d;return m&&(o=c,a=d),{width:o,height:a,$:m}}function Wr(t){return Wt(t)?t:t.contextElement}function to(t){let e=Wr(t);if(!ne(e))return Jt(1);let o=e.getBoundingClientRect(),{width:a,height:s,$:c}=Na(e),d=(c?go(o.width):o.width)/a,m=(c?go(o.height):o.height)/s;return(!d||!Number.isFinite(d))&&(d=1),(!m||!Number.isFinite(m))&&(m=1),{x:d,y:m}}var tl=Jt(0);function Va(t){let e=Ft(t);return!rr()||!e.visualViewport?tl:{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}}function el(t,e,o){return e===void 0&&(e=!1),!o||e&&o!==Ft(t)?!1:e}function Pe(t,e,o,a){e===void 0&&(e=!1),o===void 0&&(o=!1);let s=t.getBoundingClientRect(),c=Wr(t),d=Jt(1);e&&(a?Wt(a)&&(d=to(a)):d=to(t));let m=el(c,o,a)?Va(c):Jt(0),g=(s.left+m.x)/d.x,y=(s.top+m.y)/d.y,C=s.width/d.x,x=s.height/d.y;if(c){let A=Ft(c),L=a&&Wt(a)?Ft(a):a,E=A,I=ir(E);for(;I&&a&&L!==E;){let R=to(I),B=I.getBoundingClientRect(),W=jt(I),K=B.left+(I.clientLeft+parseFloat(W.paddingLeft))*R.x,et=B.top+(I.clientTop+parseFloat(W.paddingTop))*R.y;g*=R.x,y*=R.y,C*=R.x,x*=R.y,g+=K,y+=et,E=Ft(I),I=ir(E)}}return Fe({width:C,height:x,x:g,y})}function ar(t,e){let o=bo(t).scrollLeft;return e?e.left+o:Pe(Qt(t)).left+o}function Ha(t,e){let o=t.getBoundingClientRect(),a=o.left+e.scrollLeft-ar(t,o),s=o.top+e.scrollTop;return{x:a,y:s}}function ol(t){let{elements:e,rect:o,offsetParent:a,strategy:s}=t,c=s==="fixed",d=Qt(a),m=e?wo(e.floating):!1;if(a===d||m&&c)return o;let g={scrollLeft:0,scrollTop:0},y=Jt(1),C=Jt(0),x=ne(a);if((x||!x&&!c)&&((Be(a)!=="body"||Qe(d))&&(g=bo(a)),x)){let L=Pe(a);y=to(a),C.x=L.x+a.clientLeft,C.y=L.y+a.clientTop}let A=d&&!x&&!c?Ha(d,g):Jt(0);return{width:o.width*y.x,height:o.height*y.y,x:o.x*y.x-g.scrollLeft*y.x+C.x+A.x,y:o.y*y.y-g.scrollTop*y.y+C.y+A.y}}function rl(t){return Array.from(t.getClientRects())}function il(t){let e=Qt(t),o=bo(t),a=t.ownerDocument.body,s=It(e.scrollWidth,e.clientWidth,a.scrollWidth,a.clientWidth),c=It(e.scrollHeight,e.clientHeight,a.scrollHeight,a.clientHeight),d=-o.scrollLeft+ar(t),m=-o.scrollTop;return jt(a).direction==="rtl"&&(d+=It(e.clientWidth,a.clientWidth)-s),{width:s,height:c,x:d,y:m}}var Pa=25;function al(t,e){let o=Ft(t),a=Qt(t),s=o.visualViewport,c=a.clientWidth,d=a.clientHeight,m=0,g=0;if(s){c=s.width,d=s.height;let C=rr();(!C||C&&e==="fixed")&&(m=s.offsetLeft,g=s.offsetTop)}let y=ar(a);if(y<=0){let C=a.ownerDocument,x=C.body,A=getComputedStyle(x),L=C.compatMode==="CSS1Compat"&&parseFloat(A.marginLeft)+parseFloat(A.marginRight)||0,E=Math.abs(a.clientWidth-x.clientWidth-L);E<=Pa&&(c-=E)}else y<=Pa&&(c+=y);return{width:c,height:d,x:m,y:g}}function nl(t,e){let o=Pe(t,!0,e==="fixed"),a=o.top+t.clientTop,s=o.left+t.clientLeft,c=ne(t)?to(t):Jt(1),d=t.clientWidth*c.x,m=t.clientHeight*c.y,g=s*c.x,y=a*c.y;return{width:d,height:m,x:g,y}}function Ra(t,e,o){let a;if(e==="viewport")a=al(t,o);else if(e==="document")a=il(Qt(t));else if(Wt(e))a=nl(e,o);else{let s=Va(t);a={x:e.x-s.x,y:e.y-s.y,width:e.width,height:e.height}}return Fe(a)}function Ua(t,e){let o=fe(t);return o===e||!Wt(o)||De(o)?!1:jt(o).position==="fixed"||Ua(o,e)}function sl(t,e){let o=e.get(t);if(o)return o;let a=me(t,[],!1).filter(m=>Wt(m)&&Be(m)!=="body"),s=null,c=jt(t).position==="fixed",d=c?fe(t):t;for(;Wt(d)&&!De(d);){let m=jt(d),g=Ze(d);!g&&m.position==="fixed"&&(s=null),(c?!g&&!s:!g&&m.position==="static"&&!!s&&(s.position==="absolute"||s.position==="fixed")||Qe(d)&&!g&&Ua(t,d))?a=a.filter(C=>C!==d):s=m,d=fe(d)}return e.set(t,a),a}function ll(t){let{element:e,boundary:o,rootBoundary:a,strategy:s}=t,d=[...o==="clippingAncestors"?wo(e)?[]:sl(e,this._c):[].concat(o),a],m=Ra(e,d[0],s),g=m.top,y=m.right,C=m.bottom,x=m.left;for(let A=1;A<d.length;A++){let L=Ra(e,d[A],s);g=It(L.top,g),y=ie(L.right,y),C=ie(L.bottom,C),x=It(L.left,x)}return{width:y-x,height:C-g,x,y:g}}function cl(t){let{width:e,height:o}=Na(t);return{width:e,height:o}}function dl(t,e,o){let a=ne(e),s=Qt(e),c=o==="fixed",d=Pe(t,!0,c,e),m={scrollLeft:0,scrollTop:0},g=Jt(0);function y(){g.x=ar(s)}if(a||!a&&!c)if((Be(e)!=="body"||Qe(s))&&(m=bo(e)),a){let L=Pe(e,!0,c,e);g.x=L.x+e.clientLeft,g.y=L.y+e.clientTop}else s&&y();c&&!a&&s&&y();let C=s&&!a&&!c?Ha(s,m):Jt(0),x=d.left+m.scrollLeft-g.x-C.x,A=d.top+m.scrollTop-g.y-C.y;return{x,y:A,width:d.width,height:d.height}}function Ur(t){return jt(t).position==="static"}function qa(t,e){if(!ne(t)||jt(t).position==="fixed")return null;if(e)return e(t);let o=t.offsetParent;return Qt(t)===o&&(o=o.ownerDocument.body),o}function Wa(t,e){let o=Ft(t);if(wo(t))return o;if(!ne(t)){let s=fe(t);for(;s&&!De(s);){if(Wt(s)&&!Ur(s))return s;s=fe(s)}return o}let a=qa(t,e);for(;a&&Ma(a)&&Ur(a);)a=qa(a,e);return a&&De(a)&&Ur(a)&&!Ze(a)?o:a||Ba(t)||o}var ul=async function(t){let e=this.getOffsetParent||Wa,o=this.getDimensions,a=await o(t.floating);return{reference:dl(t.reference,await e(t.floating),t.strategy),floating:{x:0,y:0,width:a.width,height:a.height}}};function pl(t){return jt(t).direction==="rtl"}var yo={convertOffsetParentRelativeRectToViewportRelativeRect:ol,getDocumentElement:Qt,getClippingRect:ll,getOffsetParent:Wa,getElementRects:ul,getClientRects:rl,getDimensions:cl,getScale:to,isElement:Wt,isRTL:pl};function ja(t,e){return t.x===e.x&&t.y===e.y&&t.width===e.width&&t.height===e.height}function hl(t,e){let o=null,a,s=Qt(t);function c(){var m;clearTimeout(a),(m=o)==null||m.disconnect(),o=null}function d(m,g){m===void 0&&(m=!1),g===void 0&&(g=1),c();let y=t.getBoundingClientRect(),{left:C,top:x,width:A,height:L}=y;if(m||e(),!A||!L)return;let E=vo(x),I=vo(s.clientWidth-(C+A)),R=vo(s.clientHeight-(x+L)),B=vo(C),K={rootMargin:-E+"px "+-I+"px "+-R+"px "+-B+"px",threshold:It(0,ie(1,g))||1},et=!0;function ht(ft){let bt=ft[0].intersectionRatio;if(bt!==g){if(!et)return d();bt?d(!1,bt):a=setTimeout(()=>{d(!1,1e-7)},1e3)}bt===1&&!ja(y,t.getBoundingClientRect())&&d(),et=!1}try{o=new IntersectionObserver(ht,{...K,root:s.ownerDocument})}catch{o=new IntersectionObserver(ht,K)}o.observe(t)}return d(!0),c}function Ka(t,e,o,a){a===void 0&&(a={});let{ancestorScroll:s=!0,ancestorResize:c=!0,elementResize:d=typeof ResizeObserver=="function",layoutShift:m=typeof IntersectionObserver=="function",animationFrame:g=!1}=a,y=Wr(t),C=s||c?[...y?me(y):[],...e?me(e):[]]:[];C.forEach(B=>{s&&B.addEventListener("scroll",o,{passive:!0}),c&&B.addEventListener("resize",o)});let x=y&&m?hl(y,o):null,A=-1,L=null;d&&(L=new ResizeObserver(B=>{let[W]=B;W&&W.target===y&&L&&e&&(L.unobserve(e),cancelAnimationFrame(A),A=requestAnimationFrame(()=>{var K;(K=L)==null||K.observe(e)})),o()}),y&&!g&&L.observe(y),e&&L.observe(e));let E,I=g?Pe(t):null;g&&R();function R(){let B=Pe(t);I&&!ja(I,B)&&o(),I=B,E=requestAnimationFrame(R)}return o(),()=>{var B;C.forEach(W=>{s&&W.removeEventListener("scroll",o),c&&W.removeEventListener("resize",o)}),x?.(),(B=L)==null||B.disconnect(),L=null,g&&cancelAnimationFrame(E)}}var Ya=$a;var Ga=za,Xa=Oa,jr=Ia;var Ja=Ea;var Qa=(t,e,o)=>{let a=new Map,s={platform:yo,...o},c={...s.platform,_c:a};return Aa(t,e,{...s,platform:c})};function Za(t){return fl(t)}function Kr(t){return t.assignedSlot?t.assignedSlot:t.parentNode instanceof ShadowRoot?t.parentNode.host:t.parentNode}function fl(t){for(let e=t;e;e=Kr(e))if(e instanceof Element&&getComputedStyle(e).display==="none")return null;for(let e=Kr(t);e;e=Kr(e)){if(!(e instanceof Element))continue;let o=getComputedStyle(e);if(o.display!=="contents"&&(o.position!=="static"||Ze(o)||e.tagName==="BODY"))return e}return null}function tn(t){return t!==null&&typeof t=="object"&&"getBoundingClientRect"in t&&("contextElement"in t?t instanceof Element:!0)}var nr=globalThis?.HTMLElement?.prototype.hasOwnProperty("popover"),Q=class extends ct{constructor(){super(...arguments),this.localize=new St(this),this.active=!1,this.placement="top",this.boundary="viewport",this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=!1,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl&&this.popup){let t=this.anchorEl.getBoundingClientRect(),e=this.popup.getBoundingClientRect(),o=this.placement.includes("top")||this.placement.includes("bottom"),a=0,s=0,c=0,d=0,m=0,g=0,y=0,C=0;o?t.top<e.top?(a=t.left,s=t.bottom,c=t.right,d=t.bottom,m=e.left,g=e.top,y=e.right,C=e.top):(a=e.left,s=e.bottom,c=e.right,d=e.bottom,m=t.left,g=t.top,y=t.right,C=t.top):t.left<e.left?(a=t.right,s=t.top,c=e.left,d=e.top,m=t.right,g=t.bottom,y=e.left,C=e.bottom):(a=e.right,s=e.top,c=t.left,d=t.top,m=e.right,g=e.bottom,y=t.left,C=t.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${a}px`),this.style.setProperty("--hover-bridge-top-left-y",`${s}px`),this.style.setProperty("--hover-bridge-top-right-x",`${c}px`),this.style.setProperty("--hover-bridge-top-right-y",`${d}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${m}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${g}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${y}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${C}px`)}}}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}async updated(t){super.updated(t),t.has("active")&&(this.active?this.start():this.stop()),t.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){if(await this.stop(),this.anchor&&typeof this.anchor=="string"){let t=this.getRootNode();this.anchorEl=t.getElementById(this.anchor)}else this.anchor instanceof Element||tn(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),this.anchorEl&&this.start()}start(){!this.anchorEl||!this.active||!this.isConnected||(this.popup?.showPopover?.(),this.cleanup=Ka(this.anchorEl,this.popup,()=>{this.reposition()}))}async stop(){return new Promise(t=>{this.popup?.hidePopover?.(),this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>t())):t()})}reposition(){if(!this.active||!this.anchorEl||!this.popup)return;let t=[Ya({mainAxis:this.distance,crossAxis:this.skidding})];this.sync?t.push(jr({apply:({rects:a})=>{let s=this.sync==="width"||this.sync==="both",c=this.sync==="height"||this.sync==="both";this.popup.style.width=s?`${a.reference.width}px`:"",this.popup.style.height=c?`${a.reference.height}px`:""}})):(this.popup.style.width="",this.popup.style.height="");let e;nr&&!tn(this.anchor)&&this.boundary==="scroll"&&(e=me(this.anchorEl).filter(a=>a instanceof Element)),this.flip&&t.push(Xa({boundary:this.flipBoundary||e,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:this.flipFallbackStrategy==="best-fit"?"bestFit":"initialPlacement",padding:this.flipPadding})),this.shift&&t.push(Ga({boundary:this.shiftBoundary||e,padding:this.shiftPadding})),this.autoSize?t.push(jr({boundary:this.autoSizeBoundary||e,padding:this.autoSizePadding,apply:({availableWidth:a,availableHeight:s})=>{this.autoSize==="vertical"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-height",`${s}px`):this.style.removeProperty("--auto-size-available-height"),this.autoSize==="horizontal"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-width",`${a}px`):this.style.removeProperty("--auto-size-available-width")}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&t.push(Ja({element:this.arrowEl,padding:this.arrowPadding}));let o=nr?a=>yo.getOffsetParent(a,Za):yo.getOffsetParent;Qa(this.anchorEl,this.popup,{placement:this.placement,middleware:t,strategy:nr?"absolute":"fixed",platform:{...yo,getOffsetParent:o}}).then(({x:a,y:s,middlewareData:c,placement:d})=>{let m=this.localize.dir()==="rtl",g={top:"bottom",right:"left",bottom:"top",left:"right"}[d.split("-")[0]];if(this.setAttribute("data-current-placement",d),Object.assign(this.popup.style,{left:`${a}px`,top:`${s}px`}),this.arrow){let y=c.arrow.x,C=c.arrow.y,x="",A="",L="",E="";if(this.arrowPlacement==="start"){let I=typeof y=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";x=typeof C=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",A=m?I:"",E=m?"":I}else if(this.arrowPlacement==="end"){let I=typeof y=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";A=m?"":I,E=m?I:"",L=typeof C=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:""}else this.arrowPlacement==="center"?(E=typeof y=="number"?"calc(50% - var(--arrow-size-diagonal))":"",x=typeof C=="number"?"calc(50% - var(--arrow-size-diagonal))":""):(E=typeof y=="number"?`${y}px`:"",x=typeof C=="number"?`${C}px`:"");Object.assign(this.arrowEl.style,{top:x,right:A,bottom:L,left:E,[g]:"calc(var(--arrow-base-offset) - var(--arrow-size-diagonal))"})}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.dispatchEvent(new wa)}render(){return z`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${wt({"popup-hover-bridge":!0,"popup-hover-bridge-visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        popover="manual"
        part="popup"
        class=${wt({popup:!0,"popup-active":this.active,"popup-fixed":!nr,"popup-has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?z`<div part="arrow" class="arrow" role="presentation"></div>`:""}
      </div>
    `}};Q.css=ba;h([st(".popup")],Q.prototype,"popup",2);h([st(".arrow")],Q.prototype,"arrowEl",2);h([v()],Q.prototype,"anchor",2);h([v({type:Boolean,reflect:!0})],Q.prototype,"active",2);h([v({reflect:!0})],Q.prototype,"placement",2);h([v()],Q.prototype,"boundary",2);h([v({type:Number})],Q.prototype,"distance",2);h([v({type:Number})],Q.prototype,"skidding",2);h([v({type:Boolean})],Q.prototype,"arrow",2);h([v({attribute:"arrow-placement"})],Q.prototype,"arrowPlacement",2);h([v({attribute:"arrow-padding",type:Number})],Q.prototype,"arrowPadding",2);h([v({type:Boolean})],Q.prototype,"flip",2);h([v({attribute:"flip-fallback-placements",converter:{fromAttribute:t=>t.split(" ").map(e=>e.trim()).filter(e=>e!==""),toAttribute:t=>t.join(" ")}})],Q.prototype,"flipFallbackPlacements",2);h([v({attribute:"flip-fallback-strategy"})],Q.prototype,"flipFallbackStrategy",2);h([v({type:Object})],Q.prototype,"flipBoundary",2);h([v({attribute:"flip-padding",type:Number})],Q.prototype,"flipPadding",2);h([v({type:Boolean})],Q.prototype,"shift",2);h([v({type:Object})],Q.prototype,"shiftBoundary",2);h([v({attribute:"shift-padding",type:Number})],Q.prototype,"shiftPadding",2);h([v({attribute:"auto-size"})],Q.prototype,"autoSize",2);h([v()],Q.prototype,"sync",2);h([v({type:Object})],Q.prototype,"autoSizeBoundary",2);h([v({attribute:"auto-size-padding",type:Number})],Q.prototype,"autoSizePadding",2);h([v({attribute:"hover-bridge",type:Boolean})],Q.prototype,"hoverBridge",2);Q=h([rt("wa-popup")],Q);var en=H`
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
`;function on(t){return t.split(" ").map(e=>e.trim()).filter(e=>e!=="")}var Zt=class extends ct{constructor(){super(...arguments),this.localize=new St(this),this.hasSlotController=new oe(this,"footer","header-actions","label"),this.open=!1,this.label="",this.withoutHeader=!1,this.lightDismiss=!1,this.withFooter=!1,this.handleDocumentKeyDown=t=>{t.key==="Escape"&&this.open&&ze(this)&&(t.preventDefault(),t.stopPropagation(),this.requestClose(this.dialog))}}firstUpdated(){this.open&&(this.addOpenListeners(),this.dialog.showModal(),Rr(this))}disconnectedCallback(){super.disconnectedCallback(),qr(this),this.removeOpenListeners()}async requestClose(t){let e=new Ke({source:t});if(this.dispatchEvent(e),e.defaultPrevented){this.open=!0,Gt(this.dialog,"pulse");return}this.removeOpenListeners(),await Gt(this.dialog,"hide"),this.open=!1,this.dialog.close(),qr(this);let o=this.originalTrigger;typeof o?.focus=="function"&&setTimeout(()=>o.focus()),this.dispatchEvent(new Ye)}addOpenListeners(){document.addEventListener("keydown",this.handleDocumentKeyDown),We(this)}removeOpenListeners(){document.removeEventListener("keydown",this.handleDocumentKeyDown),$e(this)}handleDialogCancel(t){t.preventDefault(),!this.dialog.classList.contains("hide")&&t.target===this.dialog&&ze(this)&&this.requestClose(this.dialog)}handleDialogClick(t){let o=t.target.closest('[data-dialog="close"]');o&&(t.stopPropagation(),this.requestClose(o))}async handleDialogPointerDown(t){t.target===this.dialog&&(this.lightDismiss?this.requestClose(this.dialog):await Gt(this.dialog,"pulse"))}handleOpenChange(){this.open&&!this.dialog.open?this.show():!this.open&&this.dialog.open&&(this.open=!0,this.requestClose(this.dialog))}async show(){let t=new je;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1;return}this.addOpenListeners(),this.originalTrigger=document.activeElement,this.open=!0,this.dialog.showModal(),Rr(this),requestAnimationFrame(()=>{let e=this.querySelector("[autofocus]");e&&typeof e.focus=="function"?e.focus():this.dialog.focus()}),await Gt(this.dialog,"show"),this.dispatchEvent(new Ge)}render(){let t=!this.withoutHeader,e=this.hasUpdated?this.hasSlotController.test("footer"):this.withFooter;return z`
      <dialog
        part="dialog"
        class=${wt({dialog:!0,open:this.open})}
        @cancel=${this.handleDialogCancel}
        @click=${this.handleDialogClick}
        @pointerdown=${this.handleDialogPointerDown}
      >
        ${t?z`
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

        ${e?z`
              <footer part="footer" class="footer">
                <slot name="footer"></slot>
              </footer>
            `:""}
      </dialog>
    `}};Zt.css=en;h([st(".dialog")],Zt.prototype,"dialog",2);h([v({type:Boolean,reflect:!0})],Zt.prototype,"open",2);h([v({reflect:!0})],Zt.prototype,"label",2);h([v({attribute:"without-header",type:Boolean,reflect:!0})],Zt.prototype,"withoutHeader",2);h([v({attribute:"light-dismiss",type:Boolean})],Zt.prototype,"lightDismiss",2);h([v({attribute:"with-footer",type:Boolean})],Zt.prototype,"withFooter",2);h([U("open",{waitUntilFirstUpdate:!0})],Zt.prototype,"handleOpenChange",1);Zt=h([rt("wa-dialog")],Zt);document.addEventListener("click",t=>{let e=t.target.closest("[data-dialog]");if(e instanceof Element){let[o,a]=on(e.getAttribute("data-dialog")||"");if(o==="open"&&a?.length){let c=e.getRootNode().getElementById(a);c?.localName==="wa-dialog"?c.open=!0:console.warn(`A dialog with an ID of "${a}" could not be found in this document.`)}}}),document.addEventListener("pointerdown",()=>{});var rn=H`
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
`;var eo=class extends ct{constructor(){super(...arguments),this.orientation="horizontal"}connectedCallback(){super.connectedCallback(),this.setAttribute("role","separator")}handleVerticalChange(){this.setAttribute("aria-orientation",this.orientation)}};eo.css=rn;h([v({reflect:!0})],eo.prototype,"orientation",2);h([U("orientation")],eo.prototype,"handleVerticalChange",1);eo=h([rt("wa-divider")],eo);var an=H`
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
`;var be=class extends ct{constructor(){super(...arguments),this.variant="brand",this.size="m"}handleSizeChange(){Ht(this.localName,this.size)}render(){return z`
      <div part="icon">
        <slot name="icon"></slot>
      </div>

      <div part="message">
        <slot></slot>
      </div>
    `}};be.css=[an,Ve,Ut];h([v({reflect:!0})],be.prototype,"variant",2);h([v({reflect:!0})],be.prototype,"appearance",2);h([v({reflect:!0})],be.prototype,"size",2);h([U("size")],be.prototype,"handleSizeChange",1);be=h([rt("wa-callout")],be);function nn(t,e){let o=t.metaKey||t.ctrlKey||t.shiftKey||t.altKey;t.key==="Enter"&&!o&&setTimeout(()=>{!t.defaultPrevented&&!t.isComposing&&ml(e)})}function ml(t){let e=null;if("form"in t&&(e=t.form),!e&&"getForm"in t&&(e=t.getForm()),!e)return;let o=[...e.elements];if(o.length===1){e.requestSubmit(null);return}let a=o.find(s=>s.type==="submit"&&!s.matches(":disabled"));a&&(["input","button"].includes(a.localName)?e.requestSubmit(a):a.click())}var sn=H`
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
`;var xo=ve(class extends re{constructor(t){if(super(t),t.type!==Pt.PROPERTY&&t.type!==Pt.ATTRIBUTE&&t.type!==Pt.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!da(t))throw Error("`live` bindings can only contain a single expression")}render(t){return t}update(t,[e]){if(e===xt||e===J)return e;let o=t.element,a=t.name;if(t.type===Pt.PROPERTY){if(e===o[a])return xt}else if(t.type===Pt.BOOLEAN_ATTRIBUTE){if(!!e===o.hasAttribute(a))return xt}else if(t.type===Pt.ATTRIBUTE&&o.getAttribute(a)===e+"")return xt;return Ko(t),e}});var q=class extends Ct{constructor(){super(...arguments),this.assumeInteractionOn=["blur","input"],this.hasSlotController=new oe(this,"hint","label"),this.localize=new St(this),this.title="",this.type="text",this._value=null,this.defaultValue=this.getAttribute("value")||null,this.size="m",this.appearance="outlined",this.pill=!1,this.label="",this.hint="",this.withClear=!1,this.placeholder="",this.readonly=!1,this.passwordToggle=!1,this.passwordVisible=!1,this.withoutSpinButtons=!1,this.required=!1,this.spellcheck=!0,this.withLabel=!1,this.withHint=!1}static get validators(){return[...super.validators,zo()]}get value(){return this.valueHasChanged?this._value:this._value??this.defaultValue}set value(t){this._value!==t&&(this.valueHasChanged=!0,this._value=t)}handleSizeChange(){Ht(this.localName,this.size)}handleChange(t){this.value=this.input.value,this.relayNativeEvent(t,{bubbles:!0,composed:!0})}handleClearClick(t){t.preventDefault(),this.value!==""&&(this.value="",this.updateComplete.then(()=>{this.dispatchEvent(new Xo),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})),this.input.focus()}handleInput(){this.value=this.input.value}handleKeyDown(t){nn(t,this)}handlePasswordToggle(){this.passwordVisible=!this.passwordVisible}updated(t){if(super.updated(t),t.has("value")||t.has("defaultValue")||t.has("type")){let e=["number","date","time","datetime-local"];this.input&&e.includes(this.type)&&this.value&&this.input.value!==this.value&&(this._value=this.input.value),this.customStates.set("blank",!this.value),this.updateValidity()}}handleStepChange(){this.input.step=String(this.step),this.updateValidity()}focus(t){this.input.focus(t)}blur(){this.input.blur()}select(){this.input.select()}setSelectionRange(t,e,o="none"){this.input.setSelectionRange(t,e,o)}setRangeText(t,e,o,a="preserve"){let s=e??this.input.selectionStart,c=o??this.input.selectionEnd;this.input.setRangeText(t,s,c,a),this.value!==this.input.value&&(this.value=this.input.value)}showPicker(){"showPicker"in HTMLInputElement.prototype&&this.input.showPicker()}stepUp(){this.input.stepUp(),this.value!==this.input.value&&(this.value=this.input.value)}stepDown(){this.input.stepDown(),this.value!==this.input.value&&(this.value=this.input.value)}formResetCallback(){this.value=null,this.input&&(this.input.value=this.value),super.formResetCallback()}render(){let t=this.hasUpdated?this.hasSlotController.test("label"):this.withLabel,e=this.hasUpdated?this.hasSlotController.test("hint"):this.withHint,o=this.label?!0:!!t,a=this.hint?!0:!!e,s=this.withClear&&!this.disabled&&!this.readonly,c=this.hasUpdated&&s&&(typeof this.value=="number"||this.value&&this.value.length>0);return z`
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
          name=${tt(this.name)}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          placeholder=${tt(this.placeholder)}
          minlength=${tt(this.minlength)}
          maxlength=${tt(this.maxlength)}
          min=${tt(this.min)}
          max=${tt(this.max)}
          step=${tt(this.step)}
          .value=${xo(this.value??"")}
          autocapitalize=${tt(this.autocapitalize)}
          autocomplete=${tt(this.autocomplete)}
          autocorrect=${this.autocorrect?"on":"off"}
          ?autofocus=${this.autofocus}
          spellcheck=${this.spellcheck}
          pattern=${tt(this.pattern)}
          enterkeyhint=${tt(this.enterkeyhint)}
          inputmode=${tt(this.inputmode)}
          aria-describedby="hint"
          @change=${this.handleChange}
          @input=${this.handleInput}
          @keydown=${this.handleKeyDown}
        />

        ${c?z`
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
        ${this.passwordToggle&&!this.disabled?z`
              <button
                part="password-toggle-button"
                class="password-toggle"
                type="button"
                aria-label=${this.localize.term(this.passwordVisible?"hidePassword":"showPassword")}
                @click=${this.handlePasswordToggle}
                tabindex="-1"
              >
                ${this.passwordVisible?z`
                      <slot name="hide-password-icon">
                        <wa-icon name="eye-slash" library="system" variant="regular"></wa-icon>
                      </slot>
                    `:z`
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
        class=${wt({"has-slotted":a})}
        aria-hidden=${a?"false":"true"}
        >${this.hint}</slot
      >
    `}};q.css=[Ut,Je,sn];q.shadowRootOptions={...Ct.shadowRootOptions,delegatesFocus:!0};h([st("input")],q.prototype,"input",2);h([v()],q.prototype,"title",2);h([v({reflect:!0})],q.prototype,"type",2);h([zt()],q.prototype,"value",1);h([v({attribute:"value",reflect:!0})],q.prototype,"defaultValue",2);h([v({reflect:!0})],q.prototype,"size",2);h([U("size")],q.prototype,"handleSizeChange",1);h([v({reflect:!0})],q.prototype,"appearance",2);h([v({type:Boolean,reflect:!0})],q.prototype,"pill",2);h([v()],q.prototype,"label",2);h([v({attribute:"hint"})],q.prototype,"hint",2);h([v({attribute:"with-clear",type:Boolean})],q.prototype,"withClear",2);h([v()],q.prototype,"placeholder",2);h([v({type:Boolean,reflect:!0})],q.prototype,"readonly",2);h([v({attribute:"password-toggle",type:Boolean})],q.prototype,"passwordToggle",2);h([v({attribute:"password-visible",type:Boolean})],q.prototype,"passwordVisible",2);h([v({attribute:"without-spin-buttons",type:Boolean,reflect:!0})],q.prototype,"withoutSpinButtons",2);h([v({type:Boolean,reflect:!0})],q.prototype,"required",2);h([v()],q.prototype,"pattern",2);h([v({type:Number})],q.prototype,"minlength",2);h([v({type:Number})],q.prototype,"maxlength",2);h([v()],q.prototype,"min",2);h([v()],q.prototype,"max",2);h([v()],q.prototype,"step",2);h([v()],q.prototype,"autocapitalize",2);h([v({type:Boolean,converter:{fromAttribute:t=>!(!t||t==="off"),toAttribute:t=>t?"on":"off"}})],q.prototype,"autocorrect",2);h([v()],q.prototype,"autocomplete",2);h([v({type:Boolean})],q.prototype,"autofocus",2);h([v()],q.prototype,"enterkeyhint",2);h([v({type:Boolean,converter:{fromAttribute:t=>!(!t||t==="false"),toAttribute:t=>t?"true":"false"}})],q.prototype,"spellcheck",2);h([v()],q.prototype,"inputmode",2);h([v({attribute:"with-label",type:Boolean})],q.prototype,"withLabel",2);h([v({attribute:"with-hint",type:Boolean})],q.prototype,"withHint",2);h([U("step",{waitUntilFirstUpdate:!0})],q.prototype,"handleStepChange",1);q=h([rt("wa-input")],q);q.disableWarning?.("change-in-update");var ln=H`
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
`;var mt=class extends Ct{constructor(){super(...arguments),this.hasSlotController=new oe(this,"hint"),this.title="",this.name=null,this._value=this.getAttribute("value")??null,this.size="m",this.disabled=!1,this.indeterminate=!1,this._checked=null,this.defaultChecked=this.hasAttribute("checked"),this.required=!1,this.hint=""}static get validators(){let t=[Jo({validationProperty:"checked",validationElement:Object.assign(document.createElement("input"),{type:"checkbox",required:!0})})];return[...super.validators,...t]}get value(){return this._value??"on"}set value(t){this._value=t}handleSizeChange(){Ht(this.localName,this.size)}get checked(){return this.valueHasChanged?!!this._checked:this._checked??this.defaultChecked}set checked(t){this._checked=!!t,this.valueHasChanged=!0}handleClick(){this.hasInteracted=!0,this.checked=!this.checked,this.indeterminate=!1,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}connectedCallback(){super.connectedCallback(),this.handleDefaultCheckedChange()}handleDefaultCheckedChange(){this.handleValueOrCheckedChange()}handleValueOrCheckedChange(){this.setValue(this.checked?this.value:null,this._value),this.updateValidity()}handleStateChange(){this.hasUpdated&&(this.input.checked=this.checked,this.input.indeterminate=this.indeterminate),this.customStates.set("checked",this.checked),this.customStates.set("indeterminate",this.indeterminate),this.updateValidity()}handleDisabledChange(){this.customStates.set("disabled",this.disabled)}willUpdate(t){super.willUpdate(t),(t.has("value")||t.has("checked")||t.has("defaultChecked"))&&this.handleValueOrCheckedChange()}formResetCallback(){this._checked=null,super.formResetCallback(),this.handleValueOrCheckedChange()}click(){this.input.click()}focus(t){this.input.focus(t)}blur(){this.input.blur()}render(){let t=this.hasSlotController.test("hint"),e=this.hint?!0:!!t,o=!this.checked&&this.indeterminate,a=o?"indeterminate":"check",s=o?"indeterminate":"check";return z`
      <label part="base">
        <span part="control">
          <input
            class="input"
            type="checkbox"
            title=${this.title}
            name=${tt(this.name)}
            value=${tt(this._value)}
            .indeterminate=${xo(this.indeterminate)}
            .checked=${xo(this.checked)}
            .disabled=${this.disabled}
            .required=${this.required}
            aria-checked=${this.indeterminate?"mixed":this.checked?"true":"false"}
            aria-describedby="hint"
            @click=${this.handleClick}
          />

          <wa-icon part="${s}-icon icon" library="system" name=${a}></wa-icon>
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
    `}};mt.css=[Je,Ut,ln];mt.shadowRootOptions={...Ct.shadowRootOptions,delegatesFocus:!0};h([st('input[type="checkbox"]')],mt.prototype,"input",2);h([v()],mt.prototype,"title",2);h([v({reflect:!0})],mt.prototype,"name",2);h([v({reflect:!0})],mt.prototype,"value",1);h([v({reflect:!0})],mt.prototype,"size",2);h([U("size")],mt.prototype,"handleSizeChange",1);h([v({type:Boolean})],mt.prototype,"disabled",2);h([v({type:Boolean,reflect:!0})],mt.prototype,"indeterminate",2);h([v({type:Boolean,attribute:!1})],mt.prototype,"checked",1);h([v({type:Boolean,reflect:!0,attribute:"checked"})],mt.prototype,"defaultChecked",2);h([v({type:Boolean,reflect:!0})],mt.prototype,"required",2);h([v()],mt.prototype,"hint",2);h([U(["checked","defaultChecked"])],mt.prototype,"handleDefaultCheckedChange",1);h([U(["checked","indeterminate"])],mt.prototype,"handleStateChange",1);h([U("disabled")],mt.prototype,"handleDisabledChange",1);mt=h([rt("wa-checkbox")],mt);mt.disableWarning?.("change-in-update");var cn=H`
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
`;var dn="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";var un=(t=21)=>{let e="",o=crypto.getRandomValues(new Uint8Array(t|=0));for(;t--;)e+=dn[o[t]&63];return e};function pn(t=""){return`${t}${un()}`}var dt=class extends ct{constructor(){super(...arguments),this.placement="top",this.disabled=!1,this.distance=8,this.open=!1,this.skidding=0,this.showDelay=150,this.hideDelay=0,this.trigger="hover focus",this.withoutArrow=!1,this.for=null,this.anchor=null,this.eventController=new AbortController,this.handleBlur=()=>{this.hasTrigger("focus")&&this.hide()},this.handleClick=()=>{this.hasTrigger("click")&&(this.open?this.hide():this.show())},this.handleFocus=()=>{this.hasTrigger("focus")&&this.show()},this.handleDocumentKeyDown=t=>{t.key==="Escape"&&this.open&&ze(this)&&(t.preventDefault(),t.stopPropagation(),this.hide())},this.handleMouseOver=()=>{this.hasTrigger("hover")&&(clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.show(),this.showDelay))},this.handleMouseOut=()=>{if(this.hasTrigger("hover")){let t=!!this.anchor?.matches(":hover"),e=this.matches(":hover");if(t||e)return;clearTimeout(this.hoverTimeout),t||e||(this.hoverTimeout=window.setTimeout(()=>{this.hide()},this.hideDelay))}}}connectedCallback(){super.connectedCallback(),this.eventController.signal.aborted&&(this.eventController=new AbortController),this.addEventListener("mouseout",this.handleMouseOut),this.open&&(this.open=!1,this.updateComplete.then(()=>{this.open=!0})),this.id||(this.id=pn("wa-tooltip-")),this.for&&this.anchor?(this.anchor=null,this.handleForChange()):this.for&&this.handleForChange()}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",this.handleDocumentKeyDown),$e(this),this.eventController.abort(),this.anchor&&this.removeFromAriaLabelledBy(this.anchor,this.id)}firstUpdated(){this.body.hidden=!this.open,this.open&&(this.popup.active=!0,this.popup.reposition())}hasTrigger(t){return this.trigger.split(" ").includes(t)}addToAriaLabelledBy(t,e){let a=(t.getAttribute("aria-labelledby")||"").split(/\s+/).filter(Boolean);a.includes(e)||(a.push(e),t.setAttribute("aria-labelledby",a.join(" ")))}removeFromAriaLabelledBy(t,e){let s=(t.getAttribute("aria-labelledby")||"").split(/\s+/).filter(Boolean).filter(c=>c!==e);s.length>0?t.setAttribute("aria-labelledby",s.join(" ")):t.removeAttribute("aria-labelledby")}async handleOpenChange(){if(this.open){if(this.disabled)return;let t=new je;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1;return}document.addEventListener("keydown",this.handleDocumentKeyDown,{signal:this.eventController.signal}),We(this),this.body.hidden=!1,this.popup.active=!0,await Gt(this.popup.popup,"show-with-scale"),this.popup.reposition(),this.dispatchEvent(new Ge)}else{let t=new Ke;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1;return}document.removeEventListener("keydown",this.handleDocumentKeyDown),$e(this),await Gt(this.popup.popup,"hide-with-scale"),this.popup.active=!1,this.body.hidden=!0,this.dispatchEvent(new Ye)}}handleForChange(){let t=this.getRootNode();if(!t)return;let e=this.for?t.getElementById(this.for):null,o=this.anchor;if(e===o)return;let{signal:a}=this.eventController;e&&(this.addToAriaLabelledBy(e,this.id),e.addEventListener("blur",this.handleBlur,{capture:!0,signal:a}),e.addEventListener("focus",this.handleFocus,{capture:!0,signal:a}),e.addEventListener("click",this.handleClick,{signal:a}),e.addEventListener("mouseover",this.handleMouseOver,{signal:a}),e.addEventListener("mouseout",this.handleMouseOut,{signal:a})),o&&(this.removeFromAriaLabelledBy(o,this.id),o.removeEventListener("blur",this.handleBlur,{capture:!0}),o.removeEventListener("focus",this.handleFocus,{capture:!0}),o.removeEventListener("click",this.handleClick),o.removeEventListener("mouseover",this.handleMouseOver),o.removeEventListener("mouseout",this.handleMouseOut)),this.anchor=e}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}handleDisabledChange(){this.disabled&&this.open&&this.hide()}async show(){if(!this.open)return this.open=!0,Xe(this,"wa-after-show")}async hide(){if(this.open)return this.open=!1,Xe(this,"wa-after-hide")}render(){return z`
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
    `}};dt.css=cn;dt.dependencies={"wa-popup":Q};h([st("slot:not([name])")],dt.prototype,"defaultSlot",2);h([st(".body")],dt.prototype,"body",2);h([st("wa-popup")],dt.prototype,"popup",2);h([v()],dt.prototype,"placement",2);h([v({type:Boolean,reflect:!0})],dt.prototype,"disabled",2);h([v({type:Number})],dt.prototype,"distance",2);h([v({type:Boolean,reflect:!0})],dt.prototype,"open",2);h([v({type:Number})],dt.prototype,"skidding",2);h([v({attribute:"show-delay",type:Number})],dt.prototype,"showDelay",2);h([v({attribute:"hide-delay",type:Number})],dt.prototype,"hideDelay",2);h([v()],dt.prototype,"trigger",2);h([v({attribute:"without-arrow",type:Boolean,reflect:!0})],dt.prototype,"withoutArrow",2);h([v()],dt.prototype,"for",2);h([zt()],dt.prototype,"anchor",2);h([U("open",{waitUntilFirstUpdate:!0})],dt.prototype,"handleOpenChange",1);h([U("for")],dt.prototype,"handleForChange",1);h([U(["distance","placement","skidding"])],dt.prototype,"handleOptionsChange",1);h([U("disabled")],dt.prototype,"handleDisabledChange",1);dt=h([rt("wa-tooltip")],dt);var kn=us(hn());var fn=(t,e,o)=>{let a=new Map;for(let s=e;s<=o;s++)a.set(t[s],s);return a},sr=ve(class extends re{constructor(t){if(super(t),t.type!==Pt.CHILD)throw Error("repeat() can only be used in text expressions")}dt(t,e,o){let a;o===void 0?o=e:e!==void 0&&(a=e);let s=[],c=[],d=0;for(let m of t)s[d]=a?a(m,d):d,c[d]=o(m,d),d++;return{values:c,keys:s}}render(t,e,o){return this.dt(t,e,o).values}update(t,[e,o,a]){let s=ua(t),{values:c,keys:d}=this.dt(e,o,a);if(!Array.isArray(s))return this.ut=d,c;let m=this.ut??=[],g=[],y,C,x=0,A=s.length-1,L=0,E=c.length-1;for(;x<=A&&L<=E;)if(s[x]===null)x++;else if(s[A]===null)A--;else if(m[x]===d[L])g[L]=we(s[x],c[L]),x++,L++;else if(m[A]===d[E])g[E]=we(s[A],c[E]),A--,E--;else if(m[x]===d[E])g[E]=we(s[x],c[E]),Ue(t,g[E+1],s[x]),x++,E--;else if(m[A]===d[L])g[L]=we(s[A],c[L]),Ue(t,s[x],s[A]),A--,L++;else if(y===void 0&&(y=fn(d,L,E),C=fn(m,x,A)),y.has(m[x]))if(y.has(m[A])){let I=C.get(d[L]),R=I!==void 0?s[I]:null;if(R===null){let B=Ue(t,s[x]);we(B,c[L]),g[L]=B}else g[L]=we(R,c[L]),Ue(t,s[x],R),s[I]=null;L++}else Yo(s[A]),A--;else Yo(s[x]),x++;for(;L<=E;){let I=Ue(t,g[E+1]);we(I,c[L]),g[L++]=I}for(;x<=A;){let I=s[x++];I!==null&&Yo(I)}return this.ut=d,Ko(t,g),xt}});var gl=[{id:"account",label:"Conta",sortable:!0},{id:"pattern",label:"Padr\xE3o",sortable:!0},{id:"replacement",label:"Substitui\xE7\xE3o",sortable:!0},{id:"category",label:"Categoria",sortable:!0},{id:"memo",label:"Memo",sortable:!0},{id:"actions",label:"A\xE7\xF5es",sortable:!1}],Xr=class extends Vt{static properties={rules:{type:Array},accounts:{type:Array},sortCol:{type:String},sortDir:{type:String},page:{type:Number},pageSize:{type:Number}};createRenderRoot(){return this}constructor(){super(),this.rules=[],this.accounts=[],this.sortCol="pattern",this.sortDir="asc",this.page=1,this.pageSize=20}emit(e,o={}){this.dispatchEvent(new CustomEvent(e,{detail:o,bubbles:!0,composed:!0}))}accountName(e){let o=this.accounts.find(a=>a.id===e);return o?o.id===0?"Todas":o.name.charAt(0).toUpperCase()+o.name.slice(1):""}get sorted(){let e=[...this.rules];return e.sort((o,a)=>{let s=String(this._valueFor(o,this.sortCol)).toLowerCase(),c=String(this._valueFor(a,this.sortCol)).toLowerCase();return s<c?this.sortDir==="asc"?-1:1:s>c?this.sortDir==="asc"?1:-1:0}),e}_valueFor(e,o){switch(o){case"account":return this.accountName(e.accountId);case"pattern":return e.pattern||"";case"replacement":return e.replacement||"";case"category":return e._categoryName||"";case"memo":return e.memoTemplate||"";default:return""}}get paginated(){let e=this.sorted,o=(this.page-1)*this.pageSize;return e.slice(o,o+this.pageSize)}get totalPages(){return Math.max(1,Math.ceil(this.rules.length/this.pageSize))}onSort(e){e.sortable&&(this.sortCol===e.id?this.emit("sort-change",{col:e.id,dir:this.sortDir==="asc"?"desc":"asc"}):this.emit("sort-change",{col:e.id,dir:"asc"}))}onPageClick(e){e<1||e>this.totalPages||e===this.page||this.emit("page-change",{page:e})}sortIcon(e){return this.sortCol!==e?"\u2195":this.sortDir==="asc"?"\u2191":"\u2193"}renderPagination(){let e=this.totalPages;if(e<=1)return J;let o=this.page,a=5,s=Math.max(1,o-Math.floor(a/2)),c=Math.min(e,s+a-1);c-s+1<a&&(s=Math.max(1,c-a+1));let d=[];s>1&&(d.push(1),s>2&&d.push("\u2026"));for(let m=s;m<=c;m++)d.push(m);return c<e&&(c<e-1&&d.push("\u2026"),d.push(e)),z`
            <nav class="mr-pagination" aria-label="Paginação">
                <button class="mr-page-btn" ?disabled=${o===1} @click=${()=>this.onPageClick(o-1)}>‹</button>
                ${d.map(m=>m==="\u2026"?z`<span class="mr-page-ellipsis">…</span>`:z`<button class="mr-page-btn ${m===o?"is-active":""}" @click=${()=>this.onPageClick(m)}>${m}</button>`)}
                <button class="mr-page-btn" ?disabled=${o===e} @click=${()=>this.onPageClick(o+1)}>›</button>
            </nav>
        `}render(){if(this.rules.length===0)return z`<div class="mr-empty">Nenhuma regra para mostrar.</div>`;let e=this.paginated;return z`
            <div class="mr-table-wrap">
                <table class="mr-table">
                    <thead>
                        <tr>
                            ${gl.map(o=>z`
                                <th class="mr-th mr-th-${o.id} ${o.sortable?"is-sortable":""} ${this.sortCol===o.id?"is-active":""}"
                                    @click=${()=>this.onSort(o)}>
                                    <span>${o.label}</span>
                                    ${o.sortable?z`<span class="mr-sort">${this.sortIcon(o.id)}</span>`:J}
                                </th>
                            `)}
                        </tr>
                    </thead>
                    <tbody>
                        ${sr(e,o=>o.id,o=>z`
                            <tr class="mr-row ${o.enabled===!1?"is-disabled":""}">
                                <td class="mr-cell mr-cell-account">${this.accountName(o.accountId)||z`<span class="mr-muted">—</span>`}</td>
                                <td class="mr-cell mr-cell-pattern">
                                    <code class="mr-code">${o.pattern}</code>
                                    ${o.isRegex?z`<span class="mr-regex-badge">REGEX</span>`:J}
                                </td>
                                <td class="mr-cell mr-cell-replacement">${o.replacement||z`<span class="mr-muted">—</span>`}</td>
                                <td class="mr-cell mr-cell-category">${o._categoryName||z`<span class="mr-muted">—</span>`}</td>
                                <td class="mr-cell mr-cell-memo">${o.memoTemplate||z`<span class="mr-muted">—</span>`}</td>
                                <td class="mr-cell mr-cell-actions">
                                    <button class="mr-action" title="Editar" @click=${()=>this.emit("rule-edit",{rule:o})}>
                                        <svg viewBox="0 0 16 16" width="13" height="13"><path d="M11.5 1.5l3 3-9 9H2.5v-3l9-9z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
                                    </button>
                                    <button class="mr-action" title=${o.enabled===!1?"Ativar":"Desativar"}
                                            @click=${()=>this.emit("rule-toggle",{id:o.id})}>
                                        ${o.enabled===!1?z`<svg viewBox="0 0 16 16" width="13" height="13"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>`:z`<svg viewBox="0 0 16 16" width="13" height="13"><circle cx="8" cy="8" r="6" fill="currentColor"/></svg>`}
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
        `}};customElements.define("manage-rules-table",Xr);var Jr=class extends Vt{static properties={items:{type:Array},emptyText:{type:String}};createRenderRoot(){return this}constructor(){super(),this.items=[],this.emptyText="Nada cadastrado."}emit(e,o={}){this.dispatchEvent(new CustomEvent(e,{detail:o,bubbles:!0,composed:!0}))}render(){return this.items.length?z`
            <div class="chip-grid">
                ${sr(this.items,e=>e.key,e=>z`
                    <div class="chip ${e.locked?"is-locked":""}" title=${e.tooltip||""}>
                        <span class="chip-label">${e.label}</span>
                        ${e.locked?z`<span class="chip-lock" title="Pré-definido">●</span>`:z`<button class="chip-remove"
                                           title="Remover"
                                           @click=${()=>this.emit("chip-remove",{key:e.key})}>×</button>`}
                    </div>
                `)}
            </div>
        `:z`<div class="chip-empty">${this.emptyText}</div>`}};customElements.define("chip-list",Jr);var oo=typeof browser<"u"?browser.runtime:chrome.runtime,$={rules:[],accounts:[],categories:[],editingRuleId:null,sortCol:"pattern",sortDir:"asc",page:1,pageSize:20,searchTerm:"",activeTab:"rules",ynabConfig:null,ynabBudgets:[],ynabAccounts:[]},w={},se=null,Rt=null,Qr=null;document.addEventListener("DOMContentLoaded",vl);async function vl(){wl(),await StorageManager.init(),bl(),await pr(),await ur(),await Co(),yl(),Il(),mn(),window.addEventListener("hashchange",mn)}function wl(){w.railItems=Array.from(document.querySelectorAll(".rail-item[data-section]")),w.tabs={rules:document.getElementById("tab-rules"),categories:document.getElementById("tab-categories"),accounts:document.getElementById("tab-accounts"),ynab:document.getElementById("tab-ynab")},w.counts={rules:document.querySelector('[data-count="rules"]'),categories:document.querySelector('[data-count="categories"]'),accounts:document.querySelector('[data-count="accounts"]')},w.btnExport=document.getElementById("btn-export"),w.btnImport=document.getElementById("btn-import"),w.importFile=document.getElementById("import-file"),w.rulesTable=document.getElementById("rules-table"),w.rulesSearch=document.getElementById("rules-search"),w.rulesFooter=document.getElementById("rules-footer-info"),w.ruleDialog=document.getElementById("rule-dialog"),w.openRuleDialogBtn=document.getElementById("open-rule-dialog-btn"),w.addRuleForm=document.getElementById("add-rule-form"),w.ruleAccount=document.getElementById("rule-account"),w.ruleCategory=document.getElementById("rule-category"),w.rulePattern=document.getElementById("rule-pattern"),w.ruleReplacement=document.getElementById("rule-replacement"),w.ruleMemo=document.getElementById("rule-memo"),w.ruleRegex=document.getElementById("rule-regex"),w.memoField=document.getElementById("memo-field"),w.ruleFormHint=document.getElementById("rule-form-hint"),w.submitBtn=document.getElementById("submit-btn"),w.cancelBtn=document.getElementById("cancel-btn"),w.categoriesList=document.getElementById("categories-list"),w.addCategoryForm=document.getElementById("add-category-form"),w.categoryName=document.getElementById("category-name"),w.categoriesFooter=document.getElementById("categories-footer-info"),w.accountsList=document.getElementById("accounts-list"),w.addAccountForm=document.getElementById("add-account-form"),w.accountName=document.getElementById("account-name"),w.accountsFooter=document.getElementById("accounts-footer-info"),w.ynabStatusDot=document.getElementById("ynab-status-dot"),w.ynabSetupCard=document.getElementById("ynab-setup-card"),w.ynabConnectCard=document.getElementById("ynab-connect-card"),w.ynabBudgetCard=document.getElementById("ynab-budget-card"),w.ynabMappingCard=document.getElementById("ynab-mapping-card"),w.ynabStatus=document.getElementById("ynab-status"),w.ynabConnectBtn=document.getElementById("ynab-connect-btn"),w.ynabDisconnectBtn=document.getElementById("ynab-disconnect-btn"),w.ynabRedirectInput=document.getElementById("ynab-redirect-uri"),w.ynabCopyRedirect=document.getElementById("ynab-copy-redirect"),w.ynabBudgetSelect=document.getElementById("ynab-budget-select"),w.ynabMappingRows=document.getElementById("ynab-mapping-rows"),w.ynabSaveMappingBtn=document.getElementById("ynab-save-mapping-btn"),w.ynabFooter=document.getElementById("ynab-footer-info"),w.toast=document.getElementById("toast"),w.toastMsg=document.getElementById("toast-msg")}function bl(){try{let t=chrome.runtime.getManifest(),e=document.querySelector(".version");e&&t.version&&(e.textContent=`v${t.version}`)}catch{}}function yl(){w.railItems.forEach(t=>{t.addEventListener("click",e=>{e.preventDefault();let o=t.dataset.section;location.hash=`#tab-${o}`})}),w.btnExport.addEventListener("click",async()=>{try{await StorageManager.exportData(),it("Exporta\xE7\xE3o iniciada.","success")}catch(t){it(`Falha ao exportar: ${t.message||t}`,"danger")}}),w.btnImport.addEventListener("click",()=>w.importFile.click()),w.importFile.addEventListener("change",async t=>{let e=t.target.files&&t.target.files[0];if(e){if(!confirm("Importar substituir\xE1 regras, categorias e contas atuais. Deseja continuar?")){t.target.value="";return}try{await StorageManager.importData(e),it("Importa\xE7\xE3o conclu\xEDda.","success"),await pr(),await ur(),await Co(),ti(),ei()}catch(o){it(`Falha ao importar: ${o.message||o}`,"danger")}finally{t.target.value=""}}}),w.openRuleDialogBtn.addEventListener("click",()=>vn()),w.submitBtn.addEventListener("click",gn),w.cancelBtn.addEventListener("click",()=>wn()),w.addRuleForm.addEventListener("submit",t=>{t.preventDefault(),gn()}),w.ruleRegex.addEventListener("change",t=>{w.memoField.hidden=!t.target.checked}),w.rulesSearch.addEventListener("input",t=>{$.searchTerm=t.target.value.toLowerCase(),$.page=1,lr()}),w.rulesTable.addEventListener("sort-change",t=>{$.sortCol=t.detail.col,$.sortDir=t.detail.dir,lr()}),w.rulesTable.addEventListener("page-change",t=>{$.page=t.detail.page,lr()}),w.rulesTable.addEventListener("rule-edit",t=>kl(t.detail.rule)),w.rulesTable.addEventListener("rule-toggle",t=>Sl(t.detail.id)),w.rulesTable.addEventListener("rule-remove",t=>Ll(t.detail.id)),w.addCategoryForm.addEventListener("submit",t=>{t.preventDefault(),Al()}),w.categoriesList.addEventListener("chip-remove",t=>El(t.detail.key)),w.addAccountForm.addEventListener("submit",t=>{t.preventDefault(),$l()}),w.accountsList.addEventListener("chip-remove",t=>zl(parseInt(t.detail.key,10))),Tl()}var xl={"#tab-rules":"rules","#tab-categories":"categories","#tab-accounts":"accounts","#tab-ynab":"ynab"};function mn(){let t=xl[(location.hash||"").toLowerCase()]||"rules";Cl(t)}function Cl(t){$.activeTab=t,Object.entries(w.tabs).forEach(([e,o])=>o.classList.toggle("is-active",e===t)),w.railItems.forEach(e=>e.classList.toggle("is-active",e.dataset.section===t)),t==="ynab"&&Fl()}function dr(){w.counts.rules&&(w.counts.rules.textContent=String($.rules.length)),w.counts.categories&&(w.counts.categories.textContent=String($.categories.length)),w.counts.accounts&&(w.counts.accounts.textContent=String($.accounts.length))}async function Co(){let[t,e,o]=await Promise.all([StorageManager.getPayeeRules(),StorageManager.getAccounts(),StorageManager.getCategories()]);$.accounts=e,$.categories=o;let a=new Map(o.map(s=>[s.id,s.name]));$.rules=t.map(s=>({...s,_categoryName:s.categoryId?a.get(s.categoryId)||"":s.category||""})),dr(),lr()}function _l(){let t=$.searchTerm.trim().toLowerCase();return t?$.rules.filter(e=>{let o=$.accounts.find(c=>c.id===e.accountId);return[o?o.id===0?"Todas":o.name:"",e.pattern,e.replacement,e._categoryName,e.memoTemplate].map(c=>String(c||"").toLowerCase()).join(" ").includes(t)}):$.rules}function lr(){let t=_l();w.rulesTable.rules=t,w.rulesTable.accounts=$.accounts,w.rulesTable.sortCol=$.sortCol,w.rulesTable.sortDir=$.sortDir,w.rulesTable.page=$.page,w.rulesTable.pageSize=$.pageSize,w.rulesTable.requestUpdate();let e=t.length,o=$.rules.length;w.rulesFooter.textContent=e===o?`${e} regra${e===1?"":"s"}`:`${e} de ${o} regras (filtradas)`}function vn(t=null){t?($.editingRuleId=t.id,w.ruleDialog.setAttribute("label","Editar regra"),w.ruleFormHint.textContent=t.pattern?`Editando: ${t.pattern}`:"",w.submitBtn.textContent="Salvar altera\xE7\xF5es",se&&se.setValue(String(t.accountId),!0),w.rulePattern.value=t.pattern||"",w.ruleReplacement.value=t.replacement||"",Rt&&(t._categoryName?(Rt.options[t._categoryName]||Rt.addOption({value:t._categoryName,text:t._categoryName}),Rt.setValue(t._categoryName,!0)):Rt.clear(!0)),w.ruleRegex.checked=!!t.isRegex,w.ruleMemo.value=t.memoTemplate||"",w.memoField.hidden=!t.isRegex):(bn(),w.ruleDialog.setAttribute("label","Nova regra"),w.submitBtn.textContent="Adicionar regra"),w.ruleDialog.open=!0}function wn(){w.ruleDialog.open=!1,bn()}function bn(){$.editingRuleId=null,se&&se.clear(!0),Rt&&Rt.clear(!0),w.rulePattern.value="",w.ruleReplacement.value="",w.ruleMemo.value="",w.ruleRegex.checked=!1,w.memoField.hidden=!0,w.ruleFormHint.textContent=""}async function gn(){let t=se?se.getValue():w.ruleAccount.value,e=t===""?NaN:parseInt(t,10);if(Number.isNaN(e)){it("Conta \xE9 obrigat\xF3ria.","danger");return}let o=w.rulePattern.value.trim();if(!o){it("Padr\xE3o \xE9 obrigat\xF3rio.","danger");return}let a=w.ruleRegex.checked;if(a)try{new RegExp(o)}catch{it("Regex inv\xE1lida.","danger");return}let s=Rt?(Rt.getValue()||"").trim():w.ruleCategory.value.trim(),c=$.categories.find(g=>g.name.toLowerCase()===s.toLowerCase()),d=c?String(c.id):"",m={accountId:e,pattern:o,replacement:w.ruleReplacement.value.trim(),categoryId:d,category:s,isRegex:a,memoTemplate:a?w.ruleMemo.value.trim():""};if($.editingRuleId){let g=await StorageManager.getPayeeRules(),y=g.findIndex(C=>C.id===$.editingRuleId);y!==-1&&(g[y]={...g[y],...m},await StorageManager.setPayeeRules(g)),it("Regra atualizada.","success")}else await StorageManager.addPayeeRule(m),it("Regra criada.","success");wn(),$.page=1,await Co()}function kl(t){vn(t)}async function Ll(t){if(!confirm("Remover esta regra?"))return;await StorageManager.removePayeeRule(t);let e=await StorageManager.getPayeeRules(),o=Math.max(1,Math.ceil(e.length/$.pageSize));$.page>o&&($.page=o),await Co()}async function Sl(t){let o=(await StorageManager.getPayeeRules()).find(a=>a.id===t);o&&(await StorageManager.updatePayeeRule(t,{enabled:o.enabled===!1}),await Co())}async function ur(){$.categories=await StorageManager.getCategories(),yn(),dr(),ei()}function yn(){w.categoriesList.items=$.categories.map(t=>({key:t.name,label:t.name})),w.categoriesList.emptyText="Nenhuma categoria cadastrada.",w.categoriesList.requestUpdate(),w.categoriesFooter.textContent=`${$.categories.length} categoria${$.categories.length===1?"":"s"}`}async function Al(){let t=w.categoryName.value.trim();if(t){if($.categories.some(e=>e.name.toLowerCase()===t.toLowerCase())){it("Categoria j\xE1 existe.","warn");return}await StorageManager.setCategories($.categories.concat([{name:t}])),w.categoryName.value="",await ur(),it(`Categoria "${t}" adicionada.`,"success")}}async function El(t){confirm(`Remover categoria "${t}"?`)&&(await StorageManager.setCategories($.categories.filter(e=>e.name!==t)),await ur())}async function pr(){$.accounts=await StorageManager.getAccounts(),Ol(),dr(),ti()}function Ol(){w.accountsList.items=$.accounts.map(t=>({key:String(t.id),label:t.id===0?"Todas as contas (coringa)":t.name,locked:t.id>=0&&t.id<=3,tooltip:t.id>=0&&t.id<=3?"Conta pr\xE9-definida \u2014 n\xE3o pode ser removida":""})),w.accountsList.emptyText="Nenhuma conta cadastrada.",w.accountsList.requestUpdate(),w.accountsFooter.textContent=`${$.accounts.length} conta${$.accounts.length===1?"":"s"}`}async function $l(){let t=w.accountName.value.trim();if(t){if($.accounts.some(e=>e.name.toLowerCase()===t.toLowerCase())){it("Conta j\xE1 existe.","warn");return}await StorageManager.addAccount({name:t}),w.accountName.value="",await pr(),it(`Conta "${t}" adicionada.`,"success")}}async function zl(t){let e=$.accounts.find(o=>o.id===t);e&&confirm(`Remover conta "${e.name}"?`)&&(await StorageManager.removeAccount(t),await pr())}function Il(){let{TomSelect:t}=window.__manageDeps||{};t&&(ti(),ei())}function ti(){let{TomSelect:t}=window.__manageDeps||{};!t||!w.ruleAccount||(se&&(se.destroy(),se=null),w.ruleAccount.innerHTML='<option value="">Selecione\u2026</option>',$.accounts.forEach(e=>{let o=document.createElement("option");o.value=String(e.id),o.textContent=e.id===0?"Todas as contas":e.name,w.ruleAccount.appendChild(o)}),se=new t(w.ruleAccount,{create:!1,maxItems:1,sortField:{field:"text",direction:"asc"}}))}function ei(){let{TomSelect:t}=window.__manageDeps||{};!t||!w.ruleCategory||(Rt&&(Rt.destroy(),Rt=null),w.ruleCategory.innerHTML='<option value="">Opcional</option>',$.categories.forEach(e=>{let o=document.createElement("option");o.value=e.name,o.textContent=e.name,w.ruleCategory.appendChild(o)}),Rt=new t(w.ruleCategory,{create:!0,createOnBlur:!0,persist:!1,maxItems:1,sortField:{field:"text",direction:"asc"},onItemAdd:async e=>{let o=String(e||"").trim();o&&($.categories.some(a=>a.name.toLowerCase()===o.toLowerCase())||(await StorageManager.setCategories($.categories.concat([{name:o}])),$.categories=await StorageManager.getCategories(),yn(),dr(),it(`Categoria "${o}" adicionada.`,"success")))}}))}function Tl(){w.ynabCopyRedirect.addEventListener("click",async()=>{try{await navigator.clipboard?.writeText(w.ynabRedirectInput.value),it("Redirect URI copiada.","success")}catch{it("Selecione e copie manualmente (Ctrl+C).","warn")}}),w.ynabConnectBtn.addEventListener("click",async()=>{if(!$.ynabConfig?.clientId){it("Configure ynab-config.js antes de conectar.","warn");return}it("Abrindo popup de autentica\xE7\xE3o YNAB\u2026");let t=await oo.sendMessage({type:"YNAB_CONNECT"});if(!t?.ok){it(t?.error||"Falha ao conectar.","danger");return}$.ynabConfig=t.config,it("Conectado.","success"),await Zr(),await Cn()}),w.ynabDisconnectBtn.addEventListener("click",async()=>{let t=await oo.sendMessage({type:"YNAB_DISCONNECT"});if(!t?.ok){it(t?.error||"Falha ao desconectar.","danger");return}$.ynabConfig=t.config,$.ynabBudgets=[],$.ynabAccounts=[],it("Desconectado.","success"),Zr(),w.ynabBudgetCard.hidden=!0,w.ynabMappingCard.hidden=!0}),w.ynabBudgetSelect.addEventListener("change",async t=>{let e=t.target.value;e&&await _n(e)}),w.ynabSaveMappingBtn.addEventListener("click",async()=>{let t=w.ynabBudgetSelect.value,e={};document.querySelectorAll("[data-bank-group]").forEach(a=>{let s=a.dataset.bankGroup,c=[];a.querySelectorAll('input[type="checkbox"]:checked').forEach(d=>{c.push({id:d.value,name:d.dataset.accountName||""})}),c.length>0&&(e[s]=c)});let o=await oo.sendMessage({type:"YNAB_SAVE_MAPPING",budgetId:t,accountMap:e});if(!o?.ok){it(o?.error||"Falha ao salvar mapeamento.","danger");return}$.ynabConfig=o.config,xn(),it("Mapeamento salvo. A sidebar j\xE1 reflete a mudan\xE7a.","success")})}async function Fl(){await Zr(),$.ynabConfig?.connected&&await Cn()}async function Zr(){let t=await oo.sendMessage({type:"YNAB_GET_CONFIG"});if(!t?.ok){w.ynabStatus.textContent="Erro ao ler configura\xE7\xE3o YNAB.";return}$.ynabConfig=t.config;let e=$.ynabConfig;w.ynabRedirectInput.value=e.redirectUri||"(redirect URI indispon\xEDvel \u2014 recarregue a extens\xE3o)";let o=!!e.clientId;if(w.ynabSetupCard.hidden=o,w.ynabConnectCard.hidden=!o,xn(),!!o)if(e.connected){let a=e.tokenExpiresAt?Math.max(0,e.tokenExpiresAt-Date.now()):0,s=Math.floor(a/6e4),c=e.userEmail||"usu\xE1rio YNAB";w.ynabStatus.innerHTML=`<strong>Conectado</strong> como ${c} \xB7 token expira em ~${s} min`,w.ynabConnectBtn.hidden=!0,w.ynabDisconnectBtn.hidden=!1,cr("ynab-connect-card","done")}else w.ynabStatus.textContent='N\xE3o conectado. Clique em "Conectar ao YNAB" para autenticar.',w.ynabConnectBtn.hidden=!1,w.ynabDisconnectBtn.hidden=!0,cr("ynab-connect-card","active")}function xn(){let t=$.ynabConfig,e=!!t?.connected&&!!t?.budgetId&&t?.accountMap&&Object.keys(t.accountMap).length>0;w.ynabStatusDot.classList.remove("is-ready","is-warn");let o=w.railItems.find(a=>a.dataset.section==="ynab");o&&(o.classList.toggle("is-ready",e),o.classList.toggle("is-warn",t?.connected&&!e))}async function Cn(){let t=await oo.sendMessage({type:"YNAB_LIST_BUDGETS"});if(!t?.ok){it(t?.error||"Falha ao listar or\xE7amentos.","danger");return}$.ynabBudgets=t.budgets,w.ynabBudgetSelect.innerHTML='<option value="">Selecione um or\xE7amento</option>',t.budgets.forEach(e=>{let o=document.createElement("option");o.value=e.id,o.textContent=e.name,w.ynabBudgetSelect.appendChild(o)}),w.ynabBudgetCard.hidden=!1,cr("ynab-budget-card",$.ynabConfig?.budgetId?"done":"active"),$.ynabConfig?.budgetId&&(w.ynabBudgetSelect.value=$.ynabConfig.budgetId,await _n($.ynabConfig.budgetId))}async function _n(t){let e=await oo.sendMessage({type:"YNAB_LIST_ACCOUNTS",budgetId:t});if(!e?.ok){it(e?.error||"Falha ao listar contas.","danger");return}$.ynabAccounts=e.accounts;let o=Object.values(BankUtils.ACCOUNTS).filter(s=>s.accountId!=="all");w.ynabMappingRows.innerHTML="";let a=$.ynabConfig?.accountMap||{};o.forEach(s=>{let c=new Set((a[s.accountId]||[]).map(C=>C.id||C)),d=document.createElement("div");d.className="ynab-mapping-group",d.dataset.bankGroup=s.accountId;let m=document.createElement("div");m.className="ynab-mapping-head",m.textContent=s.displayName,d.appendChild(m);let g=document.createElement("div");g.className="ynab-mapping-hint",g.textContent="Marque todas as contas YNAB que recebem transa\xE7\xF5es deste tipo.",d.appendChild(g);let y=document.createElement("div");y.className="ynab-mapping-options",$.ynabAccounts.forEach(C=>{let x=document.createElement("label");x.className="cbx";let A=document.createElement("input");A.type="checkbox",A.value=C.id,A.dataset.accountName=C.name,c.has(C.id)&&(A.checked=!0),x.appendChild(A);let L=document.createElement("span");L.textContent=`${C.name}`;let E=document.createElement("span");E.style.color="var(--muted)",E.style.marginLeft="4px",E.textContent=`(${C.type})`,L.appendChild(E),x.appendChild(L),y.appendChild(x)}),d.appendChild(y),w.ynabMappingRows.appendChild(d)}),w.ynabMappingCard.hidden=!1,cr("ynab-mapping-card",Object.keys(a).length>0?"done":"active")}function cr(t,e){let o=document.getElementById(t);o&&(o.classList.remove("is-active","is-done"),e==="active"?o.classList.add("is-active"):e==="done"&&o.classList.add("is-done"))}function it(t,e="success"){Qr&&clearTimeout(Qr),w.toastMsg.textContent=t,w.toast.classList.remove("is-danger","is-warn"),e==="danger"?w.toast.classList.add("is-danger"):e==="warn"&&w.toast.classList.add("is-warn"),w.toast.hidden=!1,Qr=setTimeout(()=>{w.toast.hidden=!0},3600)}window.__manageDeps={TomSelect:kn.default};
