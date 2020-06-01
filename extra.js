const [profile, setProfile] = useState({});
  const onChangeFirstName = (text) => {
    setProfile({ ...profile, firstname: text });
  };
  const onChangeLastName = (text) => {
    setProfile({ ...profile, lastname: text });
  };
  const getProfile = async () => {
    try {
      const { data } = await axios.get("http://192.168.1.76:5000/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("fhdxdfxhgsfzghbffdvgdfbhbxvdzgfzgxfß√fes");
      setProfile({ ...data.profile });
    } catch (error) {
      console.log(error);
    }
  };
  const saveProfile = async (firstname, lastname) => {
    try {
      const { data } = await axios.post(
        "http://192.168.1.76:5000/profile",
        {
          firstname: firstname,
          lastname: lastname,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("fhdxdfxhgsfzghbffdvgdfbhbxvdzgfzgxfß√fes");
      setProfile({ ...data.profile });
    } catch (error) {
      console.log(error);
    }
  };
