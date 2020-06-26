import {PrismaClient} from '@prisma/client'

export default async (req, res) => {
  const Prisma = new PrismaClient({log: ['query']})
  const {email} = req.body

  try {
    const user = await Prisma.user.findOne({
      where: {
        email,
      },
    })

    res.json({emailExists: !!user})
  } catch (error) {
    res.status(500)
    res.json({error: 'Unable to check email availability'})
  } finally {
    await Prisma.disconnect()
  }
}
