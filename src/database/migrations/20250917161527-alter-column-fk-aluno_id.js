module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      'fotos',
      'aluno_id',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'alunos',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable('fotos');
  },
};
