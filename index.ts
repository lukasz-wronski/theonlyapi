import { Configuration, OpenAIApi } from "openai";

type SimpleValue<Type> = Type extends NumberConstructor ? number :
                          Type extends StringConstructor ? string :  
                          Type extends BooleanConstructor ? boolean :
                          SimplifyType<Type>;

type SimplifyType<Type> = Type extends [] ? [SimpleValue<any>] : { [Key in keyof Type]: SimpleValue<Type[Key]> } 


type AsTypeFunction = <T extends {}>(returnType: T) => Promise<SimplifyType<T>>;

type TheApi = {
  [key: string]: (...args: any[]) => {
    AsType: AsTypeFunction;
  };
};

function TheApi(openAIKey: string): TheApi {
  const configuration = new Configuration({
    apiKey: openAIKey,
  });

  const openai = new OpenAIApi(configuration);

  const replacer = function (key: string, value: any) {
    if (typeof value === "function") return (typeof value()).toString();
    return value;
  };

  const generatePrompt = function (
    fnName: string,
    callArguments: IArguments,
    returnType: any
  ) {
    const args = Array.from(callArguments);
    const argsJsons = args.map((arg) => JSON.stringify(arg));
    const parameters = argsJsons.length > 0 ? `with parameters [${argsJsons.join()}]` : "without parameters";
    const prompt = `Return a result of an API call to the hypothetical web method "${fnName}" 
                        ${parameters}. 
                        
                        Format response to fit following object signature: ${JSON.stringify(
                          returnType,
                          replacer
                        )
                          .split('"')
                          .join("")}. 
                        Print just a response JSON. 
                        
                        If some of the input data will show in output do not modify it in any way.
                        Keep the response short. Make it a single line answer without new line characters. 
                        Minify the JSON.`;

    return prompt;
  };

  const handler = {
    get: function (target: null, prop: string, receiver: any) {
      return function () {
        const args = arguments;
        return {
          AsType: async function <T>(returnType: new () => T) {
            const prompt = generatePrompt(prop, args, returnType);
            const result = await openai.createCompletion({
              model: "text-davinci-003",
              prompt: prompt,
              max_tokens: 1024,
            });
            const json = result.data.choices[0].text;
            return json ? JSON.parse(json) : null;
          },
        };
      };
    },
  };
  return new Proxy<any>({}, handler);
}

export default TheApi;

