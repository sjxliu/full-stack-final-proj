export const userQuery = (userId) => {
  const query = `*[_type = "user" && _id =='${userId}' ]`;

  return query;
};

export const feedQuery = `*[_type == "pin"] | order(_createdAt desc) {
  image{
    asset->{
      url
    }
  },
      _id,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        _key,
        postedBy->{
          _id,
          userName,
          image
        },
      },
    } `;
    
export const searchQuery = (searchTerm) => {
  const query = `*[_type == "pin" && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*']{
        image{
          asset->{
            url
          }
        },
            _id,
            destination,
            postedBy->{
              _id,
              userName,
              image
            },
            save[]{
              _key,
              postedBy->{
                _id,
                userName,
                image
              },
            },
          }`;
  return query;
};

export const pinDetailQuery = (pinId) => {
  const query = `*[_type == "pin" && _id == '${pinId}']{
    image{
      asset->{
        url
      }
    },
    _id,
    title, 
    about,
    category,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
   save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
    comments[]{
      comment,
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    }
  }`;
  return query;
};

export const morePinQuery = (pin) => {
  const query = `*[_type == "pin" && category == '${pin.category}' && _id != '${pin._id}' ]{
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

// Logic: try to get doc of type = to user and _id = to user id

export const categories = [
  {
    name: 'hotplays',
    image: 'https://image.shutterstock.com/image-photo/girl-volleyball-player-setter-setting-600w-1362701879.jpg',
  },
  {
    name: 'fitness',
    image: 'http://randomc.net/image/Haikyuu/Haikyuu%20-%2017%20-%20Large%2006.jpg',
  },
  {
    name: 'games',
    image: 'https://lostinanime.com/wp-content/uploads/2020/12/Haikyuu-4-2-12-05.jpg',
  },
  {
    name: 'food',
    image: 'https://i.pinimg.com/736x/b1/8f/ba/b18fbae5c9dfc4f9b8b5f1c1ef2aae61.jpg',
  },
  {
    name: 'nature',
    image: 'https://i.pinimg.com/236x/b9/82/d4/b982d49a1edd984c4faef745fd1f8479.jpg',
  },
  {
    name: 'laughs',
    image: 'https://vignette.wikia.nocookie.net/haikyuu/images/0/08/Chapter372.jpg/revision/latest?cb=20191111163427',
  }, {
    name: 'travel',
    image: 'https://www.monstersandcritics.com/wp-content/uploads/2019/10/Haikyuu-Manga-Ending-Final-Arc-Chapter-370-Hinata-Beach.jpg',
  },
];
