export const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
      crossorigin="anonymous"
    />
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
      crossorigin="anonymous"
    ></script>
    <style>
      h6 {
        font-size: small;
        font-weight: bold;
        color: #777;
      }
      span{
          font-size: smaller;
      }
    </style>
  </head>
  <body>
    <div class="container my-5">
      <div class="row mx-1">
        <div class="col-4 m-auto">
          <h6>ORDER ID</h6>
        </div>
        <div class="col-4 m-auto"><h6>ORDERED ON</h6></div>
        <div class="col-4 m-auto" style="text-align: right;"><h6>STATUS</h6></div>
      </div>
      <div class="row mx-1">
        <div class="col-6 m-auto">
          <h6>USER ID</h6>
        </div>
        <div class="col-6 m-auto">
          <h6 style="text-align: right;" >PHONE</h6>
        </div>
      </div>
      <div class="row mx-1">
        <div class="col-4 m-auto">
          <h6>EMAIL</h6>
        </div>
        <div class="col-8 m-auto"></div>
      </div>
      <div class="row mx-1">
        <div class="col-4 m-auto">
          <h6>DELIVER TO</h6>
        </div>
        <div class="col-8 m-auto">
          <address></address>
        </div>
      </div>
      <div class="row mx-1 mt-2">
        <div class="col-4 m-auto">
          <h6>PLAN</h6>
        </div>
        <div class="col-4 m-auto">
          <h6>START DATE</h6>
        </div>
        <div class="col-4 m-auto">
          <h6 style="text-align: right;">END DATE</h6>
        </div>
      </div>
      <div class="row mx-1">
        <div class="col-4 m-auto">
          <h6>PRICE</h6>
        </div>
        <div class="col-4 m-auto">
          <h6>DISCOUNT</h6>
        </div>
        <div class="col-4 m-auto">
          <h6 style="text-align: right;">TOTAL</h6>
        </div>
      </div>
      <div class="row mx-1 my-4">
        <div class="col-12">
          <h6>Notes:</h6>
        </div>
      </div>
      <div class="row mx-2">
        <table class="table table-sm">
          <thead>
            <tr>
              <th scope="col" colspan="3"></th>
              <th scope="col" colspan="1">
                <h6 style="text-align: right;">Total: $</h6>
              </th>
            </tr>
          </thead>
          <thead>
            <tr>
              <th scope="col">
                <h6>#</h6>
              </th>
              <th scope="col">
                <h6>ADD ON</h6>
              </th>
              <th scope="col">
                <h6>ORDERED ON</h6>
              </th>
              <th scope="col">
                <h6 style="text-align: right;">PRICE</h6>
              </th>
            </tr>
          </thead>
          <tbody id="add-on-row">
            <tr>
              <th scope="row">
                <span>1</span></span>
              </th>
              <td>
                <span>Green Salad</span>
              </td>
              <td>
                <span>19-Mar-2022</span>
              </td>
              <td style="text-align: right;">
                <span>$3.15</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <script>
        const table=document.getElementById("add-on-row")
        let i=1
        function loadTableData(items) {
            items.forEach(element => {
                let row=table.insertRow()
                let sl=row.insertCell(0)
                sl.innerHTML=i
                let name=row.insertCell(1)
                name.innerHTML=element.add_on
                let orderDate=row.insertCell(2)
                orderDate.innerHTML=element.ordered_on
                let price=row.insertCell(3)
                price.innerHTML=element.price
                i+=1
            });
        }
        loadTableData([{add_on:"a",ordered_on:2,price:4}])
    </script>
  </body>
</html>
`