export default function(props: any) {
    return(
        <div className="day-info">
            <div className="today">2023.01.{props.changeDay}</div>
            <div className="day-list">
                <div className="item">• 어쩌구 저쩌구 하기</div>
                <div className="item">• 어쩌구 저쩌구 하기</div>
                <div className="item">• 어쩌구 저쩌구 하기</div>
                <div className="item">• 어쩌구 저쩌구 하기</div>
                <div className="item">• 어쩌구 저쩌구 하기</div>
                <div className="item">• 어쩌구 저쩌구 하기</div>                
            </div>
        </div>
    );        
}