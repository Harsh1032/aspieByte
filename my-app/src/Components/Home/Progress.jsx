import React, {useContext} from 'react';
import Chart from "chart.js/auto";
import { Line } from 'react-chartjs-2';
import {Link} from 'react-router-dom'
import { CategoryScale } from "chart.js";
import ThemeContext from '../../ThemeContext';
Chart.register(CategoryScale);


const Progress = () => {
    const hours = [0, 1, 2, 3, 4];
    const coinTimestamp = ["Jan 1", "Jan 2", "Jan 3", "Jan 3", "Jan 4", "Jan 5", "Jan 6", "Jan 7"];

    const data = {
        labels: coinTimestamp,
        // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
        datasets: [
            {
              label: 'Progress on daily basis',
              data: hours,
              // you can set indiviual colors for each bar
              fill: false,
              backgroundColor: '#0071bd',
              borderWidth: 1,
              borderColor: '#0071bd',
            }
        ]
    }

    const options = {
        plugins: {
            title: {
              display: true,
              text: "Progress on daily basis"
            },
            legend: {
              display: false
            }
        }
    };

    const {selectedTheme} = useContext(ThemeContext);

  return (
    <div className='h-full w-full px-5 py-2'>
        <div className='ml-auto flex w-[200px]'>
           
        </div>
        <div className='py-2'>
            <h1 className='font-semibold text-6xl' style = {{color: selectedTheme.colors.secondary}}>Progress</h1>
        </div>
        <div className=' w-full h-[200px] flex justify-center py-2'>
            <Line data={data} options={options} width={700}/>
        </div>
    </div>
  )
}

export default Progress