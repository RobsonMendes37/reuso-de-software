// RESPOSTA: Sistema de Alerta para Saúde em Wearables 🔗
// Contexto: Wearables, como smartwatches e pulseiras inteligentes, monitoram continuamente sinais vitais, como frequência cardíaca, oxigenação do sangue e níveis de estresse. Quando os valores monitorados ultrapassam os limites seguros, é necessário notificar serviços médicos, emergências, ou o próprio usuário para que ações possam ser tomadas rapidamente.
//
// Problema: Não queremos acoplar os sensores dos wearables aos sistemas que consomem esses dados (usuários, médicos, ou serviços de emergência). Isso porque esses sistemas podem variar conforme a aplicação. Por exemplo, um wearable pode começar enviando notificações apenas ao usuário, mas, futuramente, poderá incluir integrações com serviços de saúde ou até plataformas de análise de dados em nuvem. Queremos uma arquitetura flexível, onde seja possível adicionar ou remover observadores facilmente, sem modificar o código principal.
//
// Solução: Utilizamos o padrão Observer, que permite criar uma relação de um-para-muitos entre o wearable (sujeito) e os sistemas que precisam reagir aos dados (observadores). Assim, quando o wearable detecta uma mudança crítica no estado dos sinais vitais, ele notifica automaticamente todos os observadores registrados.




import java.util.ArrayList;
import java.util.List;

// Interface Observer
interface Observer {
    void update(Wearable subject);
}

// Classe Sujeito (Subject)
class Wearable {
    private List<Observer> observers = new ArrayList<>();
    private int heartRate;

    // Método para adicionar um observador
    public void attach(Observer observer) {
        observers.add(observer);
    }

    // Método para remover um observador
    public void detach(Observer observer) {
        observers.remove(observer);
    }

    // Notifica todos os observadores
    public void notifyObservers() {
        for (Observer observer : observers) {
            observer.update(this);
        }
    }

    // Getter para frequência cardíaca
    public int getHeartRate() {
        return heartRate;
    }

    // Setter para frequência cardíaca
    public void setHeartRate(int heartRate) {
        this.heartRate = heartRate;
        notifyObservers(); // Notifica quando há alteração
    }
}

// Classe Observador: Alerta para o Usuário
class UserAlert implements Observer {
    @Override
    public void update(Wearable subject) {
        System.out.println("User Alert: Heart rate is " + subject.getHeartRate() + " bpm!");
    }
}

// Classe Observador: Serviço Médico
class MedicalService implements Observer {
    @Override
    public void update(Wearable subject) {
        if (subject.getHeartRate() > 100) { // Exemplo de limiar crítico
            System.out.println("Medical Service Alert: Critical heart rate detected: " + subject.getHeartRate() + " bpm!");
        }
    }
}

// Classe Principal (Main)
public class HealthAlertSystem {
    public static void main(String[] args) {
        // Criação do wearable (sujeito)
        Wearable wearable = new Wearable();

        // Criação dos observadores
        Observer userAlert = new UserAlert();
        Observer medicalService = new MedicalService();

        // Registro dos observadores
        wearable.attach(userAlert);
        wearable.attach(medicalService);

        // Testando notificações
        System.out.println("Heart rate set to 90 bpm.");
        wearable.setHeartRate(90); // Notificará os observadores

        System.out.println("Heart rate set to 110 bpm.");
        wearable.setHeartRate(110); // Notificará os observadores
    }
}



// Explicação do Código
// Interface Observer:
// Define o contrato para todos os observadores. O método update é implementado para reagir a mudanças no estado do wearable.

// Classe Sujeito (Wearable):
    // Armazena os dados monitorados (frequência cardíaca) e uma lista de observadores. Notifica todos os observadores sempre que o estado muda.

// Classes Observadoras:
    // UserAlert: Exibe um alerta simples ao usuário sobre a mudança na frequência cardíaca.
    // MedicalService: Emite alertas médicos apenas se a frequência cardíaca ultrapassar um limiar crítico.
// Método main:
    // Demonstra o funcionamento, criando um wearable e registrando dois observadores. Testa notificações ao alterar o valor da frequência cardíaca.

