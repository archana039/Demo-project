
export class SuccessHandlerHelper {
    rawData;
    data = {
      code: 200,
      isError: false,
      timestamp: Date.now(),
      error: undefined,
      messages: [],
    };
  
    constructor(data) {
      this.rawData = data;
      this.setSucccess();
    }
  
    setSucccess = () => {
      const messages = [];
  
      for (let i in this.rawData) {
        if ( i === "message") {
          //typeof this.rawData[i] === "string"
          messages.push(this.rawData[i]);
        }
      }
      console.log(messages[0],'messages')
      this.data.data = this.rawData;
      this.data.messages = messages;
    }
  }