import React,{Component} from "react";
import "./container.less";
import PropTypes from "prop-types";
import PanelList from "./panellist";
import ReaderList from "./readerlist";
import {Link} from "react-router-dom";
import {DATA_FROM_HOST} from "../../common";
class Container extends Component{

    constructor(props){
        super(props);

        this.state = {data:{},hasGood:false};
    }

    componentDidMount(){
        const {id} = this.props.match.params;
        const {userinfo} = this.props;

        let that = this;
        $.ajax({
            url:DATA_FROM_HOST+"/data.php/getArticle",
            data:{id:id},
            async:true,
            type:"POST",
            success:(data)=>{
                let info = $.parseJSON(data);

                if(info.data == undefined){
                    return false;
                }
                let hasGood = false;
                info.data.good = info.data.good.split(",");
                if(info.data.good.length > 0 && this.IsInArray(info.data.good,userinfo.id)){
                    hasGood = true;
                }


                that.setState(Object.assign({},that.state,{data:info.data,hasGood:hasGood}));
            }
        });
     
        
    }

 IsInArray(arr,val){ 
 
    　　var testStr=','+arr.join(",")+","; 
    
    　　return testStr.indexOf(","+val+",")!=-1; 
 
} 
    //组件更新完后显示内容
    componentDidUpdate() {
        let content  = this.state.data.content;
        
        this.contentContainer.innerHTML = content;
       
        $(this.contentContainer).find("img").each((index,img)=>{

            $(img).attr("src",DATA_FROM_HOST+$(img).attr("src"));
        });
    }
    //用户点赞
    OnArticleGetGood(){
        const {userinfo} = this.props;
        const {data} = this.state;
        let that = this;
        //点赞请求
        $.ajax({
            url:DATA_FROM_HOST+"/data.php/sendGood",
            data:{
                pid:data.id,
                uid:userinfo.id
            },
            type:"POST",
            async:true,
            success:(data)=>{
                let info = $.parseJSON(data);
                console.log(info);
                let hasGood = info.hasgood==1?true:false;
                that.setState(Object.assign({},that.state,{data:Object.assign({},that.state.data,{good:info.good}),hasGood:hasGood}));
            }
        });
    }

    shouldComponentUpdate(pstate,nstate){
        console.log(nstate);
        return true;
    }

    render(){

        const {data}  = this.state;

        if(JSON.stringify(data) == "{}"){
           return null;
        }

        return (
            <div>
                
                <div className="container-title">{data.title}</div>
                <div className="container-info">
                    <div className="container-time">{data.publishtime}</div>
                    <div className="container-view">阅读 {data.view}</div>
                </div>
                <div className="container-content" ref={(ref)=>this.contentContainer=ref}>
                    
                </div>
                <div className="container-func">
                    <div className={"press-good "+(this.state.hasGood?"presson":"")} onClick={(e)=>this.OnArticleGetGood(e)}>赞({data.good.length})</div>
                </div>
                <div className="container-link">
                    <Link to="/" className="link-text" >{"<"}返回</Link>
                </div>
            
                <div className="conatiner-reader">
                    <ReaderList data={data.reader} />
                </div>
                <div className="container-panel-info" style={{display:"none"}}>
                    <div className="container-panel">
                        <div className="container-panel-title">在此处输入想要说的话..</div>
                        <div className="container-panel-submit">
                            <input type="text" ref={(panelInput)=>this.panelInput=panelInput} placeholder={"在此处输入留言"}  />
                            <button  >提交留言</button>
                        </div>
                    </div>
                    <div className="container-panel-list">
                        <PanelList />
                    </div>
                </div>
            </div>
        );
    }
}
export default Container;
Container.propTypes =  {
    params:PropTypes.shape({
        id:PropTypes.number.isRequired
    }),
}