module.exports = {
  parse: (json) => {
    const result = [];
    let jsonType = {
      Name: '',
      LatestYear: 0,
      Assets: [],
      Liabilities: [],
      ShareHolders: [],
      Revenue: [],
      Net: [],
      ROE: [],
      ROA: [],
      Mkt: 0,
    };

    json.forEach((company) => {
      jsonType = {
        Name: company.Name,
        LatestYear: company.LatestYear,
        Assets: company.Assets,
        Liabilities: company.Liabilities,
        ShareHolders: company.ShareHolders,
        Revenue: company.Revenue,
        Net: company.Net,
        ROE: company.ROE,
        ROA: company.ROA,
        Margin: company.Margin,
        Mkt: company.Mkt[0],
      };

      result.push(jsonType);
    });

    return result;
  },
};
