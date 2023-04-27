// // // import BottomNav from '../components/BottomNav';
// // // import Loading from '../components/Loading';
// // // import NavBar from '../components/NavBar';
// // // import Notification from '../components/Notification';
// // // import Room from '../components/rooms/Room';
// // import axios from "axios";
// // import { useEffectse,u } from "react";
// // const Home = () => {
// //   const [data, setData]=useState([])
// //   useEffect(()=>{
// //     axios.get('http://localhost:5000/godowns')
// //     .then(res=>setData(res.data))
// //     .catch(err=> console.log(err))
// //   }, [])

// //   return (
// //     <>
// // <div className="container mt-5">
// //   <table classname="table">
// //     <thead>
// //       <tr>
// //         <th>
// //         id
// //         </th>
// //         <th>
// //           location
// //         </th>
// //         <th>capacity_in_quintals</th>
// //         <th>manager_id</th>
        
// //       </tr>
// //     </thead>
// //     <tbody>
// //       {data.map((d,i)=>{
// //         <tr key={i}>
// //           <td>
// //             {d.id}

// //           </td>
// //           <td>
// //             {d.location}
            
// //           </td>
// //           <td>
// //             {d.capacity_in_quintals}
            
// //           </td>
// //           <td>
// //             {d.manager_id}
            
// //           </td>
// //         </tr>
// //       })}
// //     </tbody>
// //   </table>
// // </div>
// //     </>
// //   );
// // };

// // export default Home;
// import React from "react";
// // import { RiProductHuntLine } from "react-icons/ri";
// import { Link } from "react-router-dom";
// import "./Home.css";
// // import heroImg from "../../assets/inv-img.png";
// // import { ShowOnLogin, ShowOnLogout } from "../../components/protect/HiddenLink";

// const Home = () => {
//   return (
//     <div className="home">
//       <nav className="container --flex-between ">
//         <div className="logo">
//           <RiProductHuntLine size={35} />
//         </div>

//         <ul className="home-links">
//           <ShowOnLogout>
//             <li>
//               <Link to="/register">Register</Link>
//             </li>
//           </ShowOnLogout>
//           <ShowOnLogout>
//             <li>
//               <button className="--btn --btn-primary">
//                 <Link to="/login">Login</Link>
//               </button>
//             </li>
//           </ShowOnLogout>
//           <ShowOnLogin>
//             <li>
//               <button className="--btn --btn-primary">
//                 <Link to="/dashboard">Dashboard</Link>
//               </button>
//             </li>
//           </ShowOnLogin>
//         </ul>
//       </nav>
//       {/* HERO SECTION */}
//       <section className="container hero">
//         <div className="hero-text">
//           <h2>Inventory {"&"} Stock Management Solution</h2>
//           <p>
//             Inventory system to control and manage proucts in the warehouse in
//             real timeand integrated to make it easier to develop your business.
//           </p>
//           <div className="hero-buttons">
//             <button className="--btn --btn-secondary">
//               <Link to="/dashboard">Free Trial 1 Month</Link>
//             </button>
//           </div>
//           <div className="--flex-start">
//             <NumberText num="14K" text="Brand Owners" />
//             <NumberText num="23K" text="Active Users" />
//             <NumberText num="500+" text="Partners" />
//           </div>
//         </div>

//         <div className="hero-image">
//           <img src={heroImg} alt="Inventory" />
//         </div>
//       </section>
//     </div>
//   );
// };

// const NumberText = ({ num, text }) => {
//   return (
//     <div className="--mr">
//       <h3 className="--color-white">{num}</h3>
//       <p className="--color-white">{text}</p>
//     </div>
//   );
// };

// export default Home;