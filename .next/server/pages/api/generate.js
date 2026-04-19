"use strict";(()=>{var a={};a.id=78,a.ids=[78],a.modules={3362:(a,b,c)=>{c.a(a,async(a,d)=>{try{c.r(b),c.d(b,{config:()=>o,default:()=>n,handler:()=>m});var e=c(9046),f=c(8667),g=c(3480),h=c(6435),i=c(7105),j=c(8112),k=c(6385),l=a([i]);i=(l.then?(await l)():l)[0];let n=(0,h.M)(i,"default"),o=(0,h.M)(i,"config"),p=new g.PagesAPIRouteModule({definition:{kind:f.A.PAGES_API,page:"/api/generate",pathname:"/api/generate",bundlePath:"",filename:""},userland:i,distDir:".next",relativeProjectDir:""});async function m(a,b,c){let d=await p.prepare(a,b,{srcPage:"/api/generate"});if(!d){b.statusCode=400,b.end("Bad Request"),null==c.waitUntil||c.waitUntil.call(c,Promise.resolve());return}let{query:f,params:g,prerenderManifest:h,routerServerContext:i}=d;try{let c=a.method||"GET",d=(0,j.getTracer)(),e=d.getActiveScopeSpan(),l=p.instrumentationOnRequestError.bind(p),m=async e=>p.render(a,b,{query:{...f,...g},params:g,allowedRevalidateHeaderKeys:[],multiZoneDraftMode:!1,trustHostHeader:!1,previewProps:h.preview,propagateError:!1,dev:p.isDev,page:"/api/generate",internalRevalidate:null==i?void 0:i.revalidate,onError:(...b)=>l(a,...b)}).finally(()=>{if(!e)return;e.setAttributes({"http.status_code":b.statusCode,"next.rsc":!1});let f=d.getRootSpanAttributes();if(!f)return;if(f.get("next.span_type")!==k.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${f.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let g=f.get("next.route");if(g){let a=`${c} ${g}`;e.setAttributes({"next.route":g,"http.route":g,"next.span_name":a}),e.updateName(a)}else e.updateName(`${c} ${a.url}`)});e?await m(e):await d.withPropagatedContext(a.headers,()=>d.trace(k.BaseServerSpan.handleRequest,{spanName:`${c} ${a.url}`,kind:j.SpanKind.SERVER,attributes:{"http.method":c,"http.target":a.url}},m))}catch(a){if(p.isDev)throw a;(0,e.sendError)(b,500,"Internal Server Error")}finally{null==c.waitUntil||c.waitUntil.call(c,Promise.resolve())}}d()}catch(a){d(a)}})},5600:a=>{a.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},7105:(a,b,c)=>{c.a(a,async(a,d)=>{try{c.r(b),c.d(b,{default:()=>g});var e=c(7984),f=a([e]);let h=new(e=(f.then?(await f)():f)[0]).default({apiKey:process.env.OPENAI_API_KEY});async function g(a,b){if("POST"!==a.method)return b.status(405).json({error:"Method not allowed"});try{let{name:c,company:d,industry:e}=a.body,f=`
Write ONE unique cold outreach email.

- Include subject line
- Mention ${d}
- Address ${c}
- Be 120–180 words
- Sound natural and human

Return only the email.
`,g=await h.chat.completions.create({model:"gpt-4o-mini",messages:[{role:"user",content:f}],temperature:1}),i=g?.choices?.[0]?.message?.content;if(!i)return b.status(200).json({email:`Subject: Quick idea for ${d}

Hi ${c},

I came across ${d} and wanted to reach out. I believe there’s an opportunity to improve outreach and engagement.

Would you be open to a quick chat?

Yours sincerely,  
[Your Name]`});return b.status(200).json({email:i})}catch(a){return console.error("❌ SERVER ERROR:",a),b.status(500).json({error:"Failed to generate email"})}}d()}catch(a){d(a)}})},7984:a=>{a.exports=import("openai")}};var b=require("../../webpack-api-runtime.js");b.C(a);var c=b.X(0,[169],()=>b(b.s=3362));module.exports=c})();