import React from "react";
import parse from "html-react-parser";
function QuoteTemplate() {
  const styles = {
    page: {
      marginLeft: "5rem",
      marginRight: "5rem",
      "page-break-after": "always",
    },
    introText: {
      fontSize: 12,
    },
    columnLayout: {
      display: "flex",
      justifyContent: "space-between",
      margin: "3rem 0 5rem 0",
      gap: "2rem",
    },

    column: {
      display: "flex",
      flexDirection: "column",
    },

    spacer2: {
      height: "2rem",
    },

    fullWidth: {
      width: "100%",
    },

    marginb0: {
      marginBottom: 0,
    },
  };
  return (
    <>
      {/* <div style={styles.page}>
        <div>
          <h1 style={styles.introText}>
            Report Heading That Spans More Than Just One Line
          </h1>
        </div>

        <div style={styles.spacer2}></div>
      </div>

      <div style={styles.page}>
        <div>
          <h2 style={styles.introText}>
            Report Heading That Spans More Than Just One Line
          </h2>
        </div>

        <div style={styles.columnLayout}>
          <div style={styles.column}>
            <h4 style={styles.marginb0}>Subtitle One</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          <div style={styles.column}>
            <h4 style={styles.marginb0}>Subtitle Two</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>

        <div style={styles.columnLayout}>
          <div style={styles.column}>
            <h4 style={styles.marginb0}>Subtitle One</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          <div style={styles.column}>
            <h4 style={styles.marginb0}>Subtitle Two</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      </div> */}
      {/* {parse(`
    <header style="box-sizing: border-box; padding: 10px 0px; margin-bottom: 20px; border-bottom: 1px solid rgb(57, 137, 198); color: rgb(33, 37, 41); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; font-size: 16px;">
<div class="row" style="box-sizing: border-box; display: flex; flex-wrap: wrap; margin-right: -15px; margin-left: -15px;">
<div class="col" style="box-sizing: border-box; position: relative; width: 884px; min-height: 1px; padding-right: 15px; padding-left: 15px; flex-basis: 0px; flex-grow: 1; max-width: 100%;"><a href="https://lobianijs.com/" style="box-sizing: border-box; color: rgb(0, 123, 255); text-decoration-line: none; background-color: transparent;" target="_blank"><img data-holder-rendered="true" src="http://lobianijs.com/lobiadmin/version/1.0/ajax/img/logo/lobiadmin-logo-text-64.png" style="box-sizing: border-box; vertical-align: middle;" /></a></div>

<div class="col company-details" style="box-sizing: border-box; position: relative; width: 884px; min-height: 1px; padding-right: 15px; padding-left: 15px; flex-basis: 0px; flex-grow: 1; max-width: 100%; text-align: right;">
<h2 class="name" style="box-sizing: border-box; margin-top: 0px; margin-bottom: 0px; font-family: inherit; color: inherit; font-size: 2rem;"><a href="https://lobianijs.com/" style="box-sizing: border-box; color: rgb(0, 123, 255); text-decoration-line: none; background-color: transparent;" target="_blank">Arboshiki</a></h2>

<div style="box-sizing: border-box;">455 Foggy Heights, AZ 85004, US</div>

<div style="box-sizing: border-box;">(123) 456-789</div>

<div style="box-sizing: border-box;">company@example.com</div>
</div>
</div>
</header>

<p>&nbsp;</p>

<div class="row contacts" style="box-sizing: border-box; display: flex; flex-wrap: wrap; margin-right: -15px; margin-left: -15px; margin-bottom: 20px;">
<div class="col invoice-to" style="box-sizing: border-box; position: relative; width: 884px; min-height: 1px; padding-right: 15px; padding-left: 15px; flex-basis: 0px; flex-grow: 1; max-width: 100%;">
<div class="text-gray-light" style="box-sizing: border-box;">INVOICE TO:</div>

<h2 class="to" style="box-sizing: border-box; margin-top: 0px; margin-bottom: 0px; font-family: inherit; color: inherit; font-size: 2rem;">John Doe</h2>

<div class="address" style="box-sizing: border-box;">796 Silver Harbour, TX 79273, US</div>

<div class="email" style="box-sizing: border-box;"><a href="mailto:john@example.com" style="box-sizing: border-box; color: rgb(0, 123, 255); text-decoration-line: none; background-color: transparent;">john@example.com</a></div>
</div>

<div class="col invoice-details" style="box-sizing: border-box; position: relative; width: 884px; min-height: 1px; padding-right: 15px; padding-left: 15px; flex-basis: 0px; flex-grow: 1; max-width: 100%; text-align: right;">
<h1 class="invoice-id" style="box-sizing: border-box; margin-top: 0px; margin-bottom: 0.5rem; font-family: inherit; color: rgb(57, 137, 198); font-size: 2.5rem;">INVOICE 3-2-1</h1>

<div class="date" style="box-sizing: border-box;">Date of Invoice: 01/10/2018</div>

<div class="date" style="box-sizing: border-box;">Due Date: 30/10/2018</div>
</div>
</div>

<table border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; width: 1738px; border-spacing: 0px; margin-bottom: 20px;">
	<thead style="box-sizing: border-box;">
		<tr style="box-sizing: border-box;">
			<th style="box-sizing: border-box; text-align: inherit; padding: 15px; background: rgb(238, 238, 238); border-bottom: 1px solid rgb(255, 255, 255); white-space: nowrap; font-weight: 400;">#</th>
			<th class="text-left" style="box-sizing: border-box; padding: 15px; background: rgb(238, 238, 238); border-bottom: 1px solid rgb(255, 255, 255); white-space: nowrap; font-weight: 400; text-align: left !important;">DESCRIPTION</th>
			<th class="text-right" style="box-sizing: border-box; padding: 15px; background: rgb(238, 238, 238); border-bottom: 1px solid rgb(255, 255, 255); white-space: nowrap; font-weight: 400; text-align: right !important;">HOUR PRICE</th>
			<th class="text-right" style="box-sizing: border-box; padding: 15px; background: rgb(238, 238, 238); border-bottom: 1px solid rgb(255, 255, 255); white-space: nowrap; font-weight: 400; text-align: right !important;">HOURS</th>
			<th class="text-right" style="box-sizing: border-box; padding: 15px; background: rgb(238, 238, 238); border-bottom: 1px solid rgb(255, 255, 255); white-space: nowrap; font-weight: 400; text-align: right !important;">TOTAL</th>
		</tr>
	</thead>
	<tbody style="box-sizing: border-box;">
		<tr style="box-sizing: border-box;">
			<td class="no" style="box-sizing: border-box; padding: 15px; background: rgb(57, 137, 198); border-bottom: 1px solid rgb(255, 255, 255); color: rgb(255, 255, 255); font-size: 1.6em;">04</td>
			<td class="text-left" style="box-sizing: border-box; padding: 15px; background: rgb(238, 238, 238); border-bottom: 1px solid rgb(255, 255, 255);">
			<h3 style="box-sizing: border-box; margin: 0px; font-family: inherit; color: rgb(57, 137, 198); font-size: 1.2em;"><a href="https://www.youtube.com/channel/UC_UMEcP_kF0z4E6KbxCpV1w" style="box-sizing: border-box; color: rgb(0, 123, 255); text-decoration-line: none; background-color: transparent;" target="_blank">Youtube channel</a></h3>
			<a href="https://www.youtube.com/channel/UC_UMEcP_kF0z4E6KbxCpV1w" style="box-sizing: border-box; color: rgb(0, 123, 255); text-decoration-line: none; background-color: transparent;" target="_blank">Useful videos&nbsp;</a>to improve your Javascript skills. Subscribe and stay tuned :)</td>
			<td class="unit" style="box-sizing: border-box; padding: 15px; background: rgb(221, 221, 221); border-bottom: 1px solid rgb(255, 255, 255); text-align: right; font-size: 1.2em;">$0.00</td>
			<td class="qty" style="box-sizing: border-box; padding: 15px; background: rgb(238, 238, 238); border-bottom: 1px solid rgb(255, 255, 255); text-align: right; font-size: 1.2em;">100</td>
			<td class="total" style="box-sizing: border-box; padding: 15px; background: rgb(57, 137, 198); border-bottom: 1px solid rgb(255, 255, 255); text-align: right; font-size: 1.2em; color: rgb(255, 255, 255);">$0.00</td>
		</tr>
		<tr style="box-sizing: border-box;">
			<td class="no" style="box-sizing: border-box; padding: 15px; background: rgb(57, 137, 198); border-bottom: 1px solid rgb(255, 255, 255); color: rgb(255, 255, 255); font-size: 1.6em;">01</td>
			<td class="text-left" style="box-sizing: border-box; padding: 15px; background: rgb(238, 238, 238); border-bottom: 1px solid rgb(255, 255, 255);">
			<h3 style="box-sizing: border-box; margin: 0px; font-family: inherit; color: rgb(57, 137, 198); font-size: 1.2em;">Website Design</h3>
			Creating a recognizable design solution based on the company's existing visual identity</td>
			<td class="unit" style="box-sizing: border-box; padding: 15px; background: rgb(221, 221, 221); border-bottom: 1px solid rgb(255, 255, 255); text-align: right; font-size: 1.2em;">$40.00</td>
			<td class="qty" style="box-sizing: border-box; padding: 15px; background: rgb(238, 238, 238); border-bottom: 1px solid rgb(255, 255, 255); text-align: right; font-size: 1.2em;">30</td>
			<td class="total" style="box-sizing: border-box; padding: 15px; background: rgb(57, 137, 198); border-bottom: 1px solid rgb(255, 255, 255); text-align: right; font-size: 1.2em; color: rgb(255, 255, 255);">$1,200.00</td>
		</tr>
		<tr style="box-sizing: border-box;">
			<td class="no" style="box-sizing: border-box; padding: 15px; background: rgb(57, 137, 198); border-bottom: 1px solid rgb(255, 255, 255); color: rgb(255, 255, 255); font-size: 1.6em;">02</td>
			<td class="text-left" style="box-sizing: border-box; padding: 15px; background: rgb(238, 238, 238); border-bottom: 1px solid rgb(255, 255, 255);">
			<h3 style="box-sizing: border-box; margin: 0px; font-family: inherit; color: rgb(57, 137, 198); font-size: 1.2em;">Website Development</h3>
			Developing a Content Management System-based Website</td>
			<td class="unit" style="box-sizing: border-box; padding: 15px; background: rgb(221, 221, 221); border-bottom: 1px solid rgb(255, 255, 255); text-align: right; font-size: 1.2em;">$40.00</td>
			<td class="qty" style="box-sizing: border-box; padding: 15px; background: rgb(238, 238, 238); border-bottom: 1px solid rgb(255, 255, 255); text-align: right; font-size: 1.2em;">80</td>
			<td class="total" style="box-sizing: border-box; padding: 15px; background: rgb(57, 137, 198); border-bottom: 1px solid rgb(255, 255, 255); text-align: right; font-size: 1.2em; color: rgb(255, 255, 255);">$3,200.00</td>
		</tr>
		<tr style="box-sizing: border-box;">
			<td class="no" style="box-sizing: border-box; padding: 15px; background: rgb(57, 137, 198); border: none; color: rgb(255, 255, 255); font-size: 1.6em;">03</td>
			<td class="text-left" style="box-sizing: border-box; padding: 15px; background: rgb(238, 238, 238); border: none;">
			<h3 style="box-sizing: border-box; margin: 0px; font-family: inherit; color: rgb(57, 137, 198); font-size: 1.2em;">Search Engines Optimization</h3>
			Optimize the site for search engines (SEO)</td>
			<td class="unit" style="box-sizing: border-box; padding: 15px; background: rgb(221, 221, 221); border: none; text-align: right; font-size: 1.2em;">$40.00</td>
			<td class="qty" style="box-sizing: border-box; padding: 15px; background: rgb(238, 238, 238); border: none; text-align: right; font-size: 1.2em;">20</td>
			<td class="total" style="box-sizing: border-box; padding: 15px; background: rgb(57, 137, 198); border: none; text-align: right; font-size: 1.2em; color: rgb(255, 255, 255);">$800.00</td>
		</tr>
	</tbody>
	<tfoot style="box-sizing: border-box;">
		<tr style="box-sizing: border-box;">
			<td colspan="2" style="box-sizing: border-box; padding: 10px 20px; background: 0px 0px; border: none; white-space: nowrap; text-align: right; font-size: 1.2em;">&nbsp;</td>
			<td colspan="2" style="box-sizing: border-box; padding: 10px 20px; background: 0px 0px; border-bottom: none; white-space: nowrap; text-align: right; font-size: 1.2em; border-top: none;">SUBTOTAL</td>
			<td style="box-sizing: border-box; padding: 10px 20px; background: 0px 0px; border-bottom: none; white-space: nowrap; text-align: right; font-size: 1.2em; border-top: none;">$5,200.00</td>
		</tr>
		<tr style="box-sizing: border-box;">
			<td colspan="2" style="box-sizing: border-box; padding: 10px 20px; background: 0px 0px; border: none; white-space: nowrap; text-align: right; font-size: 1.2em;">&nbsp;</td>
			<td colspan="2" style="box-sizing: border-box; padding: 10px 20px; background: 0px 0px; border-bottom: none; white-space: nowrap; text-align: right; font-size: 1.2em; border-top: 1px solid rgb(170, 170, 170);">TAX 25%</td>
			<td style="box-sizing: border-box; padding: 10px 20px; background: 0px 0px; border-bottom: none; white-space: nowrap; text-align: right; font-size: 1.2em; border-top: 1px solid rgb(170, 170, 170);">$1,300.00</td>
		</tr>
		<tr style="box-sizing: border-box;">
			<td colspan="2" style="box-sizing: border-box; padding: 10px 20px; background: 0px 0px; border: none; white-space: nowrap; text-align: right; font-size: 1.4em; color: rgb(57, 137, 198);">&nbsp;</td>
			<td colspan="2" style="box-sizing: border-box; padding: 10px 20px; background: 0px 0px; border-bottom: none; white-space: nowrap; text-align: right; font-size: 1.4em; border-top: 1px solid rgb(57, 137, 198); color: rgb(57, 137, 198);">GRAND TOTAL</td>
			<td style="box-sizing: border-box; padding: 10px 20px; background: 0px 0px; border-bottom: none; white-space: nowrap; text-align: right; font-size: 1.4em; border-top: 1px solid rgb(57, 137, 198); color: rgb(57, 137, 198);">$6,500.00</td>
		</tr>
	</tfoot>
</table>

<div class="thanks" style="box-sizing: border-box; margin-top: -100px; font-size: 2em; margin-bottom: 50px;">Thank you!</div>

<div class="notices" style="box-sizing: border-box; padding-left: 6px; border-left: 6px solid rgb(57, 137, 198);">
<div style="box-sizing: border-box;">NOTICE:</div>

<div class="notice" style="box-sizing: border-box; font-size: 1.2em;">A finance charge of 1.5% will be made on unpaid balances after 30 days.</div>
</div>

<footer style="box-sizing: border-box; width: 1738px; text-align: center; color: rgb(119, 119, 119); border-top: 1px solid rgb(170, 170, 170); padding: 8px 0px; font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; font-size: 16px;">Invoice was created on a computer and is valid without the signature and seal.</footer>

  `)} */}
      <table
        style={{
          width: "450px",
          color: "#000",
          fontSize: "8px",
          borderCollapse: "collapse",
        }}
      >
        <tbody>
          <tr style={{ background: "rgb(221, 221, 221)" }}>
            <td style={{ border: "1px solid rgb(221, 221, 221)", padding: 5 }}>
              Alfreds Futterkiste
            </td>
            <td style={{ border: "1px solid rgb(221, 221, 221)", padding: 5 }}>
              Maria Anders
            </td>
            <td style={{ border: "1px solid rgb(221, 221, 221)", padding: 5 }}>
              Germany
            </td>
          </tr>
          <tr>
            <td style={{ border: "1px solid rgb(221, 221, 221)", padding: 5 }}>
              Centro comercial Moctezuma
            </td>
            <td style={{ border: "1px solid rgb(221, 221, 221)", padding: 5 }}>
              Francisco Chang
            </td>
            <td style={{ border: "1px solid rgb(221, 221, 221)", padding: 5 }}>
              Mexico
            </td>
          </tr>
          <tr style={{ background: "rgb(221, 221, 221)" }}>
            <td style={{ border: "1px solid rgb(221, 221, 221)", padding: 5 }}>
              Ernst Handel
            </td>
            <td style={{ border: "1px solid rgb(221, 221, 221)", padding: 5 }}>
              Roland Mendel
            </td>
            <td style={{ border: "1px solid rgb(221, 221, 221)", padding: 5 }}>
              Austria
            </td>
          </tr>
          <tr>
            <td style={{ border: "1px solid rgb(221, 221, 221)", padding: 5 }}>
              Island Trading
            </td>
            <td style={{ border: "1px solid rgb(221, 221, 221)", padding: 5 }}>
              Helen Bennett
            </td>
            <td style={{ border: "1px solid rgb(221, 221, 221)", padding: 5 }}>
              UK
            </td>
          </tr>
          <tr style={{ background: "rgb(221, 221, 221)" }}>
            <td style={{ border: "1px solid rgb(221, 221, 221)", padding: 5 }}>
              Laughing Bacchus Winecellars
            </td>
            <td style={{ border: "1px solid rgb(221, 221, 221)", padding: 5 }}>
              Yoshi Tannamuri
            </td>
            <td style={{ border: "1px solid rgb(221, 221, 221)", padding: 5 }}>
              Canada
            </td>
          </tr>
          <tr>
            <td style={{ border: "1px solid rgb(221, 221, 221)", padding: 5 }}>
              Magazzini Alimentari Riuniti
            </td>
            <td style={{ border: "1px solid rgb(221, 221, 221)", padding: 5 }}>
              Giovanni Rovelli
            </td>
            <td style={{ border: "1px solid rgb(221, 221, 221)", padding: 5 }}>
              Italy
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default QuoteTemplate;
