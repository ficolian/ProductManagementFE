import DateTimePicker from "react-datetime-picker";
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

export default function DatePicker(props){
    return(
        <DateTimePicker format="dd MMMM yyyy"
            disableClock
            onChange={props?.onChange}
            value={props?.value} 
            className={props?.className}
            disabled={props?.disabled}
        />
    )
}