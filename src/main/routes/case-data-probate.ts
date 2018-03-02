import * as express from "express";
import { getCase } from "../service/case-service";
import { getProbateCaseDetailsTemplate } from "../service/template-service";
import * as dateFilter from "nunjucks-date-filter";
import * as numeralFilter from "nunjucks-numeral-filter";

const nunjucks = require('nunjucks');

const router = express.Router();

dateFilter.setDefaultFormat('YYYY-MM-DD');
var env = nunjucks.configure({ autoescape: true });
env.addFilter('date', dateFilter);
env.addFilter('money', numeralFilter);

router.get("/jurisdictions/PROBATE/case-types/GrantOfRepresentation/cases/:cid", (req, res, next) => {
  getCase(req, 'PROBATE', 'GrantOfRepresentation', req.params.cid)
    .then(caseData => {
        getProbateCaseDetailsTemplate(req, 'PROBATE', 'GrantOfRepresentation', req.params.cid, caseData)
        .then(template =>
        {
          nunjucks.compile(template, env)
          var response = nunjucks.renderString(template, caseData);
          res.send(response);
        })
        .catch(error => {
          console.error('Case data response failed', error);
          res.status(error.status).send(error);
        });

      })
    .catch(error => {
      console.error('Case data retrieval failed', error);
      res.status(error.status).send(error);
    });
});

module.exports = router;
