export const getParameters = ({ query, skip }) => {
  let pathWithParameters = "";

  if (query.page && skip !== "page") {
    pathWithParameters += "&page=" + query.page;
  }

  return pathWithParameters;
};
export const stateTypes = [
  {
    value: "Australian Capital Territory",
    name: "Australian Capital Territory",
  },
  { value: "Western Australia", name: "Western Australia" },
  { value: "South Australia", name: "South Australia" },
  { value: "Tasmania", name: "Tasmania" },
  { value: "Victoria", name: "Victoria" },
  { value: "Queensland", name: "Queensland" },
  { value: "New South Wales", name: "New South Wales" },
  { value: "Northern Territory", name: "Northern Territory" },
];
export const segmentTypes = [
  { value: "OEM", name: "OEM" },
  { value: "Distributor", name: "Distributor" },
  { value: "Wholesaler", name: "Wholesaler" },
  { value: "Contractor", name: "Contractor" },
  { value: "Trade", name: "Trade" },
  {
    value: "Public (RRP/not logged in website)",
    name: "Public (RRP/not logged in website)",
  },
  { value: "Retailer", name: "Retailer" },
  { value: "Bootstock", name: "Bootstock" },
  { value: "Online Reseller", name: "Online Reseller" },
  { value: "Exporter", name: "Exporter" },
  { value: "Utility", name: "Utility" },
  { value: "Service Agent", name: "Service Agent" },
  {
    value: "Technical Commissioning Agent",
    name: "Technical Commissioning Agent",
  },
  { value: "Consultant", name: "Consultant" },
  { value: "Industry End User", name: "Industry End User" },
  { value: "Value Added Reseller", name: "Value Added Reseller" },
];
export const industryTypes = [
  {
    value: "Accommodation and Food Services",
    name: "Accommodation and Food Services",
  },
  {
    value: "Administrative and Support Services",
    name: "Administrative and Support Services",
  },
  {
    value: "Agriculture, Forestry and Fishing",
    name: "Agriculture, Forestry and Fishing",
  },
  {
    value: "Arts and Recreation Services",
    name: "Arts and Recreation Services",
  },
  { value: "Automotive", name: "Automotive" },
  { value: "Aviation", name: "Aviation" },
  { value: "Construction", name: "Construction" },
  { value: "Defence", name: "Defence" },
  { value: "Education and Training", name: "Education and Training" },
  { value: "Electricity - Commercial", name: "Electricity - Commercial" },
  { value: "Electricity - Data", name: "Electricity - Data" },
  { value: "Electricity - Industrial", name: "Electricity - Industrial" },
  { value: "Electricity - Residential", name: "Electricity - Residential" },
  { value: "Electricity - Solar", name: "Electricity - Solar" },
  { value: "Electronics", name: "Electronics" },
  {
    value: "Financial and Insurance Services",
    name: "Financial and Insurance Services",
  },
  { value: "Gas Commercial", name: "Gas Commercial" },
  { value: "Gas Industrial", name: "Gas Industrial" },
  { value: "Gas - Residential", name: "Gas - Residential" },
  { value: "Government - Federal", name: "Government - Federal" },
  { value: "Government - Local", name: "Government - Local" },
  { value: "Government - State", name: "Government - State" },
  { value: "Hardware", name: "Hardware" },
  {
    value: "Health Care and Social Assistance",
    name: "Health Care and Social Assistance",
  },
  { value: "Infrastructure - Airport", name: "Infrastructure - Airport" },
  { value: "Infrastructure - Ports", name: "Infrastructure - Ports" },
  { value: "Infrastructure - Rail", name: "Infrastructure - Rail" },
  { value: "Infrastructure - Road", name: "Infrastructure - Road" },
  { value: "Infrastructure - Tunnels", name: "Infrastructure - Tunnels" },
  {
    value: "Logistics, Postal and Warehousing",
    name: "Logistics, Postal and Warehousing",
  },
  { value: "Manufacturing", name: "Manufacturing" },
  { value: "Mining", name: "Mining" },
  {
    value: "Professional, Scientific and Technical Services",
    name: "Professional, Scientific and Technical Services",
  },
  {
    value: "Public Administration and Safety",
    name: "Public Administration and Safety",
  },
  { value: "Renewable Energy -Solar", name: "Renewable Energy -Solar" },
  { value: "Renewable Energy -Wind", name: "Renewable Energy -Wind" },
  {
    value: "Rental, Hiring and Real Estate Services",
    name: "Rental, Hiring and Real Estate Services",
  },
  { value: "Telecommunications", name: "Telecommunications" },
  { value: "Water", name: "Water" },
];
export default {};
