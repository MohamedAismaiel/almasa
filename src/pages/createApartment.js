import { useContext } from "react";
import { LoginContext } from "../components/context/loginContext";
import CreateAppartmentForm from "../components/createApartmentForm/createApartmentForm";

function CreateAppartment(props) {
  const serErrorctx = useContext(LoginContext).setErrorhandler;
  const token = useContext(LoginContext).token;
  const setApartments = useContext(LoginContext).setApartmentsHandler;

  const createPostHandler = (
    event,
    {
      enteredType,
      enteredRentOrSale,
      enteredIsAvaliable,
      enteredPrice,
      enteredLocation,
      enteredSpace,
      enteredRooms,
      enteredBathrooms,
      enteredDescription,
      enteredFinishing,
      image,
      paymentType,
      deliveryDate,
      mainHeader,
      spaceUnit,
      amenities,
      refrenceName,
      // coordinates,
    }
  ) => {
    // imageUrl:"${image}"
    event.preventDefault();
    const formData = new FormData();

    for (let i = 0; i < image.length; i++) {
      formData.append("image", image[i]);
    }
    fetch("http://localhost:8080/post-image", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token, // u tepically use Bearer with Json tokens
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        const photos = JSON.stringify(data.images);
        const amenitiess = JSON.stringify(amenities);
        const location = JSON.stringify(enteredLocation);
        // const coordinatess = JSON.stringify(coordinates);
        const graphqlQuery = {
          query: `mutation CreateNewAppartment($type:String!,$rentOrSale:String!,$isAvaliable:String! $price:Int!,$location:String!,$space:Int!,$rooms:Int!,$bathrooms:Int!,$description:String!,$finishing:String!,$photos:String!,$paymentType:String!,$deliveryDate:String!,$mainHeader:String!,$spaceUnit:String!,$amenities:String,$refrenceName:String! ,) 
          {
            createAppartment(apartmentInput:{type:$type rentOrSale:$rentOrSale isAvaliable:$isAvaliable price:$price location:$location space:$space rooms: $rooms bathrooms:$bathrooms description:$description finishing:$finishing photos:$photos paymentType:$paymentType deliveryDate:$deliveryDate mainHeader:$mainHeader spaceUnit:$spaceUnit amenities:$amenities refrenceName:$refrenceName }  )
            
            { _id
              type
              rentOrSale
              isAvaliable
              price
              creator{name}
              location {
                city
              }
              space
              rooms
              description
              finishing
              bathrooms
              photos {
                location
                isLanding
                id
              }
              spaceUnit
              paymentType
              deliveryDate
              amenities
              refrenceName
              createdAt
              updatedAt}
          } `,
          variables: {
            type: enteredType,
            rentOrSale: enteredRentOrSale,
            isAvaliable: enteredIsAvaliable,
            price: +enteredPrice,
            location: location,
            space: +enteredSpace,
            rooms: +enteredRooms,
            bathrooms: +enteredBathrooms,
            description: enteredDescription,
            finishing: enteredFinishing,
            photos: photos,
            paymentType: paymentType,
            deliveryDate: deliveryDate,
            mainHeader: mainHeader,
            spaceUnit: spaceUnit,
            amenities: amenitiess,
            refrenceName: refrenceName,
            // coordinates: coordinatess,
          },
        };

        return fetch("http://localhost:8080/graphql", {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
            "Content-type": "application/json",
          },
          body: JSON.stringify(graphqlQuery),
        });
      })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        if (resData.errors && resData.errors[0].status === 422) {
          serErrorctx(resData.errors[0]);
          throw new Error("Apartment creation failed,check inputs");
        }
        if (resData.errors) {
          serErrorctx(resData.errors[0]);
          throw new Error("Apartment creation failed");
        }
        setApartments(resData.data.createAppartment, true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return <CreateAppartmentForm createPostHandler={createPostHandler} />;
}
export default CreateAppartment;
