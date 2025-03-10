import Pagination from "./components/Pagination";


export default function Home() {
  return (
    <div>
      <Pagination itemCount={100} currentPage={2} pageSize={10}/>
    </div>
  );
}
