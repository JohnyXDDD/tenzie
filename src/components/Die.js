export default function Die({value,isHeld,holdingFunction}){
    const image= isHeld ? `${value}-g`: `${value}`
    const style={
        backgroundImage: `url(images/dice${image}.png)`
    }
    return(
        <div 
            className={`die`}
            onClick={holdingFunction}
            style={style}>
        </div>
    )
}