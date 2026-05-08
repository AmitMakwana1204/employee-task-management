function Table({ columns, data }) {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow">
      <table className="w-full border-collapse">
        
        <thead className="bg-gray-100">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className="px-4 py-3 text-left text-sm font-semibold text-gray-700"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-t hover:bg-gray-50 transition"
              >
                {Object.values(row).map((value, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-4 py-3 text-sm text-gray-600"
                  >
                    {value}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-5 text-gray-500"
              >
                No Data Found
              </td>
            </tr>
          )}
        </tbody>

      </table>
    </div>
  );
}

export default Table;