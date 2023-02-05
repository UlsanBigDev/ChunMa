interface IDayInfo {
    day : number;
}
interface IModal {
    width : number;
    height : number;
    // asdf : number;       
    closeFunction : Function?;
    component : ReactNode;
}
interface IHome {
    month : string;
    year : number;
    qwert: number[][];
    height : number;        
}