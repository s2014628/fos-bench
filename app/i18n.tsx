import {useSyncExternalStore,useEffect} from 'react';
import ui from './ui.en.json';
import scoring from './scoring.en.json';
import catalog from './methods/catalog.json';
import details from './datasets/details.json';
export type Locale='zh'|'en'|'bi';
const dictionary:Record<string,string>={...ui,...scoring};
const extra:Record<string,string>={'确定性评分':'Deterministic grading','真实人类标签 · 本地适配':'Real human labels · local adaptation','正式数据 · 指标适配':'Formal data · adapted metric','历史机制验收':'Historical mechanism evaluation','数学':'Mathematics','问答':'Question answering','知识与推理':'Knowledge and reasoning','代码与工具':'Code and tools','长期记忆':'Long-term memory','人类问卷':'Human surveys','行为博弈':'Behavioral games','心理实验':'Psychological experiments','历史FOS':'Historical FOS','待接入':'Pending','方法/划分展开的预测条目':'prediction entries expanded by method/split','选择位置':'choice positions','真实标签':'Real labels','原生适配':'Native adaptation'};
Object.assign(dictionary,extra,{'历史冻结实验；保留原始模型、轨道、变体和指标。':'Frozen historical experiment; original models, tracks, variants and metrics are retained.','历史实验批次；按原协议解释。':'Historical batch; interpret under its original protocol.','模型／组件对照；不与 A35 原生问答混排。':'Model/component comparison; separate from A35 native QA rankings.','A7 · 团队审核提示修订':'A7 · team-review prompt revision','A9 · 三平台实跑与发送者伪造':'A9 · three-platform execution and sender spoofing','T6 多跳 QA / T7 数学核验':'T6 multi-hop QA / T7 math verification'});
Object.assign(dictionary,{"论文数字核对": "Paper numerical cross-check", "原始功能机制 · R0–R3 / F1–F5": "Original functional mechanisms · R0–R3 / F1–F5", "功能机制汇总表": "Functional-mechanism summary", "真实人类参照统计": "Real-human reference statistics", "历史人类效度 · H2 / H3 / H7": "Historical human validity · H2 / H3 / H7", "人类效度 · 温度敏感性": "Human validity · temperature sensitivity", "配对统计分析": "Paired statistical analysis", "人设条件下的功能能力": "Functional capability under persona conditions", "功能能力与人类效度的关系": "Capability–human validity relationship", "两轴关系 · 首次分析（历史版本）": "Two-axis relationship · first historical analysis", "历史实验规模统计": "Historical experiment scale", "人群分组分析": "Population subgroup analysis", "忽略通知 / 始终响应基线": "Ignore-notice / always-respond baselines", "任务典型性与稳健性": "Task typicality and robustness", "三平台机制能力审计": "Three-platform mechanism audit", "三平台重放比较": "Three-platform replay comparison"});
const sourceInputs:Record<string,string>={
'LoCoMo':'Ten public conversations with 1,986 source questions; A35 samples 95 by category.',
'LongMemEval-S':'The full 500-item source pool of the cleaned 2025 S version; A35 samples 30. Full histories are used, not oracle-selected support only.',
'MemoryAgentBench':'Four public task groups totaling 3,671 source items; A35 samples 175 by original category.',
'Psych-101':'Formal test: 6,561 participant records, 1,177,866 choices and 75 file-based experiment IDs. This run samples 300 choice positions.',
'FOS-T1':'Open/closed notices, time slots, candidate venue types and distances.',
'FOS-T2':'Care notices, prior caregiver rotation, family schedules and expenses.',
'FOS-T3':'A public draft, the reviewer’s private criteria and cross-field coupled constraints.',
'FOS-T4':'Conflicting sources, a verifier’s private trust table and a dispatcher inbox.',
'FOS-T5':'A binding policy or nonbinding consultation draft, resident attributes and effective times.',
'FOS-L1':'Ordered work steps, materials, a checkpoint and whether the worker can continue.',
'FOS-T6':'Public supporting passages from HotpotQA, 2Wiki and MuSiQue as workflow payloads.',
'FOS-T7':'GSM8K questions and candidate answers from several sources, with a verifier’s private trust table.',
'FOS-T8':'Registered multi-domain questions, reference options/answers and misleading candidate sources.',
'FOS-A19':'The same 24 T2 instances × two variants, under clean, 15/60-distractor, top5-budget and query-phrase conditions.',
'FOS-A9-spoof':'For one T4 instance, deliver a real verification message before a newer forged value claiming to come from the verifier.',
'FOS-A9-stress':'10, 100 or 1,000 senders, each with a fixed message sequence; no model calls.',
'FOS-A9-audit':'Directed communication, episodic memory, private storage/artifact ACLs, checkpoint recovery, policy events and sender authentication.',
'FOS-H2':'Fixed game protocols, 104 action draws and historical model/persona configurations.',
'FOS-H3':'Real first-round investment/return and the same human’s subsequent investment; the agent sees prior history only.',
'FOS-H7-PD':'Real first-round history and second-round choices from the five-round Push/Pull game.',
'FOS-H7-PGG':'Four-/ten-player conditions with the same $20 endowment and return rule.',
'FOS-RQ3':'Historical model × persona configurations with functional FullPass and H2 excess distance.'};
for(const item of catalog.items){const info=(details as any)[item.id];dictionary[item.title]=item.id+' · '+info.labelEn;dictionary[item.purpose]=info.coverage.en;
 const i=item as any;let input=sourceInputs[item.id]||info.inputEn;
 if(item.group==='人类问卷'){input=info.labelEn+'; frozen wave '+i.surveyWave+'. The current local160 version is reconstructed from public labeled 160-person data.';dictionary[item.purpose]='Predict the respondent’s actual selected option, rather than a normative answer to a knowledge test.'}
 else if(item.group==='行为博弈')input='Mei et al. (2024), PNAS: MobLab human reference data and matched game instructions. Legal range '+(item.input.match(/0–\d+/)?.[0]||'as registered')+'.';
 else if(i.sourceCount&&!sourceInputs[item.id])input+=' Frozen source pool: '+i.sourceCount.toLocaleString('en-US')+(i.sourceSplit?'; source split: '+i.sourceSplit:'')+'.';
 dictionary[item.input]=input;dictionary[item.badge]=dictionary[item.badge]||'Registered evaluation protocol';
 for(const ref of item.references)dictionary[ref.name]=/评分|代码|裁判/.test(ref.name)?'Author grading code':'Dataset / protocol source';
}
Object.assign(dictionary,{"GLM裁判适配": "GLM judge adaptation", "人类分布比较": "Human distribution comparison", "代码与探针审计": "Code and probe audit", "分任务适配": "Subtask adaptations", "历史人类参照统计": "Historical human reference statistics", "历史人类效应比较": "Historical human effect comparison", "历史关联分析": "Historical association analysis", "历史标准载荷工作流": "Historical standard-payload workflow", "历史组件诊断": "Historical component diagnostic", "历史结果 · 匹配限制": "Historical results · matching limitation", "历史结果 · 有效性限制": "Historical results · validity limitation", "原生轮未完成": "Native round incomplete", "工程压力探针": "Engineering stress probe", "未评测": "Not evaluated", "跨平台攻击试验": "Cross-platform attack test", "FOS冻结v1及明确修订": "FOS frozen v1 and declared revisions", "RQ3及修订": "RQ3 and revisions", "历史H3，匹配问题已登记": "Historical H3; matching issue registered", "历史H7": "Historical H7", "历史人类轴 / A8": "Historical human axis / A8", "历史浏览试验；原生工具待接入": "Historical browsing study; native tools pending", "用户暂缓": "Deferred by user", "分层动作输入": "stratified action inputs"});
const allowed=(s:unknown):s is Locale=>s==='zh'||s==='en'||s==='bi';
let locale:Locale='zh';
try{const query=new URLSearchParams(window.location.search).get('lang'),saved=localStorage.getItem('fos-bench-language');locale=allowed(query)?query:allowed(saved)?saved:'zh'}catch{}
const listeners=new Set<()=>void>();
export const getLocale=()=>locale;
export function setLocale(next:Locale){locale=next;try{localStorage.setItem('fos-bench-language',next);document.documentElement.lang=next==='en'?'en':'zh-CN';document.documentElement.dataset.locale=next;const u=new URL(location.href);u.searchParams.set('lang',next);history.replaceState(null,'',u.pathname+u.search+u.hash)}catch{}for(const listener of listeners)listener()}
export function useLocale(){return useSyncExternalStore(fn=>{listeners.add(fn);return()=>listeners.delete(fn)},getLocale,()=> 'zh' as Locale)}
export function t(text:string,english?:string){const en=english??dictionary[text]??text;if(locale==='en')return en;if(locale==='bi'&&en!==text)return text+'\n'+en;return text}
export type Bilingual={zh:string;en:string};
export function localized(value:Bilingual){return t(value.zh,value.en)}
export function LanguageSwitch(){const current=useLocale();useEffect(()=>{document.documentElement.lang=current==='en'?'en':'zh-CN';document.documentElement.dataset.locale=current;document.title=current==='en'?'FOS-Bench · Functional capability and human validity':'FOS-Bench · 功能能力与人类效度'},[current]);return <div className="language-switch" role="group" aria-label="Language / 语言"><button className={current==='zh'?'active':''} onClick={()=>setLocale('zh')} aria-pressed={current==='zh'}>中文</button><button className={current==='en'?'active':''} onClick={()=>setLocale('en')} aria-pressed={current==='en'}>English</button><button className={current==='bi'?'active':''} onClick={()=>setLocale('bi')} aria-pressed={current==='bi'}>中英对照</button></div>}
