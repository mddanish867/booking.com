

function MainLoader({ type = "warning", size = 100 }) {
  return (
    <div
    style={{
        position:'fixed',
        top:0,
        left:0,
        width:"100%",
        height:"100vh",
        display:"flex",
        alignItems:"center",
        justifyContent:"center"
    }}>
       <div
      style={{ scale: `${size}%` }}
      className={`spinner-border text-${type}`}
    ></div>
    </div>
  )
}

export default MainLoader
