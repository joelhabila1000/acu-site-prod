export default function HoursTable({ hours }) {
  if (!Array.isArray(hours) || !hours.length) return null;
  return (
    <table className="lib-hours-table">
      <thead>
        <tr>
          <th scope="col">Day</th>
          <th scope="col">Hours</th>
        </tr>
      </thead>
      <tbody>
        {hours.map((entry, index) => {
          const closed = !entry.opens || /closed/i.test(entry.closes || "");
          const value = closed
            ? entry.closes || "Closed"
            : `${entry.opens} – ${entry.closes}`;
          return (
            <tr key={`${entry.day}-${index}`}>
              <td>{entry.day}</td>
              <td>{value}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
