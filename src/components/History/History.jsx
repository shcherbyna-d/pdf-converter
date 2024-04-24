import { formatBytes } from "../../utils";

const History = ({ files, onViewPdf }) => {
  return (
    <div>
      <h2 className="text-lg">History:</h2>
      <ul className="flex flex-col gap-2">
        {files.map((file, index) => {
          return (
            <li
              className="flex gap-3"
              key={index}
              onClick={() => onViewPdf(file)}
            >
              <button
                type="button"
                className=" bg-slate-50 hover:bg-slate-200 w-full text-left p-1 rounded-md flex"
              >
                <div>{file.name}</div>
                {Boolean(file.pdfBlob.size) && (
                  <div className="ml-auto">
                    {formatBytes(file.pdfBlob.size)}
                  </div>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default History;
