import axios from "axios";

export async function multiply(x: number, y: number) {
  return x * y;
}

async function submitForm(payload, topic, routingKey) {
  const url = `${process.env.MQ_URL}/api/exchanges/%2F/${topic}/publish`;
  const auth = Buffer.from(`${process.env.MQ_USERNAME}:${process.env.MQ_PASSWORD}`).toString('base64');
  const options = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${auth}`
    }
  }
  const testData = JSON.stringify({
    "properties": {
      "delivery_mode": 2
    },
    "routing_key": routingKey,
    "payload": payload,
    "payload_encoding": "string"
  });

  return await axios.post(
    url,
    testData,
    options);
}



(async () => {

  const testPayload = {
    formTypeId: 1,
    leadloopFormKey: '3wWO0D24',    
    hostname: 'www.texasent.com',
    site: 'texasent',
    valid: true,
    date: '2022-12-08T21:15:30.057Z',
    body : {      
      "First Name" : 'Timothy',
      "Last Name" : 'Ryan III',
      'email' : 'timothy+test@tresio.co'
    },
    meta: {
      formId: 'landing',
      mqRoutingKey: 'll-forms',
      files: []
    }
  };

  
try
{
  const result = await submitForm(JSON.stringify(testPayload), 'cms.forms', 'll-forms');
  console.log(result);
} catch(e) {

  console.log(e);
}

  
  // await submitForm(testPayload, 'cms.forms.dlx', 'll-forms.dev.dlx');

})();
