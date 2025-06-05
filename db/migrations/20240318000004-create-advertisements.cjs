"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Advertisements", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      telegramUsername: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      regionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Regions",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      brandId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Brands",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      modelId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "CarModels",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      engineType: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      driveType: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      transmission: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      mileage: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      horsePower: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      video: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      price: {
        type: Sequelize.DECIMAL(12, 0),
        allowNull: false,
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      autotekaLink: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      photos: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: [],
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      isOnHold: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      hideReason: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      channelMessageId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    await queryInterface.addIndex("Advertisements", ["userId"]);
    await queryInterface.addIndex("Advertisements", ["regionId"]);
    await queryInterface.addIndex("Advertisements", ["brandId"]);
    await queryInterface.addIndex("Advertisements", ["modelId"]);
    await queryInterface.addIndex("Advertisements", ["isActive"]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Advertisements");
  },
};
