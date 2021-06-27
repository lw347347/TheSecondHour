import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

export default function DisplayCard(props: any) {
    const [numberOfPreviousSundaysInThisMonth, setNumberOfPreviousSundaysInThisMonth] = useState<Number | undefined>();
    const [monthName, setMonthName] = useState<String | undefined>();
    const [reasonWhy, setReasonWhy] = useState<String | undefined>();
    const [today, setToday] = useState<Date>();
    const [todayIs, setTodayIs] = useState<String | undefined>();
    const [todayIsCombined, setTodayIsCombined] = useState<Boolean | undefined>();
    const [todayIsGeneralConference, setTodayIsGeneralConference] = useState<Boolean>(false);
    const [todayIsSunday, setTodayIsSunday] = useState<Boolean>();
    const [todayIsSundaySchool, setTodayIsSundaySchool] = useState<Boolean | undefined>();
    const [todayIsTheBlankSunday, setTodayIsTheBlankSunday] = useState<String | undefined>();
    const [todayOrThisComingSunday, setTodayOrThisComingSunday] = useState<String>();
    const [todayString, setTodayString] = useState<String>();

    useEffect(() => {
        setToday(props.today);        
        // For the date
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        // Check if it's Sunday
        if (today !== undefined) {
            let setEverythingUp = (day: Date) => {
                // Check which Sunday it is
                setNumberOfPreviousSundaysInThisMonth(Math.floor(day.getDate() / 7));
                
                // Check if it will be general conference
                if (numberOfPreviousSundaysInThisMonth === 0 && (day.getMonth() === 4 || day.getMonth() === 10)) {
                    // Today is not Sunday School
                    setTodayIsSundaySchool(false);
                    setTodayIsCombined(false);
                    setTodayIsGeneralConference(true);

                    // Set the right sunday
                    setTodayIsTheBlankSunday('first');
                } else {
                    if (numberOfPreviousSundaysInThisMonth === 1 
                        || numberOfPreviousSundaysInThisMonth === 3) {
                        setTodayIsGeneralConference(true);
                        setTodayIsSundaySchool(false);
                        setTodayIsCombined(false);
            
                        // Set the right sunday
                        setTodayIsTheBlankSunday('first');

                    } else if (numberOfPreviousSundaysInThisMonth === 0 
                        || numberOfPreviousSundaysInThisMonth === 2) {
                        // Today is Sunday school
                        setTodayIsSundaySchool(true);
                        setTodayIsCombined(false);
            
                        // Set the right sunday
                        setTodayIsTheBlankSunday(numberOfPreviousSundaysInThisMonth === 0 ? "first" : "third");
                    } else {
                        // There must have been 4 previous sundays
                        setTodayIsCombined(true);
                        setTodayIsSundaySchool(false);
                        setTodayIsTheBlankSunday("fifth");
                    }
                }

                setReasonWhy(`Because ${todayIsSunday ? 'it is' : 'it will be'} the ${todayIsTheBlankSunday} sunday in the month of ${monthName}.`);
            }

            if (today.getDay() === 0) {
                // It is Sunday
                setTodayIsSunday(true);
                setEverythingUp(today);    
                setTodayOrThisComingSunday("Today is "); 
                setMonthName(monthNames[today.getMonth()]);   
                
            } else {
                // It is not Sunday
                setTodayIsSunday(false);                    
                // Add days until we get Sunday
                let thisComingSunday = new Date();
                while (thisComingSunday.getDay() !== 0) {
                    thisComingSunday.setDate(thisComingSunday.getDate() + 1);
                }
                setEverythingUp(thisComingSunday);                
                setTodayOrThisComingSunday("This coming Sunday will be ");
                console.log('hello');                
                setMonthName(monthNames[thisComingSunday.getMonth()]);  
            }
            
            setTodayString(`${today.getDate()} ${monthName} ${today.getFullYear()}`); 

            if (todayIsSundaySchool) {
                setTodayIs("SUNDAY SCHOOL");
            } else if (todayIsCombined) {
                setTodayIs("COMBINED");
            } else {
                setTodayIs("PRIESTHOOD AND RELIEF SOCIETY");
            }
        }
    }, [
        props.today, 
        today, 
        monthName, 
        todayIsSundaySchool, 
        todayIsCombined,
        numberOfPreviousSundaysInThisMonth
    ]);

    return(
        <div>
            <div id="topBar"></div>
            <Card>
                <Card.Body>
                    <div className="d-inline-block card-title">
                        <div className="d-flex">
                            <div className="d-inline-block card-subtitle margin-top" id="date">
                                {todayOrThisComingSunday}
                            </div>
                            <div className="d-inline-block card-subtitle text-muted text-end margin-top" id="date"
                                style={{marginLeft: "auto"}}
                            >
                                {todayString}
                            </div>
                        </div>
                        <div style={{fontSize: '2.5rem'}} id="todayIs">{todayIs}.</div>
                    </div>
                    
                    
                    <Card.Text>
                        <div>{reasonWhy}</div>
                        <div className="text-muted">Please see more <a href="https://www.churchofjesuschrist.org/bc/content/ldsorg/general-conference/16435_000_FAQ.pdf?lang=eng">here.</a></div>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}