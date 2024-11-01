import React,{useState,useEffect} from 'react'
import './Calculator.css'
import Axios from 'axios';

const Calculator = () => {
    const [prev,setPrev]=useState('');
    const [result,setResult]=useState('');
    const [historyList,setHistoryList]=useState('');
    useEffect(()=>{
        Axios.get('http://localhost:4004/history')
        .then(response=>{
            setHistoryList(response.data);
        })
        .catch(err=>console.log(err));
    },[]);
   

    const handleClick=(e)=>{
        setResult(result.concat(e.target.value));
    }
    const clearAll=()=>{
        setResult("");
        setPrev("");
    }
    const backspace=()=>{
        setResult(result.slice(0,result.length-1));
    }
    const calculate=()=>{
        try{
            setPrev(result+'=');
            setResult(eval(result).toString());
            let datares=result+'='+eval(result).toString();
            Axios.post('http://localhost:4004/history',{data:datares})
            .then(response=>{
                console.log(response.datares);
                Axios.get('http://localhost:4004/history')
                        .then(response => {
                            setHistoryList(response.data);
                        })
                        .catch(err => console.log(err));                
            })
            .catch(err=>console.log(err))    
            // setTimeout(delete_History,120000);           
        }
        catch(err)
        {
            setResult("Error");
        }      
    }

    const [his_popup_class, setHisPopupClass] = useState("hidden")
    const handleClickHistory=()=>{
        setHisPopupClass("visible")
        // setTimeout(delete_History,1000)
    }
    const closeHistory=()=>{
        setHisPopupClass("hidden")
    }

    const delete_History=()=>{
        Axios.delete('http://localhost:4004/deleteHistory').then((response)=>{
            Axios.get('http://localhost:4004/history')
                        .then(response => {
                            setHistoryList(response.data);
                        })
                        .catch(err => console.log(err));
        }).catch(err=>console.log(err));
    }


  return (
    <div className='container'>
        <div className='header'>Calculator</div>
        <div className='box'>

            <table>
                <thead>
                    <tr>
                        <th colspan="4" rowSpan={2}>
                            <input type="text"  value={prev}/><br />
                            <input style={{fontSize:'25px'}} type="text" placeholder='Enter the value...' value={result}/>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><button className='btn' value="AC" onClick={clearAll}>AC</button></td>
                        <td><button className='btn'value="CL" onClick={backspace}>CL</button></td>
                        <td><button className='btn'value="%" onClick={handleClick}>%</button></td>
                        <td><button className='btn'value="/" onClick={handleClick}>/</button></td>
                    </tr>
                    <tr>
                        <td><button className='btn' value="7" onClick={handleClick}>7</button></td>
                        <td><button className='btn' value="8" onClick={handleClick}>8</button></td>
                        <td><button className='btn' value="9" onClick={handleClick}>9</button></td>
                        <td><button className='btn' value="*" onClick={handleClick}>*</button></td>
                    </tr>
                    <tr>
                        <td><button className='btn' value="4" onClick={handleClick}>4</button></td>
                        <td><button className='btn' value="5" onClick={handleClick}>5</button></td>
                        <td><button className='btn' value="6" onClick={handleClick}>6</button></td>
                        <td><button className='btn' value="-" onClick={handleClick}>-</button></td>
                    </tr>
                    <tr>
                        <td><button className='btn' value="1" onClick={handleClick}>1</button></td>
                        <td><button className='btn' value="2" onClick={handleClick}>2</button></td>
                        <td><button className='btn' value="3" onClick={handleClick}>3</button></td>
                        <td ><button className='btn' value="+" onClick={handleClick}>+</button></td>
                    </tr>
                    <tr>
                        <td><button className='btn' value="." onClick={handleClick}>.</button></td>
                        <td><button className='btn' value="0" onClick={handleClick}>0</button></td>  
                        <td><button className='btn' onClick={handleClickHistory} >History</button></td>                     
                        <td ><button className='btn' value="=" onClick={calculate}>=</button></td>
                    </tr>
                </tbody>
            </table>  
            <div className={his_popup_class}>
            <div className='history'>
                History <button style={{width:'100px',fontSize:'17px'}} onClick={delete_History}>Clr History</button><button onClick={closeHistory}><i class="fa-solid fa-xmark"></i></button>
                <ul>
                {Array.isArray(historyList) && historyList.map((item, index) => (
                            <li key={index}>{item.data}</li>
                        ))}
                </ul>
            </div>
            </div>
        </div>    
                  
    </div>
  )
}

export default Calculator