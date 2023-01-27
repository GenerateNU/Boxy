import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/db';

type Listing = {
    id: string,
    price: Number,
    name: string,
    proximity: Number
}

type Message = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Message>
) {
  // GET - get listings and their basic details given filters
  if (req.method === 'GET') {
    return res.status(200).json({message: ""})
  }

  // POST - create new listing
  if (req.method === 'POST') {
    try {
      //extract listing info from request body
      const {name, dates_available, price, description, amenities, space_type, address, city, state, zip_code, space_available} = req.body

      //confirm all fields are entered
      if (!name || !dates_available || !price || !description || !amenities || !space_type || !address || !city || !state || !zip_code || !space_available) {
        return res.status(400).json({ message: 'All fields are required' })
      }


      // Check if the user is logged in
      // (To be added in the future)


      // Create a new listing using Prisma
      const newListing = await prisma.listings.create({
        data: {
          name: name,
          dates_available: dates_available,
          price: price,
          description: description,
          amenities: amenities,
          space_type: space_type,
          address: address,
          city: city,
          state: state,
          zip_code: zip_code,
          space_available: space_available,
          editable: false,
          created_on: new Date()
        },
      })
      return res.status(201).json({message: 'Successful'})
    }
    catch (error){
      return res.status(500).json({ message: String(error) })
    }
    finally {
      await prisma.$disconnect()
    }
  }  

  return res.status(405).send({message: 'method not supported'})
}