process.on('unhandledRejection', function (reason, promise) {
  console.log('==========\n\n', reason, '\n\n==========')
  console.log('==========\n\n', promise, '\n\n==========')
})

import db from '../server/db'
const { Product, Category, Order, LineItem, User, Review } = db.models
import app from '../server'

import fs from 'fs-extra'
import chai from 'chai'
import chaiProperties from 'chai-properties'
import chaiThings from 'chai-things'
chai.use(chaiProperties)
chai.use(chaiThings)
const expect = chai.expect
import supertest from 'supertest'
import sinon from 'sinon'

describe('==== Backend Tests ====', () => {
  beforeEach('Synchronize and clear database', () => db.sync())

  after('Synchronize and clear database', () => db.sync())

  describe('Sequelize Models', function () {
    describe('Product Model', () => {
      describe('definition', () => {
        it('must have title, description, price, and inventory quantity', () => {
          expect(Product.attributes.title).to.be.an('object')
          expect(Product.attributes.description).to.be.an('object')
          expect(Product.attributes.price).to.be.an('object')
          expect(Product.attributes.inventory).to.be.an('object')
          expect(Product.attributes.imgUrls).to.be.an('object')
        })
      })

      describe('validations', () => {
        it('must belong to at least one category', () => {
          const product = Product.build({ title: 'foo' })
          return product.validate()
            .then(() => { throw new Error('Promise should have rejected.') })
            .catch(err => {
              expect(err).to.exist
              expect(err).to.be.an('error')
              expect(err.errors).to.contain.a.thing.with.properties({
                path: 'categoryId',
                type: 'notNull Violation'
              })
            })
        })
        it('must create a placeholder photo, if there is no photo', () => {
          expect(null).to.be.ok
        })
      })
    })

    describe('User Model', () => {
      describe('definition', () => {
        it('must have name, password, email, isAdmin', () => {
          expect(User.attributes.name).to.be.an('object')
          expect(User.attributes.password).to.be.an('object')
          expect(User.attributes.email).to.be.an('object')
          expect(User.attributes.isAdmin).to.be.an('object')
        })
      })

      describe('validations', () => {
        it('must have a valid email address', () => {
          expect(null).to.be.ok
        })

        it('must have a unique email address', () => {
          const user1 = User.create({ name: 'foo', email: 'foo@123.com' })
          const user2 = User.build({ name: 'fooz', email: 'foo@123.com' })
          return user2.validate()
            .then(() => { throw new Error('Promise should have rejected.') })
            .catch(err => {
              expect(err).to.exist
              expect(err).to.be.an('error')
              expect(err.errors).to.contain.a.thing.with.properties({
                path: 'email',
                type: 'notNull Violation'
              })
            })
        })
      })
    })

    describe('Order Model', () => {
      describe('association', () => {
        it('must belong to a user, or a guest session', () => {
          expect(null).to.be.ok
        })

        it('must have line items that capture price, product id, and quantity', () => {
          expect(null).to.be.ok
        })
      })

      describe('instance method', () => {
        it('must be able to submit an order with correct info', () => {
          expect(null).to.be.ok
        })
        it('must be able to submit an order for correct user', () => {
          expect(null).to.be.ok
        })
      })

      describe('functionality', () => {
        it('must be able to complete and keep price at the time of order', () => {
          expect(null).to.be.ok
        })
      })
    })

    describe('Review Model', () => {
      describe('association', () => {
        it('must belong to a product', () => {
          expect(null).to.be.ok
        })

        it('must belong to a user', () => {
          expect(null).to.be.ok
        })
      })

      describe('validatoins', () => {
        it('must have at least 40 characters', () => {
          expect(null).to.be.ok
        })
      })
    })
  })

  describe('API Routes', function () {
    describe('Product Route', () => {
      it('placeholder', () => {
        expect(null).to.be.ok
      })
    })

    describe('User Route', () => {
      it('placeholder', () => {
        expect(null).to.be.ok
      })
    })

    describe('Order Route', () => {
      it('placeholder', () => {
        expect(null).to.be.ok
      })
    })

    describe('Review Route', () => {
      it('placeholder', () => {
        expect(null).to.be.ok
      })
    })
  })
})
