import React, { useState, useEffect } from "react";
import imgPorto from "../../assets/slide2.jpg";
import axios from "axios";
import { Link } from "react-router-dom";

const ProfileDetail = () => {
  const [profiles, setProfiles] = useState([]);
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get("/api/get-profile");
        setProfiles(response.data);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };
    fetchProfiles();
  }, []);

  const pastorProfiles = profiles.filter((profile) =>
    profile.jabatan.toLowerCase().includes("pastor")
  );
  const otherProfiles = profiles.filter(
    (profile) => !profile.jabatan.toLowerCase().includes("pastor")
  );

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="flex flex-col justify-center bg-gray-200 w-full md:flex-row rounded-lg text-left hover:shadow-xl transition duration-300 ease-in-out">
          <div className="w-full md:w-1/2">
            <img
              className="w-full h-auto object-cover"
              src={imgPorto}
              alt="Sunset in the mountains"
              style={{ background: "#fff" }}
            />
          </div>
          <div className="w-full md:w-1/2 p-4">
            <h1 className="font-semibold text-center md:text-left text-4xl mb-2">
              Profile Gereja
            </h1>
            {profiles.map((profile) => (
              <p
                key={profile._id}
                className="font-light text-sm text-center md:text-left mb-2"
              >
                {profile.sejarah}
              </p>
            ))}
          </div>
        </div>
      </div>
      <h1 className="text-center pt-4 text-4xl text-semibold">
        Daftar Romo Gereja St.Mikael Semarang Indah
      </h1>

      {/* Display pastor profiles in a 4x4 grid */}
      <div className="flex flex-wrap justify-center items-center mt-4">
        {pastorProfiles.map((pastorProfile) => (
          <div
            key={pastorProfile._id}
            className="bg-gray-200 mx-2 my-2 w-[200px] h-[200px] rounded-full object-cover p-3"
          >
            <Link to={`/profile/${pastorProfile._id}`}>
              <img
                className="w-full h-full rounded-full object-cover"
                src={`http://stmikaelsemarangindah.site/profile/${pastorProfile.profile}`}
                alt={pastorProfile.nama}
              />
              <div className="isi mt-2 text-center">
                <h2 className="font-bold">{pastorProfile.nama}</h2>
                <h2>{pastorProfile.jabatan}</h2>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="kontent flex justify-center items-center pt-32 gap-4 flex-wrap">
        <h1 className="text-center pt-4 text-4xl text-semibold">
          Daftar Dewan Gereja St.Mikael Semarang Indah
        </h1>
        <div className="w-full flex flex-wrap mt-4">
          {otherProfiles.map((profile) => (
            <Link
              key={profile._id}
              to={`/profile/${profile._id}`}
              className="flex flex-col items-center mb-4 w-full md:w-1/4"
            >
              <button className="gambar rounded-full hover:shadow-xl transition duration-300 ease-in-out relative">
                <img
                  className="bg-gray-200 w-[200px] h-[200px] rounded-full object-cover p-3"
                  src={`http://stmikaelsemarangindah.site/profile/${profile.profile}`}
                  alt=""
                />
              </button>
              <div className="isi mt-2 text-center">
                <h2 className="font-bold">{profile.nama}</h2>
                <h2>{profile.jabatan}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProfileDetail;
