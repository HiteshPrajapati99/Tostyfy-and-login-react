import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import { Stack, Pagination } from "@mui/material";

export default function Paginationdata() {
  const [userData, setUserData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getdata();
  }, [page]);

  function getdata() {
    // default url

    // const url = "https://jsonplaceholder.typicode.com/posts";

    // pagination url
    const url = `https://jsonplaceholder.typicode.com/posts?_page=${page}`;
    axios.get(url).then((res) => {
      // console.log(res.data);
      setUserData(res.data);
    });
  }

  return (
    <>
      <div className=" container  table-responsive-lg mt-5 pt-1 pb-5 table  table-responsive-sm  table-responsive-md">
        <Table bordered striped hover>
          <thead>
            <tr>
              <th>id</th>
              <th> Name</th>
              <th> phone</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((curElm, id) => {
              return (
                <tr key={curElm.id}>
                  <td> {curElm.id} </td>
                  <td> {curElm.body} </td>
                  <td> {curElm.title} </td>
                </tr>
              );
            })}
          </tbody>
        </Table>

        <div style={{ float: "right" }}>
          <Stack spacing={1}>
            <Pagination
              count={10}
              showFirstButton={true}
              color={"primary"}
              onChange={(event, value) => {
                setPage(value);
              }}
            />
          </Stack>
        </div>
      </div>
    </>
  );
}
