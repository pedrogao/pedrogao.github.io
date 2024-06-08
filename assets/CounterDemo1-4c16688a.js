import{r as _,O as i,I as y}from"./op-fac60542.js";import{_ as d}from"./plugin-vue_export-helper-c27b6911.js";import{o as f,c as m,a as c,J as v,r as h,e as l}from"./app-c3d73543.js";import{N as k,d as u}from"./network-fce442ae.js";class g{constructor(e=0,t){this.value=e,this.clientId=t??_(6),this.clock=0,this.ops=[],this.vector=new Map}get(){return this.value}increment(){this.value++,this.ops.push({type:i.Increment,value:1,id:[this.clientId,this.clock++]})}decrement(){this.value--,this.ops.push({type:i.Decrement,value:1,id:[this.clientId,this.clock++]})}apply(e){const t=e.id,s=this.vector.get(t[0])??-1;if(!(s>=t[1])){if(s+1!==t[1])throw new Error(`Op id not in order: ${s} ${t[1]}`);if(e.type===i.Increment)this.value+=e.value;else if(e.type===i.Decrement)this.value-=e.value;else throw new Error(`Unsupport op type: ${e.type}`);this.vector.set(t[0],t[1])}}ack(e){this.ops=this.ops.filter(t=>!y.equals(t.id,e.id))}flush(){return this.ops}}const w={data(){return{counter:new g}},mounted(){},methods:{trigger(){this.$emit("output",{value:this.counter.get(),ops:this.counter.flush()})},ack(n){this.counter.ack(n)},apply(n){this.counter.apply(n)},increment(){this.counter.increment(),this.trigger()},decrement(){this.counter.decrement(),this.trigger()}}},O={class:"counter"},N={class:"text"},C={class:"buttons"};function $(n,e,t,s,a,o){return f(),m("div",O,[c("p",N,v(a.counter.get()),1),c("div",C,[c("button",{class:"button",onClick:e[0]||(e[0]=(...r)=>o.increment&&o.increment(...r))},"+"),c("button",{class:"button",onClick:e[1]||(e[1]=(...r)=>o.decrement&&o.decrement(...r))},"-")])])}const b=d(w,[["render",$],["__file","Counter.vue"]]);const x={components:{Counter:b,NetworkSetting:k},data(){return{channel1:null,channel2:null}},mounted(){this.channel1=u.createChannel("counter1"),this.channel1.receive(n=>{const{type:e,ops:t}=JSON.parse(n);if(e==="submit"){for(const s of t)this.$refs.counter1.apply(s);this.channel1.send("counter2",JSON.stringify({type:"ack",ops:t}))}else if(e==="ack")for(const s of t)this.$refs.counter1.ack(s);else throw new Error("unknown type")}),this.channel2=u.createChannel("counter2"),this.channel2.receive(n=>{const{type:e,ops:t}=JSON.parse(n);if(e==="submit"){for(const s of t)this.$refs.counter2.apply(s);this.channel2.send("counter1",JSON.stringify({type:"ack",ops:t}))}else if(e==="ack")for(const s of t)this.$refs.counter2.ack(s);else throw new Error("unknown type")})},methods:{networkTrigger({online:n,delay:e}){const t=parseInt(e);u.setDelay(t),u.setEnable(n)},output1({value:n,ops:e}){const t={type:"submit",ops:e};this.channel1.send("counter2",JSON.stringify(t))},output2({value:n,ops:e}){const t={type:"submit",ops:e};this.channel2.send("counter1",JSON.stringify(t))}}},S={class:"flex-list"};function I(n,e,t,s,a,o){const r=h("network-setting"),p=h("counter");return f(),m("div",null,[l(r,{onNetwork:o.networkTrigger},null,8,["onNetwork"]),c("div",S,[l(p,{ref:"counter1",class:"flex-list-item",onOutput:o.output1},null,8,["onOutput"]),l(p,{ref:"counter2",class:"flex-list-item",onOutput:o.output2},null,8,["onOutput"])])])}const T=d(x,[["render",I],["__file","CounterDemo1.vue"]]);export{T as default};