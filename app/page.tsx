import Pagination from "./components/Pagination";


export default function Home( {searchParams} : {searchParams : {page : string}}) {
  return (
    <div>
      <Pagination itemCount={100} currentPage={parseInt(searchParams.page)} pageSize={10}/>
    </div>
  );
}
