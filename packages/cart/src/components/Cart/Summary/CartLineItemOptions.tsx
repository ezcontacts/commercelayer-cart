export const isObjectEmpty = (objectName: any) => {
  return Object.keys(objectName).length === 0
}

export const LineItemOptionsAtributes = ({ cartItem }: any) => {
  let lineItemOptionsNames = cartItem?.line_item_options
  return (
    <>
      {lineItemOptionsNames?.map((lineItemOption: any, index: any) => {
        const { name, metadata , options} = lineItemOption?.attributes


        if (!isObjectEmpty(metadata)) return null

        return (
          <ol
            key={index}
            className="font-normal text-xs leading-5 text-gray-400"
            style={{ listStyleType: "disc" }}
          >
            <li>{name}</li>

          </ol>
        )
      })}
    </>
  )
}

export const CartLineItemOptions = ({ cartItem }: any) => {
  let lineItemOptions = cartItem?.line_item_options

  return (
    <>
      {lineItemOptions.map((lineItemOption: any, index: any) => {
        let Right = lineItemOption?.attributes?.metadata?.Right
        let Left = lineItemOption?.attributes?.metadata?.Left
        return (
          <div key={index} className="pt-2 space-y-2">
            {Right && (
              <div className="flex items-start">
                <div className="w-28">
                  <span className="font-normal text-xxs leading-5 text-gray-400">
                    {"Right Eye (OD)"}
                  </span>
                </div>
                <div className="flex justify-start  w-9/12 flex-wrap">
                  {Object.keys(Right).map((oneKey, i) => {
                    return (
                      <div key={i} className="pl-4">
                        <span className="font-semibold uppercase text-xxs leading-5 text-gray-700">
                          {oneKey}:{" "}
                        </span>
                        <span className="pl-2 font-normal text-xs leading-5 text-gray-400">
                          {Right[oneKey]}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
            {Left && (
              <div className="flex items-start">
                <div className="w-28">
                  <span className="font-normal text-xxs leading-5 text-gray-400">
                    {"Left Eye (OS)"}
                  </span>
                </div>

                <div className="flex w-9/12 flex-wrap">
                  {Object.keys(Left).map((oneKey, i) => {
                    return (
                      <div key={i} className="pl-4">
                        <span className="font-semibold uppercase text-xxs leading-5 text-gray-700">
                          {oneKey}:{" "}
                        </span>
                        <span className="pl-2 font-normal text-xs leading-5 text-gray-400">
                          {Left[oneKey]}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        )
      })}
    </>
  )
}
