const FaNumber = ({ number }) => {
  if (number === null || number === undefined) return "";

  const withCommas = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const toPersian = withCommas.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);

  return <span>{toPersian}</span>;
};

export default FaNumber;
