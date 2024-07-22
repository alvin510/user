import BgCover from "../../assets/slide2.jpg";
import BgImage from "../../assets/slide1.jpg";
import { useState, useEffect } from "react";
import { PiChurchLight, PiPersonSimple } from "react-icons/pi";
import { CiClock2 } from "react-icons/ci";
import { MdOutlineCalendarToday } from "react-icons/md";
import { Link } from "react-router-dom";

const Homepage = () => {
  const [pengumuman, setPengumuman] = useState([]);
  const [jadwalMisa, setJadwalMisa] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch pengumuman
        const pengumumanResponse = await fetch("/api/get-pengumuman");
        const pengumumanData = await pengumumanResponse.json();
        setPengumuman(pengumumanData.slice(0, 3));

        // Fetch jadwal misa
        const jadwalMisaResponse = await fetch("/api/get-jadwal");
        const jadwalMisaData = await jadwalMisaResponse.json();
        setJadwalMisa(jadwalMisaData);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="relative">
        <img src={BgCover} alt="Background Cover" className="w-full" />
        <div className="intro lg:absolute lg:top-1/2 lg:left-0 p-4 font-bold text-xl lg:bg-white rounded-lg lg:text-left lg:bg-opacity-70 sm:static">
          <h1 className="font-semibold lg:text-4xl sm:text-lg text-center">
            Gereja Katolik Santo Mikael Semarang Indah
          </h1>
          <p className="font-normal text-center hidden lg:block lg:text-left">
            Selamat Datang di Website Gereja Santo Mikael{" "}
          </p>
        </div>
      </div>

      {/* kontent tengah */}
      <div className="bg-gray-200 lg:flex lg:justify-center">
        <div className="kiri lg:w-[50%] lg:px-6 lg:py-8">
          <img
            src={BgImage}
            className="p-3 w-full rounded-xl"
            alt="Background Image"
          />
        </div>
        <div className="kanan lg:w-[50%] lg:px-6 lg:py-8">
          <h1 className="font-semibold text-2xl lg:text-4xl mb-4 text-center">
            Jadwal Misa Santo Mikael
          </h1>
          <div className="justify-center align-center items-center text-center">
            <div className="text-center mt-10">
              <div className="justify-center align-center text-center">
                <div className="flex items-center justify-center gap-4 mb-2">
                  <MdOutlineCalendarToday />
                  <span className="font-semibold text-2xl">Misa</span>
                </div>
                {/* Tampilkan nama misa dari jadwal misa */}
                {jadwalMisa.map((jadwal, index) => (
                  <span
                    className="text-xl flex justify-center items-center"
                    key={index}
                  >
                    {" "}
                    {jadwal.misa} : {jadwal.hari} : {jadwal.jam}
                  </span>
                ))}
              </div>
              <div className="mt-4">
                <div className="justify-center align-center text-center">
                  <div className="flex items-center justify-center gap-4 mb-2"></div>
                </div>
              </div>
              <div className="mt-4">
                <div className="justify-center align-center text-center">
                  <div className="flex items-center justify-center gap-4">
                    <PiChurchLight />
                    <span className="font-semibold text-2xl">Alamat</span>
                  </div>
                  <span className="text-xl">
                    Perumahan Semarang Indah C2 No.19, Tawangmas, Kec. Semarang
                    Barat, Kota Semarang, Jawa Tengah
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <div className="justify-center align-center text-center">
                  <div className="flex items-center justify-center gap-4">
                    <PiPersonSimple />
                    <span className="font-semibold text-2xl">Romo Paroki</span>
                  </div>
                  <span className="text-xl flex justify-center items-center">
                    Rm.Ignatius Triatmoko, MSF
                  </span>
                  <span className="text-xl flex justify-center items-center">
                    Rm.Johanes Baptis Ibnu Fadjar M., MSF
                  </span>
                  <span className="text-xl flex justify-center items-center">
                    Rm.Aloysius Purwa Hadiwardoyo, MSF
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* kontent bawah */}
      <div className="mt-4">
        <h1 className="flex justify-center text-2xl font-semibold">
          Informasi Gereja
        </h1>
        <h1 className="flex justify-center">Santo Mikael Semarang Indah</h1>
        <div className="p-3 flex justify-center gap-3 shadow-xl bg-gray-200">
          {loading ? (
            <div>Loading...</div>
          ) : (
            pengumuman.map((item, index) => (
              <Link
                key={index}
                to={`/pengumuman/${item._id}`}
                className="max-w-sm rounded overflow-hidden shadow-lg"
              >
                <img
                  src={`http://stmikaelsemarangindah.site/pengumuman/${item.thumbnail}`}
                  className="w-full object-cover h-48"
                  alt=""
                />
                <div className="px-6 py-4 bg-white">
                  <div className="font-bold text-xl mb-2">{item.judul}</div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Homepage;
