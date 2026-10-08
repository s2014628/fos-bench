import descriptions from './descriptions.json';
import psych from './psych-descriptions.json';
export type DatasetDescription={id:string;label:string;about:string;input:string;action:string;group:string;methodId:string;variant?:string};
const entries:Record<string,DatasetDescription>={...descriptions,...psych.items};
export const psychExperiments=Object.values(psych.items);
export function datasetInfo(id:string){return entries[id]}
export function datasetLabel(id:string){const item=datasetInfo(id);if(!item)return id;return item.variant?`${item.label} · ${item.variant}`:item.label===id?id:`${id} · ${item.label}`}
export default function DatasetSummary({id}:{id:string}){
 const item=datasetInfo(id);
 if(!item)return <section className="dataset-summary" aria-label="数据集简介"><p className="side-note">这个新增条件的任务简介尚待补充；评测范围以保存的实验记录为准。</p></section>;
 return <section className="dataset-summary" aria-label="数据集简介"><div className="dataset-summary-heading"><span className="dataset-kicker">数据集简介</span><h3>{item.label}</h3>{item.variant&&<span className="tag">{item.variant}</span>}</div><p className="dataset-about">{item.about}</p><dl className="dataset-facts"><div><dt>输入材料</dt><dd>{item.input}</dd></div><div><dt>系统要做什么</dt><dd>{item.action}</dd></div></dl>{item.variant&&<><p className="dataset-human-note">本轮预测的是参与者下一次的真实选择，成绩衡量与人类选择的一致程度。</p><div className="dataset-original-id">原实验标识 <code>{item.id}</code></div></>}</section>;
}
export function PsychExperimentDirectory(){return <details className="psych-directory"><summary>75个心理实验分别做什么</summary><p className="side-note">按冻结测试文件中的实验说明解释。原标识保留用于追溯；每项均预测当前参与者的下一次选择。</p><div className="psych-directory-list">{psychExperiments.map(item=><article key={item.id}><h4>{item.label}<span>{item.variant}</span></h4><p>{item.about}</p><p><strong>系统要做什么：</strong>{item.action}</p><code>{item.id}</code></article>)}</div></details>}
export const datasetDescriptions={datasets:descriptions,psychExperiments:psych};
