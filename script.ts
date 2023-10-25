import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
// const prisma = new PrismaClient({log: ["query"]})  // will log all the queries used, to debug things

// almost everything in prisma is asyn await
async function main() {
  // const user = await prisma.user.create({data: {name : "Dhiraj"}})
  // const users = await prisma.user.findMany({where: {id : {gte: 2}}})
  await prisma.user.deleteMany({});

  // const user = await prisma.user.create({data: {name : "Dhiraj", age: 25, email: "dhiraj@example.com", isAdmin: false, UserPreference: {create: {
  //     emailUpdates: true
  // }}},
  // // include: {
  // //     UserPreference: true
  // // },
  // select: {
  //     name : true,
  //     // UserPreference: true
  //     UserPreference: {select: {id: true }}
  // }})
  // select will return name of user and userPreferences only

  // if we not inlucde userPreference it will only show userPreferenceId
  // we can have a select property as well
  // we can only use select or inlcude at a time

  // CREATE
  const users = await prisma.user.createMany({
    data: [
      { name: "Dhiraj", age: 25, email: "dhiraj@example.com", isAdmin: false },
      {
        name: "Dhiraj2",
        age: 22,
        email: "dhiraj2@example.com",
        isAdmin: false,
      },
    ],
  });
  // NOTE: can't use select and inlcude while createMany

  // READ
  // find's a field which is unique in the table like email (we define it has unique), id, name & age, it findUnique won't work for just name coz it is not unique in the table
  // we can also use select or include
  const user = await prisma.user.findUnique({
    // where: {
    //   email : "dhiraj@example.com", AND

    // },
    where: {
      name_age : {  
        // since we made a uniqueness to name and age in a table
        age: 25,
        name : "Dhiraj"
      }
    },
    // include: {
    //   UserPreference: true
    // }
    select: {
      name: true
    }
  })

  const user2 = await prisma.user.findFirst({
    where: {
      name : "Dhiraj"
    }
  })

  const users2 = await prisma.user.createMany({
    data: [
      { name: "harshal", age: 20, email: "harshal@example.com", isAdmin: false },
      {
        name: "harshal",
        age: 22,
        email: "harshal2@example.com",
        isAdmin: false,
      },
      {
        name: "harshal",
        age: 25,
        email: "harshal3@example.com",
        isAdmin: false,
      },
    ],
  });

  const filterUsers = await prisma.user.findMany({
    where: {
      name: "harshal"
    },
    // distinct: ["name"]      // distincness on name, since name is similar it wil give first field
    // distinct: ["name", "age"]      // distincness on name, since name and age both are distint it will give all the field and distince name and age

    orderBy: {
      age: "desc"
    },
    take: 2,    // first 2 users, for pagination and stuff
    skip : 1,   // skip first and take rest of 2

  })
  // console.log(filterUsers.leng th)
  // console.log(filterUsers)


  const filterUsers2 = await prisma.user.findMany({
    where: {
      // name: {equals: "harshal"}
      // name: {not: "harshal"}
      // name : {in: ["harshal", "dhiraj"]}
      // name : {notIn: ["harshal"]},
      // age: {lt: 23}
      // age : {lte: 22}

      // email: {contains: "@example.com"}
      // email: {endsWith: ".com"}
      // email: {startsWith: "harshal"},

      // AND: [
      //   {email: {startsWith: "harshal"}},
      //   {age: {gte: 22}}
      // ],

      // OR: [
      //   {email: {startsWith: "harshal2"}},
      //   {email: {endsWith: ".com"}}
      // ]

      // NOT: {email: {startsWith: "harshal"}}   // find all email which does not starts with harshal

      // relationship filtering
      writternPosts: {
        // every: {
        //   title: "Test"
        // }
        // none: {
        //   title: "Test",
        // }
        some: {
          title: {startsWith: "Test"}
        }
      }
    }
  })

  const filterUsers3 = await prisma.post.findMany({
    where: {
      author: {
        is: {
          age: {gt: 23}
        },
        isNot: {
          age: {lt: 40}
        }
      },
    },
    take: 10
  })


  // UPDATE
  const updateUser = await prisma.user.update({
    where: {
      // name: "harshal"    // can't use this coz name is not unique
      email: "harshal@example.com"
    },
    data: {
      email: "harsh@example.com",
      age: {increment: 1},
      // age: {decrement: 2, multiply: 4, divide: 5}
    },
    // select
  })

  const updateUsers = await prisma.user.updateMany({
    where : {
      name: "harshal"
    },
    data: {
      name: "HARSH"
    },
    // select 
  })
  // NOTE: can't use select or inlcude while performing updateMany

  // connect existing relationship, 
  // we are connecting userPreference to a User with respect to id
  const preference = await prisma.userPreference.create({
    data: {
      emailUpdates: true
    }
  })

  const user22 = await prisma.user.update({
    where : {
      email: "harshal2@example.com"
    },
    data: {
        UserPreference: {
          connect: {
            id: "a51e91a2-b54b-49e2-9745-45b8c49605c3"
          },
          // disconnect: {
          //   id: "a51e91a2-b54b-49e2-9745-45b8c49605c3"
          // }
        }
      }
    ,
    include: {
      UserPreference: true
    }
  })

  // NOTE: this ability to connect and disconnect is available in create as well,

  // DELETE
  // const delUser = await prisma.user.delete({
  //   where: {
  //     // name: "harshal"    // must be unique
  //     email: "harshal2@example.com"
  //   }
  // })

  // const delUsers = await prisma.user.deleteMany({
  //   where: {
  //     age: {gt: 20}
  //   }
  // })
  // console.log(delUsers)

  // const deleteTable = await prisma.user.deleteMany({})

  // console.log(delUser)
 
}
main()
  .catch((e) => {
    console.log(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });



/*
Include
Fetches all scalar fields and any specified relations. You can use include to explicitly include relations, such as a user's posts or profile. You can also nest select inside an include.

Select
Allows you to return specific fields. You can also use a nested select to include relation fields.

*/