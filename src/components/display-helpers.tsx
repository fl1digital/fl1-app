import {decode} from 'html-entities';

export const DispayDate = (date: string): string => {

    const days: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const messageDate: Date = new Date(date);
    const todayDate: Date = new Date();   

    const timeDiff: number = todayDate.getTime() - messageDate.getTime();
    const dayDiff: number = Math.floor(timeDiff / (1000 * 3600 * 24)); 

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let displayDate = "";
    if (dayDiff == 0)
    {
      displayDate = "Today";
    }
    else if (dayDiff == 1) 
    {
      displayDate = "Yesterday";
    }
    else if (dayDiff < 7) {
      displayDate = days[messageDate.getDay()];
    }
    else if ((dayDiff > 6) && (dayDiff < 14))
    {
      displayDate = `Over a week ago`;
    }
    else {
      displayDate = `${messageDate.toLocaleDateString()}`;
    }
    
    // Add the Date String to the Date
    let timeDisplay = `${displayDate}`;
    return (timeDisplay);
  }

  export const HtmlDecode = (text: string): string => {

    let parsedText: string = text;
    parsedText = parsedText.replace('<p>', '');
    parsedText = parsedText.replace('</p>', '');
    // Add any additional string manipulation here...
    
    return (decode(parsedText));
  }