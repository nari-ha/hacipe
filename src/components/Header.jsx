function Header({ navigate }) {
    return (
        <>
        <button onClick={()=>navigate('/todo')}>todo</button>
        <button onClick={()=>navigate('/search')}>search</button>
        <button onClick={()=>navigate('/tabs')}>tabs</button>
        <button onClick={()=>navigate('/star')}>star</button>
        <button onClick={()=>navigate('/data')}>data</button>
        <button onClick={()=>navigate('/img')}>img</button>
        <button onClick={()=>navigate('/practice')}>practice</button>
        </>
    )
}

export default Header;