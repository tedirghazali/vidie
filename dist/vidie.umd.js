!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("vue"),require("alga-js")):"function"==typeof define&&define.amd?define(["exports","vue","alga-js"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).vidie={},e.Vue,e.algaJs)}(this,(function(e,t,a){"use strict";var n=t.defineComponent({name:"Page",props:{sections:{type:String,default:""}},setup:(e,t)=>({pageLayout:()=>{let t;return t=""===e.sections?"page":e.sections+":page",t}})});const o={class:"top:section"},r={class:"left:section"},l={class:"main:section"},s={class:"right:section"},i={class:"bottom:section"};n.render=function(e,a,n,c,u,d){return t.openBlock(),t.createBlock("div",{class:e.pageLayout()},[t.createVNode("div",o,[t.renderSlot(e.$slots,"sectionTop")]),t.createVNode("div",r,[t.renderSlot(e.$slots,"sectionLeft")]),t.createVNode("div",l,[t.renderSlot(e.$slots,"sectionMain")]),t.createVNode("div",s,[t.renderSlot(e.$slots,"sectionRight")]),t.createVNode("div",i,[t.renderSlot(e.$slots,"sectionBottom")]),t.renderSlot(e.$slots,"default")],2)};var c=t.defineComponent({name:"NavBar",props:{container:{type:[String,Boolean],default:"fluid"},menuStart:{type:Boolean,default:!1},menuCenter:{type:Boolean,default:!1},menuEnd:{type:Boolean,default:!1}},setup:(e,t)=>({containerBar:()=>{let t;return t=!0===e.container?"container":!1===e.container?"bar-wrapper":e.container+":container",t}})});const u={class:"nav:bar dark"},d={class:"start:bar-menu mobile"},p={key:0,class:"center:bar-menu"},g={key:1,class:"fill:bar-menu"},v={class:"end:bar-menu tablet"};c.render=function(e,a,n,o,r,l){return t.openBlock(),t.createBlock("nav",u,[t.createVNode("div",{class:[e.containerBar(),"mobile"]},[t.withDirectives(t.createVNode("div",d,[t.renderSlot(e.$slots,"menuStart")],512),[[t.vShow,e.menuStart]]),e.menuCenter?(t.openBlock(),t.createBlock("div",p,[t.renderSlot(e.$slots,"menuCenter")])):(t.openBlock(),t.createBlock("div",g,[t.renderSlot(e.$slots,"default")])),t.withDirectives(t.createVNode("div",v,[t.renderSlot(e.$slots,"menuEnd")],512),[[t.vShow,e.menuEnd]])],2)])};var m=t.defineComponent({name:"SideBar",props:{type:{type:String,default:""},menuStart:{type:Boolean,default:!1},menuCenter:{type:Boolean,default:!1},menuEnd:{type:Boolean,default:!1}},setup:(e,t)=>({sideBar:()=>{let t;return t=""===e.type?"side:bar":"side:bar "+e.type,t}})});const f={class:"start:bar-menu"},y={key:0,class:"center:bar-menu"},k={key:1,class:"fill:bar-menu"},S={class:"end:bar-menu"};m.render=function(e,a,n,o,r,l){return t.openBlock(),t.createBlock("div",{class:[e.sideBar(),"dark"]},[t.withDirectives(t.createVNode("div",f,[t.renderSlot(e.$slots,"menuStart")],512),[[t.vShow,e.menuStart]]),e.menuCenter?(t.openBlock(),t.createBlock("div",y,[t.renderSlot(e.$slots,"menuCenter")])):(t.openBlock(),t.createBlock("div",k,[t.renderSlot(e.$slots,"default")])),t.withDirectives(t.createVNode("div",S,[t.renderSlot(e.$slots,"menuEnd")],512),[[t.vShow,e.menuEnd]])],2)};var B=t.defineComponent({name:"TagsInput",props:{modelValue:{type:String,required:!0},datalist:{type:Array,default:[]},separator:{type:String,default:","},whitelist:{type:Array,default:[]},blacklist:{type:Array,default:[]},placeholder:{type:String,default:""}},emits:["update:modelValue"],setup(e,n){const o=t.ref([]),r=t.ref(""),l=t.ref([]),s=t.ref(null),i=t.ref(!1),c=t.ref("");o.value=e.datalist,l.value=a.$array.complement(e.whitelist,o.value),c.value=e.placeholder;const u=()=>{const e=document.createElement("div");e.classList.add("tag:input-hidden");const t=r.value||s.value.getAttribute("placeholder")||"";e.innerHTML=t.replace(/ /g,"&nbsp;").trim(),document.body.appendChild(e);const a=Math.ceil(Number(window.getComputedStyle(e).width.replace("px","")))+1;s.value.style.setProperty("width",a+"px"),e.remove()},d=e=>{o.value.splice(e,1)},p=e=>e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&"),g=e=>{n.emit("update:modelValue",e)};return{tags:o,tag:r,whiteTags:l,tagInput:s,focusInput:()=>{s.value.focus()},autoWidth:u,createTag:t=>{if(r.value.includes(e.separator)||"Enter"===t.key){const t=r.value.replace(new RegExp(p(e.separator),"g"),"").trim();o.value.includes(t)||e.blacklist.includes(t)||(o.value.push(t),l.value.includes(t)&&(l.value=l.value.filter((e=>e!==t)))),g(t),r.value=""}u()},updateTag:(e,t)=>{r.value=e,d(t)},removeTag:d,placeholderInput:c,suggestion:i,openSuggestion:e=>{setTimeout((()=>{i.value=!0}),5e3)},closeSuggestion:()=>{setTimeout((()=>{i.value=!1}),300)}}}});const h={class:"picker"},b={class:"picker-menu width-100 top:margin-0 top:border-0 padding-0 px:height-20 auto:overflow-y"};B.render=function(e,a,n,o,r,l){return t.openBlock(),t.createBlock("div",h,[t.createVNode("div",{class:"tag:input",onClick:a[5]||(a[5]=(...t)=>e.focusInput&&e.focusInput(...t))},[(t.openBlock(!0),t.createBlock(t.Fragment,null,t.renderList(e.tags,((a,n)=>(t.openBlock(),t.createBlock("div",{key:n,class:"tag-group"},[t.createVNode("span",{class:"tag",onDblclick:t=>e.updateTag(a,n)},t.toDisplayString(a),41,["onDblclick"]),t.createVNode("span",{class:"tag tag-delete",onClick:t=>e.removeTag(n)},null,8,["onClick"])])))),128)),t.withDirectives(t.createVNode("input",{type:"text","onUpdate:modelValue":a[1]||(a[1]=t=>e.tag=t),ref:"tagInput",class:"input-control",placeholder:e.placeholderInput,onInput:a[2]||(a[2]=t=>(e.autoWidth(),e.createTag(t),e.openSuggestion(e.tag))),onKeyup:a[3]||(a[3]=t.withKeys((t=>e.createTag(t)),["enter"])),onBlur:a[4]||(a[4]=(...t)=>e.closeSuggestion&&e.closeSuggestion(...t))},null,40,["placeholder"]),[[t.vModelText,e.tag]])]),t.createVNode(t.Transition,{name:"tagsinput-transition","enter-active-class":"animate fadeIn:animate","leave-active-class":"animate fadeOut:animate"},{default:t.withCtx((()=>[t.withDirectives(t.createVNode("div",b,[(t.openBlock(!0),t.createBlock(t.Fragment,null,t.renderList(e.whiteTags,(e=>(t.openBlock(),t.createBlock("div",{key:e,class:"picker-item",style:{"--active-color":"var(--alga-green)"}},t.toDisplayString(e),1)))),128))],512),[[t.vShow,e.suggestion]])])),_:1})])},e.NavBar=c,e.Page=n,e.SideBar=m,e.TagsInput=B,Object.defineProperty(e,"__esModule",{value:!0}),e[Symbol.toStringTag]="Module"}));
